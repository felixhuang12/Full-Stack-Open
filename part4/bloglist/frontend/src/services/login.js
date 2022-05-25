import axios from 'axios'
const baseUrl = '/api/login'
const usersUrl = '/api/users'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

// username, name, password
const createUser = async (newUser) => {
  const response = await axios.post(usersUrl, newUser)
  return response.data
}

// eslint-disable-next-line
export default { login, createUser }