# Task Management System - Fullstack Implementation

This repository contains a robust, enterprise-grade Task Management System built with a focus on Role-Based Access Control (RBAC), automated audit logging, and high-performance data handling.

## Technologies Used

- **Backend**: NestJS, Prisma 7+, TypeScript 6+, PostgreSQL
- **Security**: Passport.js, JWT, Bcrypt
- **Architecture**: Modular structure, Driver-based Prisma adapter (`@prisma/adapter-pg`)
- **Documentation**: Swagger API
- **Infrastructure**: Docker & Docker Compose

## Key Features

### 1. Advanced Task Management

- **Role-Based Access Control (RBAC)**: Fine-grained permissions for `ADMIN` and `USER` roles.
  - **Admins**: Create, Assign, Update Status, and Delete any task.
  - **Users**: View assigned tasks and update their status.
- **Enterprise-Grade Pagination**: Consistent metadata (`totalItems`, `totalPages`, `hasNextPage`) across all list endpoints.

### 2. Automated Audit Logging

- **Real-time Tracking**: Every critical action (create, update, delete) is automatically captured by a custom NestJS Interceptor.
- **Data Snapshots**: Logs include `previousData` and `newData` for full historical visibility.
- **Admin Visibility**: Dedicated endpoints for admins to review system-wide logs.

### 3. Industry-Standard Infrastructure

- **Prisma v7 migration**: Optimized with modular schema files and the latest driver-based connection patterns.
- **TypeScript v6**: Full compliance with the latest TS strictness and performance features.
- **Dockerized**: Easy setup with Docker Compose for database and application.

## Getting Started

### Prerequisites

- Node.js (v20+)
- Docker & Docker Compose

### Fast Setup (Docker)

```bash
docker-compose up -d
```

### Local Development Setup

1. **Install Dependencies**:
   ```bash
   cd server
   npm install
   ```
2. **Configure Environment**:
   Update `server/.env` with your database credentials.
3. **Run Migrations & Seed**:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
4. **Start the Server**:
   ```bash
   npm run start:dev
   ```

## Credentials (Default Seeded)

| Role  | Email            | Password   |
| ----- | ---------------- | ---------- |
| Admin | `admin@task.com` | `admin123` |
| User  | `user@task.com`  | `user123`  |

## API Documentation

Once the server is running, explore the Interactive Swagger documentation at:
**`http://localhost:5000/docs`**

---
