import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { act } from '@testing-library/react'
import ProtectedRoute from './ProtectedRoute'
import { useAuthStore } from '@/store/authStore'

beforeEach(() => {
  act(() => useAuthStore.setState({ token: null }))
})

function renderWithRouter(token: string | null) {
  act(() => useAuthStore.setState({ token }))

  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  it('should render the child route when a token exists', () => {
    renderWithRouter('valid-token')
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('should redirect to /login when there is no token', () => {
    renderWithRouter(null)
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })
})
