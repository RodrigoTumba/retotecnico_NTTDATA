import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import oficinaApi from '../api/oficinaApi'
import { useToast } from '@chakra-ui/react'

export const useGetOficinas = () => {
  return useQuery({
    queryKey: ['oficinas'],
    queryFn: oficinaApi.getOficinas,
    staleTime: 1000 * 60 * 5, 
  })
}

export const useGetOficina = (id) => {
  return useQuery({
    queryKey: ['oficina', id],
    queryFn: () => oficinaApi.getOficinaById(id),
    enabled: !!id, 
  })
}

export const useCreateOficina = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  
  return useMutation({
    mutationFn: oficinaApi.createOficina,
    onSuccess: () => {
      queryClient.invalidateQueries(['oficinas'])
      toast({
        title: 'Oficina creada',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: 'Error al crear oficina',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  })
}

export const useUpdateOficina = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  
  return useMutation({
    mutationFn: ({ id, oficinaData }) => oficinaApi.updateOficina({ id, oficinaData }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['oficinas'])
      queryClient.invalidateQueries(['oficina', variables.id])
      toast({
        title: 'Oficina actualizada',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (error) => {
      toast({
        title: 'Error al actualizar oficina',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  })
}

export const useDeleteOficina = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  
  return useMutation({
    mutationFn: (id) => oficinaApi.deleteOficina(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(['oficinas'], (old) => 
        old.filter(oficina => oficina.id !== id)
      )
      toast({
        title: 'Oficina eliminada',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (error) => {
      queryClient.setQueryData(['oficinas'], context.previousOficinas)
      toast({
        title: 'Error al eliminar oficina',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },onMutate: async (id) => {
     
      await queryClient.cancelQueries(['oficinas'])
      const previousOficinas = queryClient.getQueryData(['oficinas'])

      queryClient.setQueryData(['oficinas'], (old) => 
        old.filter(oficina => oficina.id !== id)
      )
      
      return { previousOficinas }
    }
  })
}