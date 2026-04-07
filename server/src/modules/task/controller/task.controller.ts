import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UseInterceptors,
    Query,
} from '@nestjs/common';
import { TaskService } from '../service/task.service';
import {
    CreateTaskDto,
    UpdateTaskStatusDto,
    AssignTaskDto,
} from '../dto/task.dto';
import { TaskQueryDto } from '../dto/task-query.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole, AuditAction } from '@prisma/client';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Audit } from '../../audit-log/decorators/audit.decorator';
import { AuditInterceptor } from '../../audit-log/interceptors/audit.interceptor';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuditInterceptor)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    @Audit(AuditAction.CREATE, 'Task')
    @ApiOperation({ summary: 'Create a new task (Admin only)' })
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all tasks (Admin views all, User views assigned)',
    })
    findAll(@Query() query: TaskQueryDto, @GetUser() user: any) {
        if (user.role === UserRole.ADMIN) {
            return this.taskService.getAllTasks(query);
        }
        return this.taskService.getTasksByUserId(user.id, query);
    }

    @Patch(':id/status')
    @Audit(AuditAction.UPDATE, 'Task Status')
    @ApiOperation({ summary: 'Update task status' })
    updateStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user: any,
    ) {
        // Regular user can only update their own tasks
        const userId = user.role === UserRole.USER ? user.id : undefined;
        return this.taskService.updateTaskStatus(id, updateTaskStatusDto, userId);
    }

    @Patch(':id/assign')
    @Roles(UserRole.ADMIN)
    @Audit(AuditAction.UPDATE, 'Task Assignment')
    @ApiOperation({ summary: 'Assign task to a user (Admin only)' })
    assign(@Param('id') id: string, @Body() assignTaskDto: AssignTaskDto) {
        return this.taskService.assignTask(id, assignTaskDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @Audit(AuditAction.DELETE, 'Task')
    @ApiOperation({ summary: 'Delete a task (Admin only)' })
    remove(@Param('id') id: string) {
        return this.taskService.deleteTask(id);
    }
}
