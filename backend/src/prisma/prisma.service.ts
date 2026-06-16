import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Prisma 7 requires a driver adapter — pass the file URL directly
    const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! })
    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
  }
}
