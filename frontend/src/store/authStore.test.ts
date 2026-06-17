import { act } from '@testing-library/react'
import { useAuthStore } from './authStore'

// Reset Zustand store state between tests
beforeEach(() => {
  act(() => useAuthStore.setState({ token: null }))
})

describe('authStore', () => {
  it('should have null token by default', () => {
    expect(useAuthStore.getState().token).toBeNull()
  })

  it('should store a token when setToken is called', () => {
    act(() => useAuthStore.getState().setToken('my-jwt'))
    expect(useAuthStore.getState().token).toBe('my-jwt')
  })

  it('should clear the token when logout is called', () => {
    act(() => {
      useAuthStore.getState().setToken('my-jwt')
      useAuthStore.getState().logout()
    })
    expect(useAuthStore.getState().token).toBeNull()
  })
})
