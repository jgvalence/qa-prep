import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { AuthService } from './auth.service'
import { UsersService } from '../modules/users/users.service'

// Fake user that matches what Prisma would return
const fakeUser = {
  id: 1,
  email: 'user@test.com',
  password: 'hashed',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('AuthService', () => {
  let authService: AuthService
  let usersService: { findByEmail: jest.Mock }
  let jwtService: { sign: jest.Mock }

  // beforeEach resets the module so each test starts with a clean slate
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: { findByEmail: jest.fn() } },
        { provide: JwtService, useValue: { sign: jest.fn().mockReturnValue('signed-token') } },
      ],
    }).compile()

    authService = module.get(AuthService)
    usersService = module.get(UsersService)
    jwtService = module.get(JwtService)
  })

  it('should return an access token on successful login', async () => {
    const hashed = await bcrypt.hash('password123', 10)
    usersService.findByEmail.mockResolvedValue({ ...fakeUser, password: hashed })

    const result = await authService.login({ email: 'user@test.com', password: 'password123' })

    expect(result).toEqual({ access_token: 'signed-token' })
    expect(jwtService.sign).toHaveBeenCalledWith({ sub: 1, email: 'user@test.com' })
  })

  it('should throw UnauthorizedException when user does not exist', async () => {
    usersService.findByEmail.mockResolvedValue(null)

    await expect(
      authService.login({ email: 'nobody@test.com', password: 'any' }),
    ).rejects.toThrow(UnauthorizedException)
  })

  it('should throw UnauthorizedException when password is wrong', async () => {
    const hashed = await bcrypt.hash('correct', 10)
    usersService.findByEmail.mockResolvedValue({ ...fakeUser, password: hashed })

    await expect(
      authService.login({ email: 'user@test.com', password: 'wrong' }),
    ).rejects.toThrow(UnauthorizedException)
  })
})
