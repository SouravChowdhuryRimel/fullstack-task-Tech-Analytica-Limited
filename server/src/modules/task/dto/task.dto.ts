import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({ example: 'Complete documentation' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Finish the audit log implementation' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 'user-uuid', required: false })
    @IsUUID()
    @IsOptional()
    userId?: string;
}

export class UpdateTaskDto {
    @ApiProperty({ example: 'Updated title', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'Updated description', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 'user-uuid', required: false })
    @IsUUID()
    @IsOptional()
    userId?: string;

    @ApiProperty({ enum: TaskStatus, example: TaskStatus.PROCESSING, required: false })
    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}

export class UpdateTaskStatusDto {
    @ApiProperty({ enum: TaskStatus, example: TaskStatus.PROCESSING })
    @IsEnum(TaskStatus)
    status: TaskStatus;
}

export class AssignTaskDto {
    @ApiProperty({ example: 'user-uuid' })
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
