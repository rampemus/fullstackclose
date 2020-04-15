import React from 'react'
import { Formik, Field, Form, FieldArray } from 'formik'


const ContactForm = (props) => {

  return(
    <div>
      <h1>Contact form</h1>
      <Formik
        onSubmit={(values, { setSubmitting })=>{
          console.log('Sending values', values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, isValid, errors, values, setValues }) => (
          <Form>
            <p>Firstname: <Field type='text' name='firstname'></Field></p>
            <p>Lastname: <Field type='text' name='lastname'></Field></p>
            <p>Nickname: <Field type='text' name='nickname'></Field></p>
            <p>Title: <Field type='text' name='title'></Field></p>
            <p>Phone: <Field type='text' name='phone'></Field></p >
            <p>Mobile: <Field type='text' name='mobile'></Field></p >
            <p>Email: <Field type='text' name='email'></Field></p >
            <p>Street: <Field type='text' name='street'></Field></p >
            <p>Postcode: <Field type='text' name='postcode'></Field></p >
            <p>City: <Field type='text' name='city'></Field></p >
            <p>Country: <Field type='text' name='country'></Field></p >
            <p> <button type='submit' disabled={isSubmitting}>save</button> </p>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ContactForm
