import { Card, CardActionArea, CardContent, Typography, Chip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Course } from '@/data/courses'

type Props = {
  course: Course
}

export default function CourseCard({ course }: Props) {
  const navigate = useNavigate()

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardActionArea
        onClick={() => navigate(`/courses/${course.id}`)}
        sx={{ height: '100%', alignItems: 'flex-start' }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Chip
            label={`Module ${course.id}`}
            size="small"
            color="primary"
            sx={{ alignSelf: 'flex-start' }}
          />
          <Typography variant="h6" component="h2">
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
