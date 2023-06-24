import styles from "./ChatHeader.module.scss"
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { User } from "../types"

type Props = {
    user: User 
}

export default function ChatHeader({user}: Props) {

  const [cookies, setCookie, removeCookie] = useCookies<string>(['user'])
  const navigate = useNavigate()

  const logOut = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    navigate('/')
  }



  return (
    <div className={styles.chatHeader}>
        <div className={styles.profile}>
            <div onClick={() => navigate('/profile')} className={styles.imgContainer}>
                <img src={user?.url} alt="user" />
            </div>
            <h3>{user?.first_name}</h3>
        </div>
        <button onClick={logOut} className="secondary-button">
            Logout
        </button>
    </div>
  )
}