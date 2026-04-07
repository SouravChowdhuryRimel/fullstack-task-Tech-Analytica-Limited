import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IsOptional, IsEnum, IsUUID } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TaskQueryDto extends PaginationDto {
    @ApiPropertyOptional({ enum: TaskStatus })
    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    userId?: string;
}
