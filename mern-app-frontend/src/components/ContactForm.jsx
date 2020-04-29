import React from 'react'
import { Formik, Field, Form } from 'formik'
import ContactFieldArray from './ContactFieldArray'
import contactService from '../services/contact'

const ContactForm = (props) => {
  
  const { updateContacts, handleCancel, token } = props

  const initialValues = props.initialValues || {
    firstname: '',
    lastname: '',
    nickname: '',
    title: '',
    phone: [],
    mobile: [],
    email: [],
    street: '',
    postcode: '',
    city: '',
    country: ''
  }

  return(
    <div className='contact-form'>
      <h2>Contact form {initialValues.id ? `(#${initialValues.id})` : ''}</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { setSubmitting, setValues })=>{
          setSubmitting(true)
          if (initialValues.id) {
            contactService.modifyContact({ ...values, id: initialValues.id, token }).then(response => {
              handleCancel && handleCancel()
              updateContacts && updateContacts()
              setSubmitting(false)
            }).catch(error => {
              updateContacts && updateContacts()
              setSubmitting(false)
            })
          } else {
            contactService.createContact(values, token).then(response => {
              setValues(initialValues)
              updateContacts && updateContacts()
              setSubmitting(false)
            }).catch(error => {
              setSubmitting(false)
              console.log('Contact creation failed', error)
            })
          }
        }}
      >
        {({ isSubmitting, values, setValues }) => (
          <Form>
            <div className='contact-form-flexbox'>
              <div className='contact-form-panel'>
                <p>Firstname: <Field type='text' name='firstname'/></p>
                <p>Lastname: <Field type='text' name='lastname'/></p>
                <p>Nickname: <Field type='text' name='nickname'/></p>
                <p>Title: <Field type='text' name='title'/></p>
              </div>
              <div className='contact-form-panel'>
                <ContactFieldArray name='phone' values={values} setValues={setValues} />
                <ContactFieldArray name='mobile' values={values} setValues={setValues} />
                <ContactFieldArray name='email' values={values} setValues={setValues} />
              </div>
              <div className='contact-form-panel'>
                <p>Street: <Field type='text' name='street'/></p>
                <p>Postcode: <Field type='text' name='postcode'/></p>
                <p>City: <Field type='text' name='city'/></p>
                <p>Country: <Field type='text' name='country'/></p>
              </div>
            </div>
            <p>
              <button type='submit' disabled={isSubmitting}>Save</button> 
              <button onClick={() => {
                handleCancel && handleCancel()
              }} disabled={!initialValues.id}>Cancel</button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ContactForm
