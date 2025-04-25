import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { setCredentials } from '../features/auth/authSlice'
import authApi from '../api/authApi'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Requerido'),
      password: Yup.string().required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await authApi.login(values)
        dispatch(setCredentials(response))
        
        const from = location.state?.from?.pathname || '/'
        navigate(from, { replace: true })
      } catch (error) {
        toast({
          title: 'Error al iniciar sesión',
          description: error.response?.data?.message || error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    },
  })

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={formik.isSubmitting}
          >
            Iniciar sesión
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default Login