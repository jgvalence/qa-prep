import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextField, Button, Box, Typography, Alert, Container, Paper } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login } from '@/services/auth.service'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
})

type LoginForm = z.infer<typeof schema>

export default function LoginPage() {
  const navigate = useNavigate()
  const setToken = useAuthStore((s) => s.setToken)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) })

  // useMutation for POST requests — handles loading and error states automatically
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.access_token)
      navigate('/dashboard')
    },
  })

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" mb={3}>
          Connexion
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Email"
            type="email"
            inputProps={{ 'data-testid': 'email' }}
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Mot de passe"
            type="password"
            inputProps={{ 'data-testid': 'password' }}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {mutation.isError && (
            <Alert severity="error">Identifiants incorrects</Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            loading={mutation.isPending}
            data-testid="submit"
          >
            Connexion
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
