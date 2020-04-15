import React from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import './App.css'

function App() {
  return (
    <div className="App">
      <ContactList />
      <ContactForm />
    </div>
  )
}

export default App
