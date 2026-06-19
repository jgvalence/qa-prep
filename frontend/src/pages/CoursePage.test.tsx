import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CoursePage from './CoursePage'

// Wrap in a router with the :id param so useParams resolves
const renderCourse = (id: number) =>
  render(
    <MemoryRouter initialEntries={[`/courses/${id}`]}>
      <Routes>
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/courses" element={<div>courses list</div>} />
      </Routes>
    </MemoryRouter>
  )

describe('CoursePage', () => {
  it('should display a back button', () => {
    renderCourse(1)
    expect(screen.getByRole('button', { name: /retour/i })).toBeInTheDocument()
  })

  it('should navigate back to /courses on back button click', async () => {
    renderCourse(1)
    await userEvent.click(screen.getByRole('button', { name: /retour/i }))
    expect(screen.getByText('courses list')).toBeInTheDocument()
  })

  it('should show not-found message for unknown course id', () => {
    renderCourse(99)
    expect(screen.getByText(/introuvable/i)).toBeInTheDocument()
  })
})
