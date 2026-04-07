import { Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskController } from './controller/task.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
    imports: [AuthModule, AuditLogModule],
    controllers: [TaskController],
    providers: [TaskService, PrismaService],
})
export class TaskModule { }
