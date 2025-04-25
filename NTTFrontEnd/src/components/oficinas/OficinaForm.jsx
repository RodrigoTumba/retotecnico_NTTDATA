import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateOficina, useUpdateOficina } from '../../hooks/useOficinas'

const OficinaForm = ({ isOpen, onClose, oficinaData, isEditing }) => {
  const toast = useToast()
  const createOficina = useCreateOficina()
  const updateOficina = useUpdateOficina()

  const formik = useFormik({
    initialValues: {
      nombre: oficinaData?.nombre || '',
      direccion: oficinaData?.direccion || '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es requerido'),
      direccion: Yup.string().required('La dirección es requerida'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEditing) {
          await updateOficina.mutateAsync({
            id: oficinaData.id,
            oficinaData: values
          })
        } else {
          await createOficina.mutateAsync(values)
        }
        onClose()
      } catch (error) {
        console.error('Error en el formulario:', error)
        toast({
          title: 'Error',
          description: error.response?.data?.message || error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? 'Editar Oficina' : 'Nueva Oficina'}
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.nombre && formik.errors.nombre}>
                <FormLabel>Nombre</FormLabel>
                <Input
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.nombre && formik.errors.nombre && (
                  <Text color="red.500" fontSize="sm">{formik.errors.nombre}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={formik.touched.direccion && formik.errors.direccion}>
                <FormLabel>Dirección</FormLabel>
                <Input
                  name="direccion"
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.direccion && formik.errors.direccion && (
                  <Text color="red.500" fontSize="sm">{formik.errors.direccion}</Text>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              colorScheme="blue" 
              type="submit" 
              isLoading={formik.isSubmitting || createOficina.isLoading || updateOficina.isLoading}
            >
              {isEditing ? 'Actualizar' : 'Guardar'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default OficinaForm