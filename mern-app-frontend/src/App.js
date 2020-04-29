import React, { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import contactService from './services/contact'
import ContactList from './components/ContactList'
import Login from './components/Login'
import './App.css'

function App() {

  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(()=>{
    token && updateContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  const updateContacts = () => {
    contactService.getAll(token).then(response => {
      setContacts(response)
    })
  }

  const handleLogin = (newToken) => {
    setToken(newToken)
  }

  return (
    <div className="App">
      {token 
       ? <div>
        <ContactList
          token={token}
          contacts={contacts}
          setSelectedContact={setSelectedContact}
          updateContacts={updateContacts}
        />
        <ContactForm
          initialValues={selectedContact}
          updateContacts={updateContacts}
          handleCancel={() => setSelectedContact(null)}
          token={token}
        />
        </div> 
       : <Login handleLogin={handleLogin}/>}
      
    </div>
  )
}

export default App
