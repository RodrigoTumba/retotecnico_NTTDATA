import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import EmpleadoForm from '../../components/empleados/EmpleadoForm';

const NuevoEmpleado = () => {
  const navigate = useNavigate();
  return (
    <Box p={4}>
      <EmpleadoForm 
        isOpen={true} 
        onClose={() => navigate('/empleados')} 
        isNew 
      />
    </Box>
  );
};

export default NuevoEmpleado;