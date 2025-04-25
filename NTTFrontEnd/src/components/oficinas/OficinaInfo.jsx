import { Box, Heading, SimpleGrid, Text, Badge, Button, useDisclosure, Flex } from '@chakra-ui/react'
import { useGetOficina } from '../../hooks/useOficinas'
import OficinaForm from './OficinaForm'

const OficinaInfo = ({ oficinaId }) => {
  const { data: oficina, isLoading, isError } = useGetOficina(oficinaId)
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (isLoading) return <div>Cargando...</div>
  if (isError) return <div>Error al cargar oficina</div>

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Información de la Oficina</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Editar
        </Button>
      </Flex>

      <SimpleGrid columns={2} spacing={4}>
        <Box>
          <Text fontWeight="bold">Nombre:</Text>
          <Text>{oficina.nombre}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Dirección:</Text>
          <Text>{oficina.direccion}</Text>
        </Box>
      </SimpleGrid>

      <OficinaForm 
        isOpen={isOpen} 
        onClose={onClose} 
        oficinaData={oficina} 
        isEditing 
      />
    </Box>
  )
}

export default OficinaInfo