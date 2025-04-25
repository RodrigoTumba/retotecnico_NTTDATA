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
  Switch,
  useToast,
  Text
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateEmpleado, useUpdateEmpleado } from '../../hooks/useEmpleados'
import { useEffect } from 'react'

const EmpleadoForm = ({ isOpen, onClose, empleadoData, isEditing }) => {
  const toast = useToast()
  const createEmpleado = useCreateEmpleado()
  const updateEmpleado = useUpdateEmpleado()

  const formik = useFormik({
    initialValues: {
      nombre: empleadoData?.nombre || '',
      telefono: empleadoData?.telefono || '',
      dni: empleadoData?.dni || '',
      direccion: empleadoData?.direccion || '',
      fechaNacimiento: empleadoData?.fechaNacimiento 
        ? empleadoData.fechaNacimiento.split('T')[0] 
        : new Date().toISOString().split('T')[0],
      trabajoRemoto: empleadoData?.trabajoRemoto || false,
      oficinas: empleadoData?.oficinas || []
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('Nombre es requerido'),
      dni: Yup.string()
        .required('DNI es requerido')
        .matches(/^[0-9]{8}$/, 'DNI debe tener exactamente 8 números'),
      telefono: Yup.string().required('Teléfono es requerido'),
      fechaNacimiento: Yup.date()
        .max(new Date(), 'La fecha no puede ser futura')
        .required('Fecha de nacimiento es requerida')
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          nombre: values.nombre,
          telefono: values.telefono,
          dni: values.dni,
          direccion: values.direccion,
          fechaNacimiento: values.fechaNacimiento,
          trabajoRemoto: values.trabajoRemoto,
          oficinas: values.oficinas
        }
  
        if (isEditing) {
          await updateEmpleado.mutateAsync({
            id: empleadoData.id,
            empleadoData: payload
          })
        } else {
          await createEmpleado.mutateAsync(payload)
        }
        
        toast({
          title: isEditing ? 'Empleado actualizado' : 'Empleado creado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose()
      } catch (error) {
        console.error('Error en la petición:', {
          request: error.config,
          response: error.response
        })
        toast({
          title: 'Error',
          description: error.response?.data?.message || error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    },
  })

  useEffect(() => {
    if (isOpen) {
      formik.resetForm()
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? 'Editar Empleado' : 'Nuevo Empleado'}
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

              <FormControl isInvalid={formik.touched.dni && formik.errors.dni}>
                <FormLabel>DNI</FormLabel>
                <Input
                  name="dni"
                  value={formik.values.dni}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dni && formik.errors.dni && (
                  <Text color="red.500" fontSize="sm">{formik.errors.dni}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={formik.touched.telefono && formik.errors.telefono}>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  name="telefono"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.telefono && formik.errors.telefono && (
                  <Text color="red.500" fontSize="sm">{formik.errors.telefono}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Dirección</FormLabel>
                <Input
                  name="direccion"
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>

              <FormControl isInvalid={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <Input
                  type="date"
                  name="fechaNacimiento"
                  value={formik.values.fechaNacimiento}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  max={new Date().toISOString().split('T')[0]}
                />
                {formik.touched.fechaNacimiento && formik.errors.fechaNacimiento && (
                  <Text color="red.500" fontSize="sm">{formik.errors.fechaNacimiento}</Text>
                )}
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Trabajo Remoto</FormLabel>
                <Switch
                  name="trabajoRemoto"
                  isChecked={formik.values.trabajoRemoto}
                  onChange={formik.handleChange}
                />
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
              isLoading={formik.isSubmitting || createEmpleado.isLoading || updateEmpleado.isLoading}
            >
              {isEditing ? 'Actualizar' : 'Guardar'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default EmpleadoForm