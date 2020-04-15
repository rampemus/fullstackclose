import React, { useState, useEffect } from 'react'
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
            <tr key={`${contact.id}row`}>

              {Object.entries(contact).map(valuepair => {
                if (valuepair[0] === 'phone' || valuepair[0] === 'mobile') {
                  return (<td key={`${contact.id}${valuepair[1]}`}>{valuepair[1].map((value, index) => 
                    <div key={`${contact.id}${valuepair[1]}${index}`}>{value}</div>)}</td>
                  )
                }
                return(<td key={`${contact.id}${valuepair[1]}`}>{valuepair[1]}</td>)
              })}

              <td key={`${contact.id}delete`}><button>Delete</button></td>

            </tr>
          )}

        </tbody>
      </table>
    </div>
  )
}

export default ContactList
