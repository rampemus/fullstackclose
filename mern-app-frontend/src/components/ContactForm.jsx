import React from 'react'
import { Formik, Field, Form } from 'formik'
import ContactFieldArray from './ContactFieldArray'

const ContactForm = (props) => {

  return(
    <div className='contact-form'>
      <h1>Contact form</h1>
      <Formik
        initialValues={{ phone: [], mobile: [], email: [] }}
        onSubmit={(values, { setSubmitting })=>{
          console.log('Sending values', values)
          setSubmitting(false)
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
            <p> <button type='submit' disabled={isSubmitting}>save</button> </p>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ContactForm
