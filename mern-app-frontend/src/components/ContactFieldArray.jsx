import React from 'react'
import { Field, FieldArray } from 'formik'
import { capitalizeFirstLetter } from '../utils/stringHelper'

const ContactFieldArray = (props) => {

  const { name, values, setValues } = props

  return(
    <FieldArray type='text' name={name} //values, setValues
      render={() => (
        <div>
          {values[name].map((value, index) =>
            <p key={`${name}${index}`}>
              {capitalizeFirstLetter(name)} {index + 1}: <Field type='text' name={`${name}.${index}`} />
              <button key={`${name}${index}remove`}
                onClick={(event) => {
                  event.preventDefault()
                  setValues({ ...values, [name]: values[name].filter((value, i) => i !== index) })
                }}
              >
                remove
              </button>
            </p>
          )}
          <p><button onClick={(event) => {
              event.preventDefault()
              setValues({ ...values, [name]: values[name].concat('') })}
            }>add {name}</button></p>
        </div>
      )}
    />
  )
}

export default ContactFieldArray
