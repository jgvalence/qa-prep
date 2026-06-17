import { Test } from '@nestjs/testing'
import { UsersService } from './users.service'
import { PrismaService } from '../../prisma/prisma.service'

const fakeUser = {
  id: 1,
  email: 'user@test.com',
  password: 'hashed',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('UsersService', () => {
  let usersService: UsersService
  let prisma: { user: { findUnique: jest.Mock } }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: { user: { findUnique: jest.fn() } } },
      ],
    }).compile()

    usersService = module.get(UsersService)
    prisma = module.get(PrismaService)
  })

  describe('findByEmail', () => {
    it('should return the user when the email exists', async () => {
      prisma.user.findUnique.mockResolvedValue(fakeUser)
      const result = await usersService.findByEmail('user@test.com')
      expect(result).toEqual(fakeUser)
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'user@test.com' } })
    })

    it('should return null when the email does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null)
      const result = await usersService.findByEmail('nobody@test.com')
      expect(result).toBeNull()
    })
  })

  describe('findById', () => {
    it('should return the user when the id exists', async () => {
      prisma.user.findUnique.mockResolvedValue(fakeUser)
      const result = await usersService.findById(1)
      expect(result).toEqual(fakeUser)
    })

    it('should return null when the id does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null)
      const result = await usersService.findById(999)
      expect(result).toBeNull()
    })
  })
})
