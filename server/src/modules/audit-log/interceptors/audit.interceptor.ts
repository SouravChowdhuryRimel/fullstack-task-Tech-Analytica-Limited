import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditLogService } from '../service/audit-log.service';
import { Reflector } from '@nestjs/core';
import { AuditAction } from '@prisma/client';

export const AUDIT_METADATA_KEY = 'audit_log';

export interface AuditMetadata {
    action: AuditAction;
    entity: string;
}

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(
        private readonly auditLogService: AuditLogService,
        private readonly reflector: Reflector,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const metadata = this.reflector.get<AuditMetadata>(
            AUDIT_METADATA_KEY,
            context.getHandler(),
        );

        if (!metadata) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest();
        const actorId = request.user?.id;

        return next.handle().pipe(
            tap(async (data) => {
                if (!actorId) return;

                // Determine targetId (usually from param or returned data)
                const targetId = request.params.id || data?.id;

                await this.auditLogService.createLog({
                    actorId,
                    actionType: metadata.action,
                    targetEntity: metadata.entity,
                    targetId: targetId,
                    newData: data, // Store the result of the action
                    summary: `${metadata.action} action on ${metadata.entity}`,
                });
            }),
        );
    }
}
