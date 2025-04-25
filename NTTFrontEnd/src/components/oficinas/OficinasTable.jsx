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
  useToast
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useDeleteOficina } from '../../hooks/useOficinas'

const OficinasTable = ({ oficinas }) => {
  const deleteOficina = useDeleteOficina()
  const toast = useToast()

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta oficina?')) {
      try {
        await deleteOficina.mutateAsync(id)
        toast({
          title: 'Oficina eliminada',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: 'Error al eliminar oficina',
          description: error.response?.data?.message || error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  const columns = useMemo(
    () => [
      {
        header: 'Nombre',
        accessorKey: 'nombre',
      },
      {
        header: 'Dirección',
        accessorKey: 'direccion',
      },
      {
        header: 'Acciones',
        cell: ({ row }) => (
          <HStack spacing={2}>
            <ChakraLink as={RouterLink} to={`/oficinas/${row.original.id}`}>
              <Button size="sm" colorScheme="blue">
                Ver
              </Button>
            </ChakraLink>
            <Button 
              size="sm" 
              colorScheme="red"
              onClick={() => handleDelete(row.original.id)}
              isLoading={deleteOficina.isLoading}
            >
              Eliminar
            </Button>
          </HStack>
        ),
      },
    ],
    [deleteOficina]
  )

  const table = useReactTable({
    data: oficinas || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Box overflowX="auto">
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
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
            <Tr key={row.id}>
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
  )
}

export default OficinasTable