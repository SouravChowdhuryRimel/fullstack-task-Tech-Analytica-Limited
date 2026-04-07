import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@task.com';
    const adminPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || 'admin123',
        saltRounds,
    );

    const userEmail = process.env.USER_EMAIL || 'user@task.com';
    const userPassword = await bcrypt.hash(
        process.env.USER_PASSWORD || 'user123',
        saltRounds,
    );

    // Seed Admin
    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            name: 'Admin User',
            password: adminPassword,
            role: UserRole.ADMIN,
            status: UserStatus.ACTIVE,
        },
    });

    // Seed Normal User
    await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: {
            email: userEmail,
            name: 'Normal User',
            password: userPassword,
            role: UserRole.USER,
            status: UserStatus.ACTIVE,
        },
    });

    console.log('Seeding finished!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
