import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Box, Button, Container, Typography } from '@mui/material'
import { COURSES } from '@/data/courses'
import { courseContent } from '@/data/courseContent'

export default function CoursePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const courseId = Number(id)
  const course = COURSES.find((c) => c.id === courseId)
  const content = courseContent[courseId]

  if (!course || !content) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6">Module introuvable.</Typography>
        <Button onClick={() => navigate('/courses')} sx={{ mt: 2 }}>
          Retour aux modules
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Button
        onClick={() => navigate('/courses')}
        sx={{ mb: 3 }}
      >
        ← Retour aux modules
      </Button>

      {/* prose styles applied to the markdown output */}
      <Box
        sx={{
          '& h1': { typography: 'h4', fontWeight: 700, mt: 4, mb: 2 },
          '& h2': { typography: 'h5', fontWeight: 600, mt: 4, mb: 1.5, pb: 0.5, borderBottom: 1, borderColor: 'divider' },
          '& h3': { typography: 'h6', fontWeight: 600, mt: 3, mb: 1 },
          '& p': { typography: 'body1', mb: 1.5, lineHeight: 1.75 },
          '& ul, & ol': { pl: 3, mb: 2 },
          '& li': { typography: 'body1', mb: 0.5 },
          '& code': { fontFamily: 'monospace', bgcolor: 'grey.100', px: 0.75, py: 0.25, borderRadius: 0.5, fontSize: '0.875em' },
          '& pre': { bgcolor: 'grey.100', p: 2, borderRadius: 1, overflow: 'auto', mb: 2, '& code': { bgcolor: 'transparent', p: 0 } },
          '& table': { borderCollapse: 'collapse', width: '100%', mb: 2 },
          '& th': { bgcolor: 'grey.50', fontWeight: 600, border: 1, borderColor: 'divider', p: 1 },
          '& td': { border: 1, borderColor: 'divider', p: 1 },
          '& blockquote': { borderLeft: 3, borderColor: 'primary.main', pl: 2, ml: 0, color: 'text.secondary', fontStyle: 'italic', my: 2 },
          '& hr': { my: 3, borderColor: 'divider' },
          '& strong': { fontWeight: 700 },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </Box>
    </Container>
  )
}
