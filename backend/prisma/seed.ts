import 'dotenv/config'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

// Prisma 7 requires a driver adapter — pass the DATABASE_URL directly
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const password = await bcrypt.hash('password123', 10)

  // upsert so the seed is safe to run multiple times
  await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: { email: 'user@test.com', password },
  })

  console.log('Seed done — user@test.com / password123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
