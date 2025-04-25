import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Select, useToast } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Formik, Form, Field } from 'formik'
import empleadoOficinaApi from '../../api/empleadoOficinaApi'
import empleadoApi from '../../api/empleadoApi'

const AsignarEmpleadoForm = ({ isOpen, onClose, oficinaId }) => {
  const toast = useToast()
  
  const { data: empleados } = useQuery({
    queryKey: ['empleados'],
    queryFn: empleadoApi.getEmpleados,
  })

  const mutation = useMutation({
    mutationFn: (empleadoId) => 
      empleadoOficinaApi.asignarOficina({ empleadoId, oficinaId }),
    onSuccess: () => {
      toast({
        title: 'Empleado asignado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onClose()
    },
    onError: (error) => {
      toast({
        title: 'Error al asignar empleado',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asignar Empleado</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ empleadoId: '' }}
          onSubmit={(values) => mutation.mutate(values.empleadoId)}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel>Empleado</FormLabel>
                  <Field as={Select} name="empleadoId" placeholder="Seleccione empleado">
                    {empleados?.map((empleado) => (
                      <option key={empleado.id} value={empleado.id}>
                        {empleado.nombre} - {empleado.email}
                      </option>
                    ))}
                  </Field>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancelar
                </Button>
                <Button 
                  colorScheme="blue" 
                  type="submit" 
                  isLoading={isSubmitting || mutation.isLoading}
                >
                  Asignar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default AsignarEmpleadoForm