import { useState } from 'react'
import Nav from '../components/Nav';
import styles from "./Home.module.scss"
import AuthModal from '../components/AuthModal';
import { useCookies } from 'react-cookie';
import { Typography, Box } from "@mui/material"

type Props = {

}

export default function Home({}: Props) {

  const [showModal, setShowModal] = useState<boolean>(true);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [cookies, setCookie, removeCookie] = useCookies<string>(['user']);
  
    const authToken = cookies.AuthToken;
    const minimal = false;

    const handleClick = () => {
        if (authToken) {
          removeCookie('UserId', cookies.UserId)
          removeCookie('AuthToken', cookies.AuthToken)
          window.location.reload()
          return
      }
        setShowModal(true)
        setIsSignUp(true)
      }

      const handleLogin = () => {
        setShowModal(true)
        setIsSignUp(false)
      }

  return (
    <div className={styles.overlay}>
    <Nav minimal={minimal} />
      <div className={styles.home}>
        <h1 className='primary-title'>Swipe Right</h1>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
          <button className='primary-button' onClick={handleClick}>
            {authToken ? 'Signout' : 'Create Account'}
          </button>

          {!authToken && !minimal && 
          <>
          <Typography variant='h5' sx={{
              color:"#F6F5F4",
              marginTop:"1rem",
              marginBottom:"1rem"
            }}>
              or 
          </Typography>

            <button onClick={handleLogin} disabled={showModal}  className='nav-button'>Log in</button>
            </>
          }
        </Box>

          {showModal && 
            <AuthModal isSignUp={isSignUp} setIsSignUp={setIsSignUp} setShowModal={setShowModal} />
          }

    </div>
  </div>
  )
}

