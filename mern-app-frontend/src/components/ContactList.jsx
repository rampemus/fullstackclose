import React, { useState, useEffect } from 'react'
import contactService from '../services/contact'

const ContactList = (props) => {

  const [contacts, setContacts] = useState([])

  useEffect(()=>{
    contactService.getAll().then(response => {
      setContacts(response.data)
      console.log('Data recieved', response)
    })
  },[])

  return(
    <div>
		<h1>Contact list</h1>
    </div>
  )
}

export default ContactList
