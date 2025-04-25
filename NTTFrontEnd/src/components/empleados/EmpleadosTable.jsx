import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Link as ChakraLink,
  Button,
  HStack,
  Badge,
  useToast,
  Text,
  Tooltip
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDeleteEmpleado } from '../../hooks/useEmpleados';

const EmpleadosTable = ({ empleados }) => {
  const deleteEmpleado = useDeleteEmpleado();
  const toast = useToast();

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este empleado?')) {
      try {
        await deleteEmpleado.mutateAsync(id);
      } catch (error) {

        console.error('Error al eliminar empleado:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const columns = useMemo(
    () => [
      {
        header: 'Nombre',
        accessorKey: 'nombre',
        cell: (info) => (
          <Text fontWeight="medium">{info.getValue()}</Text>
        ),
      },
      {
        header: 'Teléfono',
        accessorKey: 'telefono',
      },
      {
        header: 'DNI',
        accessorKey: 'dni',
      },
      {
        header: 'Dirección',
        accessorKey: 'direccion',
        cell: (info) => (
          <Tooltip label={info.getValue()} hasArrow>
            <Text noOfLines={1} maxWidth="150px">
              {info.getValue() || 'No especificada'}
            </Text>
          </Tooltip>
        ),
      },
      {
        header: 'Fecha Nacimiento',
        accessorKey: 'fechaNacimiento',
        cell: (info) => (
          <Text>{formatDate(info.getValue())}</Text>
        ),
      },
      {
        header: 'Modalidad',
        accessorKey: 'trabajoRemoto',
        cell: (info) => (
          <Badge 
            colorScheme={info.getValue() ? 'green' : 'blue'}
            variant="subtle"
          >
            {info.getValue() ? 'Remoto' : 'Presencial'}
          </Badge>
        ),
      },
      {
        header: 'Oficinas',
        accessorKey: 'oficinas',
        cell: (info) => (
          <Tooltip 
            label={info.getValue()?.map(o => o.nombre).join(', ')} 
            hasArrow
            isDisabled={!info.getValue()?.length}
          >
            <Text noOfLines={1} maxWidth="200px">
              {info.getValue()?.map(oficina => oficina.nombre).join(', ') || 'Ninguna'}
            </Text>
          </Tooltip>
        ),
      },
      {
        header: 'Acciones',
        cell: ({ row }) => (
          <HStack spacing={2}>
            <ChakraLink as={RouterLink} to={`/empleados/${row.original.id}`}>
              <Button size="sm" colorScheme="blue" variant="outline">
                Detalles
              </Button>
            </ChakraLink>
            <Button 
              size="sm" 
              colorScheme="red" 
              variant="outline"
              onClick={() => handleDelete(row.original.id)}
              isLoading={deleteEmpleado.isLoading}
            >
              Eliminar
            </Button>
          </HStack>
        ),
        size: 150,
      },
    ],
    [deleteEmpleado]
  );

  const table = useReactTable({
    data: empleados || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box overflowX="auto" borderWidth="1px" borderRadius="lg" p={4}>
      <Table variant="striped" colorScheme="gray">
        <Thead bg="gray.100">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th 
                  key={header.id}
                  whiteSpace="nowrap"
                  position="sticky"
                  top="0"
                  zIndex="1"
                  bg="inherit"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} _hover={{ bg: 'gray.50' }}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EmpleadosTable;