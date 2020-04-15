import React, { useState, useEffect } from 'react'
import ContactListRow from './ContactListRow'
import contactService from '../services/contact'

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
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Nickname</th>
            <th>Title</th>
            <th>Phone</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Street</th>
            <th>Postcode</th>
            <th>City</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
          {contacts && contacts.length > 0 && contacts.map(contact =>
            <ContactListRow key={contact.id} contact={contact} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList
