import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async getAdminStats() {
        const [totalUser, totalTasks, totalDoneTasks, latestAuditLogs] =
            await Promise.all([
                this.prisma.user.count(),
                this.prisma.task.count(),
                this.prisma.task.count({ where: { status: 'DONE' } }),
                this.prisma.auditLog.count(),
            ]);

        // Mocking growth data for demonstration
        return {
            totals: {
                totalUser,
                totalSubscribeUser: totalTasks,
                totalUnSubscribeUser: totalDoneTasks,
                totalAffiliate: 0,
                totalRevenue: 0,
            },
            growth: {
                userGrowth: 5,
                subscriberGrowth: 10,
                revenueGrowth: 0,
            },
        };
    }
}
