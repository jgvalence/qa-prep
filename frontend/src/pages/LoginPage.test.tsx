import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from './LoginPage'
import * as authService from '@/services/auth.service'

// Mock the service layer — tests should not hit a real server
jest.mock('@/services/auth.service')
const mockLogin = authService.login as jest.MockedFunction<typeof authService.login>

// Mock useNavigate so we can assert redirects without a real router
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

function renderLoginPage() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render email and password fields', () => {
    renderLoginPage()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument()
  })

  it('should show validation errors when submitted empty', async () => {
    renderLoginPage()
    await userEvent.click(screen.getByRole('button', { name: /connexion/i }))
    expect(await screen.findByText(/email invalide/i)).toBeInTheDocument()
  })

  it('should show validation error when password is too short', async () => {
    renderLoginPage()
    await userEvent.type(screen.getByLabelText(/email/i), 'user@test.com')
    await userEvent.type(screen.getByLabelText(/mot de passe/i), '123')
    await userEvent.click(screen.getByRole('button', { name: /connexion/i }))
    expect(await screen.findByText(/mot de passe trop court/i)).toBeInTheDocument()
  })

  it('should redirect to dashboard on successful login', async () => {
    mockLogin.mockResolvedValue({ access_token: 'fake-jwt' })
    renderLoginPage()

    await userEvent.type(screen.getByLabelText(/email/i), 'user@test.com')
    await userEvent.type(screen.getByLabelText(/mot de passe/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /connexion/i }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard'))
  })

  it('should show error message on failed login', async () => {
    mockLogin.mockRejectedValue(new Error('Unauthorized'))
    renderLoginPage()

    await userEvent.type(screen.getByLabelText(/email/i), 'user@test.com')
    await userEvent.type(screen.getByLabelText(/mot de passe/i), 'wrongpassword')
    await userEvent.click(screen.getByRole('button', { name: /connexion/i }))

    expect(await screen.findByText(/identifiants incorrects/i)).toBeInTheDocument()
  })
})
