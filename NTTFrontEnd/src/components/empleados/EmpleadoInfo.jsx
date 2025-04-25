import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Text, 
  Badge, 
  Button, 
  useDisclosure,
  Flex,
  Alert,
  AlertIcon,
  CircularProgress
} from '@chakra-ui/react';
import EmpleadoForm from './EmpleadoForm';
import { useGetEmpleado } from '../../hooks/useEmpleados';
import { useNavigate } from 'react-router-dom';

const EmpleadoInfo = ({ empleadoId }) => {
  const { data: empleado, isLoading, isError, error } = useGetEmpleado(empleadoId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress isIndeterminate color="blue.500" />
        <Text mt={4}>Cargando información del empleado...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error al cargar el empleado: {error.message}
      </Alert>
    );
  }

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Información del Empleado</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Editar
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box>
          <Text fontWeight="bold">Nombre:</Text>
          <Text>{empleado.nombre}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Teléfono:</Text>
          <Text>{empleado.telefono}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">DNI:</Text>
          <Text>{empleado.dni}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Dirección:</Text>
          <Text>{empleado.direccion || 'No especificada'}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Fecha Nacimiento:</Text>
          <Text>
            {empleado.fechaNacimiento 
              ? new Date(empleado.fechaNacimiento).toLocaleDateString() 
              : 'No especificada'}
          </Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Trabajo Remoto:</Text>
          <Badge colorScheme={empleado.trabajoRemoto ? 'green' : 'blue'}>
            {empleado.trabajoRemoto ? 'Sí' : 'No'}
          </Badge>
        </Box>
      </SimpleGrid>

      <EmpleadoForm 
        isOpen={isOpen} 
        onClose={onClose} 
        empleadoData={empleado} 
        isEditing={true}
      />
    </Box>
  );
};

export default EmpleadoInfo;