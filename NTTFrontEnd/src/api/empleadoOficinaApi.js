import api from 'axios'

const API_URL = '/api/empleado-oficina'

const getOficinasByEmpleado = async (empleadoId) => {
  const response = await api.get(`${API_URL}/oficinas/${empleadoId}`)
  return response.data
}

const getEmpleadosByOficina = async (oficinaId) => {
  const response = await api.get(`${API_URL}/empleados/${oficinaId}`)
  return response.data
}

const asignarOficina = async (empleadoId, oficinaId) => {
  if (!empleadoId || !oficinaId) {
    throw new Error('Faltan parámetros requeridos: empleadoId y oficinaId')
  }

  const payload = [{
    id: Number(oficinaId),
    nombre: '', 
    direccion: ''
  }]

  console.log('PRUEBA payload:', payload)

  const response = await api.post(
    `${API_URL}/asignar/${empleadoId}`,
    payload, 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data
}


const actualizarOficinas = async ({ empleadoId, oficinasData }) => {
  const response = await api.put(`${API_URL}/actualizar/${empleadoId}`,oficinasData)
  return response.data
}

const eliminarOficinas = async (empleadoId) => {
  const response = await api.delete(`${API_URL}/eliminar/${empleadoId}`)
  return response.data
}

const eliminarOficina = async (empleadoId, oficinaId) => {
  if (!empleadoId || !oficinaId) {
    throw new Error('Faltan parámetros requeridos: empleadoId y oficinaId')
  }

  const response = await api.delete(`${API_URL}/asignaciones/${empleadoId}/${oficinaId}`)
  return response.data
}

const empleadoOficinaApi = {
  getOficinasByEmpleado,
  getEmpleadosByOficina,
  asignarOficina,
  actualizarOficinas,
  eliminarOficinas,
  eliminarOficina,
}

export default empleadoOficinaApi