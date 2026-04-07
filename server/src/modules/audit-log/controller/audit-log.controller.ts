import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuditLogService } from '../service/audit-log.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('audit-logs')
@ApiBearerAuth()
@Controller('audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AuditLogController {
    constructor(private readonly auditLogService: AuditLogService) { }

    @Get()
    @ApiOperation({ summary: 'Get all audit logs (Admin only)' })
    findAll(@Query() query: PaginationDto) {
        return this.auditLogService.getLogs(query);
    }
}
