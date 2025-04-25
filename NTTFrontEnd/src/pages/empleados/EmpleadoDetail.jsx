import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import EmpleadoInfo from '../../components/empleados/EmpleadoInfo'
import EmpleadoOficinas from '../../components/empleados/EmpleadoOficinas'

const EmpleadoDetail = () => {
  const { id } = useParams()

  return (
    <Box>
      <Heading mb={6}>Detalle del Empleado</Heading>
      
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Información</Tab>
          <Tab>Oficinas</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EmpleadoInfo empleadoId={id} />
          </TabPanel>
          <TabPanel>
            <EmpleadoOficinas empleadoId={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default EmpleadoDetail