import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from '../service/dashboard.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('admin-dashboard')
@ApiBearerAuth()
@Controller('admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get dashboard statistics (Admin only)' })
    async getDashboardData() {
        const stats = await this.dashboardService.getAdminStats();
        return {
            status: 200,
            message: 'Dashboard data retrieved successfully',
            data: stats,
        };
    }
}
