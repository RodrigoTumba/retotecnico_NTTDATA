import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import OficinaInfo from '../../components/oficinas/OficinaInfo'
import OficinaEmpleados from '../../components/oficinas/OficinaEmpleados'

const OficinaDetail = () => {
  const { id } = useParams()

  return (
    <Box>
      <Heading mb={6}>Detalle de la Oficina</Heading>
      
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Información</Tab>
          <Tab>Empleados</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <OficinaInfo oficinaId={id} />
          </TabPanel>
          <TabPanel>
            <OficinaEmpleados oficinaId={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default OficinaDetail