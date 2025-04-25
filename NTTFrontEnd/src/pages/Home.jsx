import { Box, Heading, Text, VStack, Button, Link as ChakraLink } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Home = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={6}>
        Sistema de Gestión de Empleados y Oficinas
      </Heading>
      
      <VStack spacing={4} align="center" maxW="md" mx="auto">
        <Text fontSize="lg">
          Bienvenido al sistema de gestión de empleados y oficinas.
        </Text>
        
        <Box pt={6}>
          <ChakraLink as={RouterLink} to="/empleados">
            <Button colorScheme="blue" size="lg" mr={4}>
              Ver Empleados
            </Button>
          </ChakraLink>
          
          <ChakraLink as={RouterLink} to="/oficinas">
            <Button colorScheme="teal" size="lg">
              Ver Oficinas
            </Button>
          </ChakraLink>
        </Box>
      </VStack>
    </Box>
  )
}

export default Home