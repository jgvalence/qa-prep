import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CourseCard from './CourseCard'
import type { Course } from '@/data/courses'

// useNavigate requires a Router context
const renderCard = (course: Course) =>
  render(
    <MemoryRouter>
      <CourseCard course={course} />
    </MemoryRouter>
  )

const fakeCourse: Course = {
  id: 3,
  title: 'Jest',
  description: 'Tests unitaires et de composants.',
}

describe('CourseCard', () => {
  it('should display the module number', () => {
    renderCard(fakeCourse)
    expect(screen.getByText('Module 3')).toBeInTheDocument()
  })

  it('should display the course title', () => {
    renderCard(fakeCourse)
    expect(screen.getByRole('heading', { name: 'Jest' })).toBeInTheDocument()
  })

  it('should display the course description', () => {
    renderCard(fakeCourse)
    expect(screen.getByText('Tests unitaires et de composants.')).toBeInTheDocument()
  })

  it('should update when a different course is passed', () => {
    const otherCourse: Course = { id: 1, title: 'Bases QA', description: 'Les fondamentaux.' }
    renderCard(otherCourse)
    expect(screen.getByText('Module 1')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Bases QA' })).toBeInTheDocument()
  })
})
