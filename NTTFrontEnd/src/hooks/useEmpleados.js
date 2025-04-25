import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import empleadoApi from '../api/empleadoApi'
import { useToast } from '@chakra-ui/react'

export const useGetEmpleados = () => {
  return useQuery({
    queryKey: ['empleados'],
    queryFn: empleadoApi.getEmpleados,
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  })
}

export const useGetEmpleado = (id) => {
  return useQuery({
    queryKey: ['empleado', id],
    queryFn: () => empleadoApi.getEmpleadoById(id),
    enabled: !!id, // Solo ejecuta si hay un ID
  })
}

export const useCreateEmpleado = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  
  return useMutation({
    mutationFn: empleadoApi.createEmpleado,
    onSuccess: () => {
      queryClient.invalidateQueries(['empleados'])
      toast({
        title: 'Empleado creado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: 'Error al crear empleado',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  })
}

export const useUpdateEmpleado = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  
  return useMutation({
    mutationFn: ({ id, empleadoData }) => empleadoApi.updateEmpleado({ id, empleadoData }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['empleados'])
      queryClient.invalidateQueries(['empleado', variables.id])
      toast({
        title: 'Empleado actualizado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: 'Error al actualizar empleado',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  })
}


export const useDeleteEmpleado = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id) => empleadoApi.deleteEmpleado(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(['empleados']);
      const previousEmpleados = queryClient.getQueryData(['empleados']);
      
      // Actualización optimista
      queryClient.setQueryData(['empleados'], (old) => 
        old.filter(empleado => empleado.id !== id)
      );

      return { previousEmpleados };
    },
    onError: (error, id, context) => {
      // Revertir en caso de error
      queryClient.setQueryData(['empleados'], context.previousEmpleados);
      toast({
        title: 'Error al eliminar empleado',
        description: error.response?.data?.message || 'Ocurrió un error al eliminar',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: 'Empleado eliminado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onSettled: () => {
      // Para asegurarnos que los datos estén sincronizados
      queryClient.invalidateQueries(['empleados']);
    }
  });
};