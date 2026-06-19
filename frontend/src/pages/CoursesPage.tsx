import { Grid, Container, Typography } from '@mui/material'
import CourseCard from '@/components/CourseCard'
import { COURSES } from '@/data/courses'

export default function CoursesPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Modules QA
      </Typography>

      <Grid container spacing={3}>
        {COURSES.map((course) => (
          <Grid key={course.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
