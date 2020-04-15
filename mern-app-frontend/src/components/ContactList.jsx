import React, { useState, useEffect } from 'react'
import ContactListRow from './ContactListRow'
import contactService from '../services/contact'
import { capitalizeFirstLetter } from '../utils/stringHelper'

const ContactList = (props) => {

  const [contacts, setContacts] = useState([])

  useEffect(()=>{
    contactService.getAll().then(response => {
      setContacts(response)
      console.log('Data recieved', response)
    })
  },[])

  return(
    <div>
      <h1>Contact list</h1>
      <table className='contact-list-table'>
        <tbody>
          <tr>
            {contacts && contacts[0] && Object.entries(contacts[0]).map(entry => entry[0]).map(value => 
              <th key={`key${value}`}>{capitalizeFirstLetter(value)}</th>
            )}
            <th>Action</th>
          </tr>
          {contacts && contacts.map(contact =>
            <ContactListRow key={contact.id} contact={contact} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList
