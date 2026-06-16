import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ValidationPipe checks all incoming DTOs against class-validator decorators
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // Allow the React dev server to call the API
  app.enableCors({ origin: 'http://localhost:5173' })

  await app.listen(3000)
}
bootstrap()
