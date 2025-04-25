import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import OficinasTable from '../../components/oficinas/OficinasTable'
import OficinaForm from '../../components/oficinas/OficinaForm'
import { useGetOficinas } from '../../hooks/useOficinas'

const Oficinas = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: oficinas, isLoading, isError } = useGetOficinas()

  if (isLoading) return <div>Cargando...</div>
  if (isError) return <div>Error al cargar oficinas</div>

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Gestión de Oficinas</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Nueva Oficina
        </Button>
      </Flex>
      
      <OficinasTable oficinas={oficinas} />
      
      <OficinaForm isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default Oficinas