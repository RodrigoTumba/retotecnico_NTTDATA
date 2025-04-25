import { Box, Flex, Spacer, Link, Button } from '@chakra-ui/react'
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'

const Layout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Box>
      <Flex bg="brand.900" p={4} color="white">
        <Box>
          <Link as={RouterLink} to="/" mr={4}>
            Inicio
          </Link>
          {isAuthenticated && (
            <>
              <Link as={RouterLink} to="/empleados" mr={4}>
                Empleados
              </Link>
              <Link as={RouterLink} to="/oficinas" mr={4}>
                Oficinas
              </Link>
            </>
          )}
        </Box>
        <Spacer />
        <Box>
          {isAuthenticated ? (
            <Button colorScheme="red" size="sm" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          ) : (
            <Link as={RouterLink} to="/login">
              <Button colorScheme="blue" size="sm">
                Iniciar sesión
              </Button>
            </Link>
          )}
        </Box>
      </Flex>
      <Box p={4}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout