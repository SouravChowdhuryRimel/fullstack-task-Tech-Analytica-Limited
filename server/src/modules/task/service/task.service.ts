import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskStatusDto, AssignTaskDto } from '../dto/task.dto';
import { TaskStatus, Task } from '@prisma/client';
import { TaskQueryDto } from '../dto/task-query.dto';
import { PaginatedResponse, createPaginationMeta } from 'src/common/utils/paginate.util';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    async createTask(dto: CreateTaskDto) {
        return this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                userId: dto.userId,
            },
            include: { assignedTo: { select: { id: true, name: true, email: true } } },
        });
    }

    async getAllTasks(query: TaskQueryDto): Promise<PaginatedResponse<Task>> {
        const { page = 1, limit = 10, skip, status, userId } = query;

        const where: any = {};
        if (status) where.status = status;
        if (userId) where.userId = userId;

        const [data, total] = await Promise.all([
            this.prisma.task.findMany({
                where,
                skip,
                take: limit,
                include: {
                    assignedTo: { select: { id: true, name: true, email: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.task.count({ where }),
        ]);

        return {
            data,
            meta: createPaginationMeta(total, page, limit),
        };
    }

    async getTasksByUserId(
        userId: string,
        query: TaskQueryDto,
    ): Promise<PaginatedResponse<Task>> {
        query.userId = userId;
        return this.getAllTasks(query);
    }

    async updateTaskStatus(id: string, dto: UpdateTaskStatusDto, userId?: string) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task) throw new NotFoundException('Task not found');

        // If userId is provided (User role), ensure they are assigned to this task
        if (userId && task.userId !== userId) {
            throw new NotFoundException('Task not found for this user');
        }

        return this.prisma.task.update({
            where: { id },
            data: { status: dto.status },
        });
    }

    async assignTask(id: string, dto: AssignTaskDto) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task) throw new NotFoundException('Task not found');

        return this.prisma.task.update({
            where: { id },
            data: { userId: dto.userId },
            include: { assignedTo: { select: { id: true, name: true, email: true } } },
        });
    }

    async deleteTask(id: string) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task) throw new NotFoundException('Task not found');

        return this.prisma.task.delete({ where: { id } });
    }

    async findOne(id: string) {
        return this.prisma.task.findUnique({ where: { id } });
    }
}
