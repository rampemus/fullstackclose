import React from 'react'
import { Formik, Field, Form } from 'formik'
import loginService from '../services/login'

const Login = (props) => {
  
  const { handleLogin } = props

  const handleRegister = (values) => {
    loginService.register({ ...values }).then(message => {
      console.log(message)
    }).catch(error => {
      console.log(error)
    })
  }

  return(
    <div>
      <h1>Login</h1>

      <Formik
        initialValues={{ username: 'asdf', password: '' }}
        onSubmit={(values) => {
          loginService.login({ ...values }).then( data => {
            console.log('Succes token', data.token)
            handleLogin && handleLogin(data.token)
          }).catch(error => {
            console.log('login failed', error)
          })
        }}
      >{({values}) =>
        <Form>
          <p> Username: <Field type='text' name='username'/></p>
          <p> Password: <Field type='password' name='password'/></p>
          <p> <button onClick={(event)=>{
            event.preventDefault()
            handleRegister(values)
          }}>Register</button><button type='submit'>Login</button> </p>
        </Form>
      }</Formik>
    </div>
  )
}

export default Login
