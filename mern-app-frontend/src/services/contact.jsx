import axios from 'axios'
const baseUrl = '/api/contact'

const getAll = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'token': token ? token.toString() : ''
    }
  }
  const request = axios.get(baseUrl, config )
  return request.then(response => response.data)
}

const createContact = (contact) => {
  const request = axios.post(baseUrl, contact)
  return request.then(response => response.data)
}

const modifyContact = (contact) => {
  const request = axios.put(baseUrl, contact)
  return request.then(response => response.data)
}

const deleteContact = (contact) => {
  const request = axios.delete(`${baseUrl}/${contact.id}`)
  return request.then(response => response.data)
}

export default { getAll, createContact, modifyContact, deleteContact }
