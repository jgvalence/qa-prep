import { Button, Container, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export default function DashboardPage() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="outlined" onClick={handleLogout} data-testid="logout">
          Déconnexion
        </Button>
      </Box>

      <Button variant="contained" onClick={() => navigate('/courses')} data-testid="go-to-courses">
        Voir les modules QA
      </Button>
    </Container>
  )
}
