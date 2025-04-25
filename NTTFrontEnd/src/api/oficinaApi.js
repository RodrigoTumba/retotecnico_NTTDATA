import api from 'axios'

const API_URL = '/api/oficinas'

const getOficinas = async () => {
  const response = await api.get(API_URL)
  return response.data
}

const getOficinaById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`)
  return response.data
}

const createOficina = async (oficinaData) => {
  const response = await api.post(API_URL, oficinaData)
  return response.data
}

const updateOficina = async ({ id, oficinaData }) => {
  const response = await api.put(`${API_URL}/${id}`, oficinaData)
  return response.data
}

const deleteOficina = async (id) => {
  const response = await api.delete(`${API_URL}/${id}`)
  return response.data
}

const oficinaApi = {
  getOficinas,
  getOficinaById,
  createOficina,
  updateOficina,
  deleteOficina,
}

export default oficinaApi