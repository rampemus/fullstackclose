import React from 'react'
import contactService from '../services/contact'

const ContactListRow = (props) => {

  const { contact, updateContacts, handleSelect, token } = props

  const handleRowDelete = () => {
    contactService.deleteContact(contact, token).then(response => {
      updateContacts()
    })
  }

  return(
    <tr key={`${contact.id}row`}>

      {Object.entries(contact).map(valuepair => {
        if (valuepair[0] === 'phone' || valuepair[0] === 'mobile') {
          return (<td key={`${contact.id}${valuepair[0]}`}>{valuepair[1].map((value, index) =>
            <div key={`${contact.id}${valuepair[0]}${index}`}>{value}</div>)}</td>
          )
        }
        return (<td key={`${contact.id}${valuepair[0]}`}>{valuepair[1]}</td>)
      })}

      <td key={`${contact.id}delete`}>
        <button onClick={()=>handleSelect(contact)}>Edit</button>
        <button onClick={()=>handleRowDelete()}>Delete</button>
      </td>

    </tr>
  )
}

export default ContactListRow
