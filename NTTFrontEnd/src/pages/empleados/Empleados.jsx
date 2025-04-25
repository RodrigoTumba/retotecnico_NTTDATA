import { Box, Button, Heading, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import EmpleadosTable from '../../components/empleados/EmpleadosTable';
import { useGetEmpleados } from '../../hooks/useEmpleados';

const Empleados = () => {
  const { data: empleados, isLoading, isError } = useGetEmpleados();

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar empleados</div>;

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Gestión de Empleados</Heading>
        <Button as={Link} to="/empleados/nuevo" colorScheme="blue">
          Nuevo Empleado
        </Button>
      </Flex>
      
      <EmpleadosTable empleados={empleados} />
    </Box>
  );
};

export default Empleados;