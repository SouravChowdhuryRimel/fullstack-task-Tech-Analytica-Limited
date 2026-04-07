import { Module, Global } from '@nestjs/common';
import { AuditLogService } from './service/audit-log.service';
import { AuditInterceptor } from './interceptors/audit.interceptor';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuditLogController } from './controller/audit-log.controller';

@Global()
@Module({
    controllers: [AuditLogController],
    providers: [AuditLogService, PrismaService, AuditInterceptor],
    exports: [AuditLogService, AuditInterceptor],
})
export class AuditLogModule { }
