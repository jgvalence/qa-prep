import axios from 'axios'

// All API calls go through /api — Vite proxies this to localhost:3000
const api = axios.create({ baseURL: '/api' })

export type LoginPayload = { email: string; password: string }

export async function login(data: LoginPayload) {
  const res = await api.post<{ access_token: string }>('/auth/login', data)
  return res.data
}

export async function getMe(token: string) {
  const res = await api.get<{ id: number; email: string }>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}
