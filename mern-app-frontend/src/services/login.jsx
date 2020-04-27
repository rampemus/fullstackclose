import axios from 'axios'

const register = ({ username, password }) => {
  const request = axios.post('/register', { username, password })
  return request.then(response => response.data)
}

const login = ({ username, password }) => {
  const request = axios.post('/login', { username, password })
  return request.then(response => response.data)
}

const logout = (token) => {
    
}

export default { register, login, logout }
