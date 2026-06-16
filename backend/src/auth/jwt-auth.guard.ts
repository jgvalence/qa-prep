import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

// Extend AuthGuard('jwt') so we can use @UseGuards(JwtAuthGuard) on any route
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
