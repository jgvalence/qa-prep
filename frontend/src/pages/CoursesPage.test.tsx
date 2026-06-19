import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CoursesPage from './CoursesPage'
import { COURSES } from '@/data/courses'

// CourseCard uses useNavigate — Router context required
const renderPage = () =>
  render(
    <MemoryRouter>
      <CoursesPage />
    </MemoryRouter>
  )

describe('CoursesPage', () => {
  it('should render all 6 course modules', () => {
    renderPage()
    // One chip per module — "Module 1" through "Module 6"
    COURSES.forEach((course) => {
      expect(screen.getByText(`Module ${course.id}`)).toBeInTheDocument()
    })
  })

  it('should display all course titles', () => {
    renderPage()
    COURSES.forEach((course) => {
      expect(screen.getByRole('heading', { name: course.title })).toBeInTheDocument()
    })
  })

  it('should display the page title', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'Modules QA' })).toBeInTheDocument()
  })
})
