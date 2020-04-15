import axios from 'axios'
const baseUrl = '/api/contact'

const getAll = () => {
  const request = axios.get(baseUrl)
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
