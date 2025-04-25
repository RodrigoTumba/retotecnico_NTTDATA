import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Select, useToast, Text, Spinner } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Formik, Form, Field } from 'formik'
import empleadoOficinaApi from '../../api/empleadoOficinaApi'
import oficinaApi from '../../api/oficinaApi'

const AsignarOficinaForm = ({ isOpen, onClose, empleadoId, onSuccess }) => {
  const toast = useToast()
  const queryClient = useQueryClient()

  if (!empleadoId || isNaN(Number(empleadoId))) {
    console.error('ID de empleado inválido:', empleadoId)
    onClose()
    return null
  }

  const { data: oficinas, isLoading: isLoadingOficinas } = useQuery({
    queryKey: ['oficinas-disponibles'],
    queryFn: async () => {
      const data = await oficinaApi.getOficinas()
      return data.map(oficina => ({
        id: oficina.id,
        nombre: oficina.nombre,
        direccion: oficina.direccion
      }))
    },
  })

  const mutation = useMutation({
    mutationFn: async (oficinaId) => {
      if (!oficinaId) throw new Error('Debe seleccionar una oficina')
      
     
      const oficinaSeleccionada = oficinas.find(o => o.id === Number(oficinaId))
      
      if (!oficinaSeleccionada) {
        throw new Error('Oficina seleccionada no encontrada')
      }

      return await empleadoOficinaApi.asignarOficina(
        Number(empleadoId), 
        Number(oficinaId)
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['empleado-oficinas', empleadoId])
      queryClient.invalidateQueries(['empleado-detalle', empleadoId])
      
      toast({
        title: '¡Asignación exitosa!',
        description: 'La oficina fue asignada correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
      onClose()
      if (onSuccess) onSuccess()
    },
    onError: (error) => {
      console.error('Error en asignación:', {
        empleadoId,
        error: error.response?.data || error.message
      })
      
      toast({
        title: 'Error en asignación',
        description: error.response?.data?.error || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  })

  if (isLoadingOficinas) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cargando oficinas...</ModalHeader>
          <ModalBody>
            <Spinner size="xl" />
            <Text mt={4}>Cargando lista de oficinas disponibles</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asignar Oficina al Empleado</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ oficinaId: '' }}
          onSubmit={(values, actions) => {
            if (!values.oficinaId) {
              toast({
                title: 'Selección requerida',
                description: 'Debe seleccionar una oficina para asignar',
                status: 'warning',
                duration: 3000,
              })
              actions.setSubmitting(false)
              return
            }
            mutation.mutate(values.oficinaId, {
              onSettled: () => actions.setSubmitting(false)
            })
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel>Seleccione una oficina</FormLabel>
                  <Field 
                    as={Select} 
                    name="oficinaId" 
                    placeholder="Seleccione..."
                    disabled={isSubmitting}
                  >
                    {oficinas?.map((oficina) => (
                      <option key={oficina.id} value={oficina.id}>
                        {oficina.nombre} - {oficina.direccion}
                      </option>
                    ))}
                  </Field>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="outline" 
                  mr={3} 
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Asignando..."
                >
                  Confirmar Asignación
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default AsignarOficinaForm