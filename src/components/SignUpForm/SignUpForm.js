import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom"
import { v4 as uuid } from "uuid"
import styled from 'styled-components'
import * as yup from "yup";
import schema from "./schema"
const initialFormValues = {
  username: '',
  password: '',
  email: '',
  terms: false
}
const initialErrorValues = {
  username: '',
  password: '',
  email: '',
  terms: ''
}

const StyledForm = styled.form`
display:flex;
box-shadow:0.5rem 1rem 0.8rem grey;
background-color:gray;
width:50%;
border:2px solid red;
margin:1% auto;
flex-direction:column;
font-size:2rem;
padding:1%;
align-items:center;
text-align:center;
label{
  
  margin:1%;
  padding:.3%
}
button{
  font-size:calc(2rem + 0.4vw);
  text-align:center;
}
button:hover{
  color:#0392A6;
}
button:active{
  border-radius:8%;
  transform:scale(.94);
}
input{
  padding:2%;
  
}
input:focus{
  box-shadow:0 0 0.5rem #0392A6;
  border:1px solid #0392A6;
  
}
.submit{
  text-align:center;
}
`

export default function SignUpForm({ submit }) {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState(initialErrorValues)
  const [disabled, setDisabled] = useState(true)

  const [users, setUsers] = useState([])

  const onChange = e => {
    const { name, value, checked, type } = e.target
    const newValue = type === "checkbox" ? checked : value

    yup.reach(schema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: ''
        })
      })
      .catch(err => {
        setErrors({
          ...errors,
          [name]: err.errors[0]
        })
      })
    setFormValues({
      ...formValues,
      [name]: newValue
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    const newUser = {
      id: uuid(),
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim(),
    }

    setUsers([
      ...users,
      newUser
    ])
    setFormValues(initialFormValues)
  }

  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => setDisabled(!valid))
      .catch(err => console.log(err))
  }, [formValues])

  return (

    <div className="signup-container">
      <StyledForm onSubmit={onSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={onChange}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={onChange}
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={onChange}
          />
        </label>
        <Link to="/login/signin">Already a member?</Link>
        <label className="terms">
          <input
            type="checkbox"
            name="terms"
            checked={formValues.terms}
            onChange={onChange}
          />
          <span className="checkmark"></span>
          I agree to the <a href="https://www.facebook.com/terms.php">Terms of Service</a>
        </label>

        <button disabled={disabled}>Sign Up</button>
      </StyledForm>

    </div>
  )
}
