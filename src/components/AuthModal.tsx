import { useState } from 'react'
import styles from "./AuthModal.module.scss"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"
import { CookieData } from '../types';

type Props = {
  setShowModal: (value: boolean) => void
  isSignUp: boolean
  setIsSignUp: (value: boolean) => void
}

export default function AuthModal({setShowModal, isSignUp, setIsSignUp}: Props) {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const [cookies, setCookies, removeCookies] = useCookies<string>()

  const navigate = useNavigate();

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async(e: React.FormEvent) => {
      //prevent page refresh
      e.preventDefault()
      try {
        if (isSignUp && (password !== confirmPassword)) {
            setError('Passwords need to match!')
            return
        }
        //backaend connection, post the data, and set cookies with response data
        const response = await axios.post(`http://localhost:8080/${isSignUp ? 'signup' : 'login'}`, {
          email, password
        })

        //set cookies
        setCookies('AuthToken', response.data.token )
        setCookies('UserId', response.data.userId )

        const success = response.status === 201


        if(success && isSignUp) navigate('/onboarding')
        if(success && !isSignUp) navigate('/dashboard')

        window.location.reload()
        
      } catch (error) {
        console.log(error)
      }
    }
    
  return (
    <div className={styles.authModal}>
        <div className={styles.iconClose} onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </div>
        <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
        <p style={{fontStyle:"italic", fontSize:"14px"}}>by clicking Log In, you agree our terms.
          Learn how we process your data in our Privacy Policy and Cookie Policy.
        </p>
        <form action="">
          <div className={styles.div__Form}>
            <input type="email" id='email' name='email' placeholder='Email' required onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" id='password' name='password' required placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" id='password-check' name='password-check' placeholder='Confirm Password' required onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button onClick={handleSubmit} className='secondary-button'>{isSignUp ? "SIGN UP" : "LOG IN"}</button>
            {
              isSignUp ? 
              ( <p>Already have an account? 
                <span style={{cursor:"pointer", fontWeight:"bolder", color:"rgb(254, 48, 114)"}} onClick={() => setIsSignUp(false)}> Login</span>
              </p>) :
              (
                <p>No account yet? 
                <span style={{cursor:"pointer", fontWeight:"bolder", color:"rgb(254, 48, 114)"}} onClick={() => setIsSignUp(true)}> Signup</span>
              </p>
              )
            }
            <p>{error}</p>
          </div>
        </form>
        <hr />
        <h2>GET THE APP</h2>
    </div>
  )
}

