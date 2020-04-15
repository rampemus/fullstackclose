import React from 'react'

const ContactListRow = (props) => {

  const { contact } = props

  return(
    <tr key={`${contact.id}row`}>

      {Object.entries(contact).map(valuepair => {
        if (valuepair[0] === 'phone' || valuepair[0] === 'mobile') {
          return (<td key={`${contact.id}${valuepair[1]}`}>{valuepair[1].map((value, index) =>
            <div key={`${contact.id}${valuepair[1]}${index}`}>{value}</div>)}</td>
          )
        }
        return (<td key={`${contact.id}${valuepair[1]}`}>{valuepair[1]}</td>)
      })}

      <td key={`${contact.id}delete`}><button>Delete</button></td>

    </tr>
  )
}

export default ContactListRow
