import { Test } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'

// Integration tests — hit the real HTTP server with a real SQLite database
// Requires user@test.com to exist in dev.db (run: npm run seed)
describe('Auth (e2e)', () => {
  let app: INestApplication
  let accessToken: string

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()
    // Apply the same pipes as main.ts so validation behaves identically in tests
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    await app.init()

    // Obtain a valid token once — reused in GET /auth/me tests
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@test.com', password: 'password123' })
    accessToken = res.body.access_token
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /auth/login', () => {
    it('should return 200 and a JWT token with valid credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'user@test.com', password: 'password123' })

      expect(res.status).toBe(200)
      expect(typeof res.body.access_token).toBe('string')
    })

    it('should return 401 with wrong password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'user@test.com', password: 'wrongpassword' })
        .expect(401)
    })

    it('should return 401 with unknown email', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nobody@test.com', password: 'password123' })
        .expect(401)
    })

    it('should return 400 when body fields are invalid', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'not-an-email', password: '123' })
        .expect(400)
    })

    it('should return 400 when body is empty', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({})
        .expect(400)
    })
  })

  describe('GET /auth/me', () => {
    it('should return the user profile with a valid token', async () => {
      const res = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

      expect(res.body.email).toBe('user@test.com')
      expect(res.body.id).toBeDefined()
    })

    it('should return 401 when no token is provided', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .expect(401)
    })

    it('should return 401 with an invalid token', () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid.token.here')
        .expect(401)
    })
  })
})
