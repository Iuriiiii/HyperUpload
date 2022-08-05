import React from 'react'
import "../components/form.css"
import "../components/root.css"

const LogForm = () => {

  return (
    <form>
      <div className='form-inner'>
        <h2>Login</h2>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input type="text" name="text" id="text"></input>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input type="email" name="email" id="email"></input>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type="password" name="password" id="password"></input>
        </div>
        <input type="submit" value="LOGIN" className='send'></input>
      </div>
    </form>
  )
}

export default LogForm