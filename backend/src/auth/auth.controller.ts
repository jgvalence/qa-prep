import { Controller, Post, Get, Body, UseGuards, Request, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login is an action, not a resource creation — 200 is the correct status
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  // Protected route — returns the current user from the JWT payload
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: { user: { id: number; email: string } }) {
    return req.user
  }
}
