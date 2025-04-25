import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import empleadoOficinaApi from '../api/empleadoOficinaApi'
import { useToast } from '@chakra-ui/react'

export const useGetEmpleadoOficinas = (empleadoId) => {
  return useQuery({
    queryKey: ['empleadoOficinas', empleadoId],
    queryFn: () => empleadoOficinaApi.getOficinasByEmpleado(empleadoId),
    enabled: !!empleadoId,
  })
}

export const useGetOficinaEmpleados = (oficinaId) => {
  return useQuery({
    queryKey: ['oficinaEmpleados', oficinaId],
    queryFn: () => empleadoOficinaApi.getEmpleadosByOficina(oficinaId),
    enabled: !!oficinaId,
  })
}

export const useAsignarOficina = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  
  return useMutation({
    mutationFn: ({ empleadoId, oficinaId }) => 
      empleadoOficinaApi.asignarOficina({ empleadoId, oficinaId }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['empleadoOficinas', variables.empleadoId])
      toast({
        title: 'Oficina asignada',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: 'Error al asignar oficina',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  })
}

export const useEliminarOficinasEmpleado = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  
  return useMutation({
    mutationFn: (empleadoId) => empleadoOficinaApi.eliminarOficinas(empleadoId),
    onSuccess: (data, empleadoId) => {
      queryClient.invalidateQueries(['empleadoOficinas', empleadoId])
      toast({
        title: 'Oficinas eliminadas',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: 'Error al eliminar oficinas',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  })
}