import React from 'react'
import ContactListRow from './ContactListRow'
import { capitalizeFirstLetter } from '../utils/stringHelper'

const ContactList = (props) => {

  const { contacts, updateContacts, setSelectedContact, token } = props

  return(
    <div>
      <h1>Contact list</h1>
      <table className='contact-list-table'>
        <tbody>
          <tr>
            {contacts
              && contacts[0] 
              && Object.entries(contacts[0]).map(entry => entry[0]).map(value => 
                <th key={`key${value}`}>
                  {capitalizeFirstLetter(value)}
                </th>
            )}
            {contacts && contacts[0] ? <th>Action</th> : <th>Empty</th>}
          </tr>
          {contacts && contacts.map(contact =>
            <ContactListRow
              key={contact.id}
              contact={contact}
              updateContacts={updateContacts}
              handleSelect={setSelectedContact}
              token={token}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList
