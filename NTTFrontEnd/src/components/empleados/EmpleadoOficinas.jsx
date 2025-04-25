import { Box, Button, Flex, Heading, useDisclosure, Text, Spinner } from '@chakra-ui/react'
import OficinasTable from '../oficinas/OficinasTable'
import AsignarOficinaForm from './AsignarOficinaForm'
import { useQuery } from '@tanstack/react-query'
import empleadoOficinaApi from '../../api/empleadoOficinaApi'

const EmpleadoOficinas = ({ empleadoId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  if (!empleadoId) {
    return <Text color="red.500">Error: No se proporcionó ID de empleado</Text>
  }

  const { data: oficinas, isLoading, isError, refetch } = useQuery({
    queryKey: ['empleadoOficinas', empleadoId],
    queryFn: () => empleadoOficinaApi.getOficinasByEmpleado(empleadoId),
    enabled: !!empleadoId 
  })

  if (isLoading) return <Spinner size="lg" mt={4} />
  if (isError) return <Text color="red.500">Error al cargar oficinas asignadas</Text>

  return (
    <Box mt={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md" mb={2}>Oficinas Asignadas</Heading>
        <Button 
          colorScheme="blue" 
          onClick={onOpen}
          size="sm"
        >
          + Asignar Nueva Oficina
        </Button>
      </Flex>
      
      <OficinasTable oficinas={oficinas} />
      
      <AsignarOficinaForm 
        isOpen={isOpen} 
        onClose={onClose} 
        empleadoId={empleadoId}
        onSuccess={refetch}
      />
    </Box>
  )
}

export default EmpleadoOficinas