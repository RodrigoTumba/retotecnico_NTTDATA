import { Box, Heading, Flex, Button, useDisclosure } from '@chakra-ui/react'
import EmpleadosTable from '../empleados/EmpleadosTable'
import { useGetOficinaEmpleados } from '../../hooks/useEmpleadoOficinas'
import AsignarEmpleadoForm from './AsignarEmpleadoForm'

const OficinaEmpleados = ({ oficinaId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: empleados, isLoading, isError } = useGetOficinaEmpleados(oficinaId)

  if (isLoading) return <div>Cargando...</div>
  if (isError) return <div>Error al cargar empleados</div>

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">Empleados en esta oficina</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Asignar Empleado
        </Button>
      </Flex>
      
      <EmpleadosTable empleados={empleados} />
      
      <AsignarEmpleadoForm 
        isOpen={isOpen} 
        onClose={onClose} 
        oficinaId={oficinaId} 
      />
    </Box>
  )
}

export default OficinaEmpleados