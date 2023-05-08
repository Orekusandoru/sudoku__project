import React, { useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
function Login() {

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  async function submit(e){
    e.preventDeffault()

    try{

      await axios.post("http://localhost:8000/",{
        email,password
      })

    }
    catch(e){
      console.log(e);
    }
  }
  


  return (
    <div className='login'>
      <form action="POST">

        <h1>Login</h1>

        <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name="" id="" />
        <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name="" id="" />

        <input type="submit" onClick={submit}/>
      </form>

      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">SignUp Page</Link>
    </div>
  )

}
export default Login 