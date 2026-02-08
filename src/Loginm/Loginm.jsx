import React, {  useContext, useEffect, useState } from 'react'
import './Loginm.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { input } from '../assets/output'
import { StoreContext } from '../Context/StoreContext'



const Loginm = ({ setShowLogin }) => {

 const { url,
    setToken,
    doneAudio,
    submitAudio,
    wonAudio,
    addAudio,
    timeAudio,} = useContext(StoreContext)


  const [curentState, setCurentState] = useState("Sign-up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const onLogin = async (event) => {
    event.preventDefault()

    let newUrl = url
    if (curentState === "Login") {
      newUrl += "/api/user/login"
      wonAudio.play()
    } else {
      newUrl += "/api/user/register"
      doneAudio.play()
    }

    const response = await axios.post(newUrl, data)

    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
      wonAudio.play()
    } else {
      alert(response.data.message)
      doneAudio.play()
    }
  }

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='login'>
      <form onSubmit={onLogin} className='login-cont'>
        <div className="titel">
          <h2  onClick={() =>navigate("/")}>{curentState}</h2>
          <img onClick={() => setShowLogin(false)} src={input.admin} alt="" />
        </div>

        <div className="login-input">
          {curentState !== "Login" && (
            <input
              name='name'
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              required
              placeholder='Enter Your Name'
            />
          )}

          <input
            name='email'
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            required
            placeholder='Enter Your Gmail'
          />

          <input
            name='password'
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            required
            placeholder='Enter Your Password'
          />
        </div>

        <button type='submit'>
          {curentState === "Sign-up" ? "Create Account" : "Login"}
        </button>

        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms & privacy policy</p>
        </div>

        {curentState === "Login" ? (
          <p>Create new account?
            <span onClick={() => { setCurentState("Sign-up") }}>
              Click here
            </span>
          </p>
        ) : (
          <p>Already have an account?
            <span onClick={() => { setCurentState("Login") }}>
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  )
}

export default Loginm


//<input name='mobile' onChange={onChangeHandler} value={data.mobile} type="text" required placeholder='Enter Your Mobile Number' />





