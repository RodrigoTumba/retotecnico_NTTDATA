import axios from 'axios'

const API_URL = '/api/auth'

const mockUsers = [
  { id: 1, email: 'admin@test.com', password: 'admin123', role: 'admin' },
  { id: 2, email: 'user@test.com', password: 'user123', role: 'user' }
]

/*
const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  return response.data
}

*/

  

const login = async (credentials) => {
  const user = mockUsers.find(u => 
    u.email === credentials.email && 
    u.password === credentials.password
  )
  
  if (!user) throw new Error('Credenciales inválidas')
  
  return {
    user: { id: user.id, email: user.email, role: user.role },
    token: 'mock-token-here'
  }
}

const authApi = {
  login,
}


export default authApi