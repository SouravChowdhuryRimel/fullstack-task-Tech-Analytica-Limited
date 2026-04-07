import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Task Management System')
  .setDescription('API documentation for the Task Management System')
  .setVersion('1.0')
  .addTag('Task Management System')
  .addApiKey(
    {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
    'auth',
  )
  .build();