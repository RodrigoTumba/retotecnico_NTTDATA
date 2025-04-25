import axios from 'axios'

const API_URL = '/api/empleados'

const getEmpleados = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const getEmpleadoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

const createEmpleado = async (empleadoData) => {
  const response = await axios.post(API_URL, empleadoData)
  return response.data
}

const updateEmpleado = async ({ id, empleadoData }) => {
  const response = await axios.put(`${API_URL}/${id}`, empleadoData)
  return response.data
}

const deleteEmpleado = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}

const empleadoApi = {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
}

export default empleadoApi