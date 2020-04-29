import axios from 'axios'
const baseUrl = '/api/contact'

const config = (token) => {
  return { headers: {
    'Content-Type': 'application/json',
    'token': token.toString()
  }}
}

const getAll = (token) => {
  const request = axios.get(baseUrl, config(token) )
  return request.then(response => response.data)
}

const createContact = (contact, token) => {
  const request = axios.post(baseUrl, contact, config(token))
  return request.then(response => response.data)
}

const modifyContact = (contact, token) => {
  const request = axios.put(`${baseUrl}/${contact._id}`, contact, config(token))
  return request.then(response => response.data)
}

const deleteContact = (contact, token) => {
  const request = axios.delete(`${baseUrl}/${contact._id}`, config(token))
  return request.then(response => response.data)
}

export default { getAll, createContact, modifyContact, deleteContact }
