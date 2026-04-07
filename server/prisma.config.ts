import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
    schema: 'prisma/schema',
    datasource: {
        url: env('DATABASE_URL'),
    },
    migrations: {
        path: 'prisma/migrations',
        seed: 'ts-node prisma/seed.ts',
    },
});
