import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuditAction, AuditLog } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
    PaginatedResponse,
    createPaginationMeta,
} from 'src/common/utils/paginate.util';

@Injectable()
export class AuditLogService {
    constructor(private prisma: PrismaService) { }

    async createLog(data: {
        actorId: string;
        actionType: AuditAction;
        targetEntity: string;
        targetId: string;
        summary?: string;
        previousData?: any;
        newData?: any;
    }) {
        return this.prisma.auditLog.create({
            data: {
                actorId: data.actorId,
                actionType: data.actionType,
                targetEntity: data.targetEntity,
                targetId: data.targetId,
                summary: data.summary,
                previousData: data.previousData,
                newData: data.newData,
            },
        });
    }

    async getLogs(query: PaginationDto): Promise<PaginatedResponse<AuditLog>> {
        const { page = 1, limit = 10, skip } = query;

        const [data, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                skip,
                take: limit,
                include: { actor: { select: { id: true, name: true, email: true } } },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.auditLog.count(),
        ]);

        return {
            data,
            meta: createPaginationMeta(total, page, limit),
        };
    }
}
