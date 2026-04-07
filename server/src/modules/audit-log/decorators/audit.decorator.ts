import { SetMetadata } from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { AUDIT_METADATA_KEY } from '../interceptors/audit.interceptor';

export const Audit = (action: AuditAction, entity: string) =>
    SetMetadata(AUDIT_METADATA_KEY, { action, entity });
