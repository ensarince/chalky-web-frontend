import { useState } from 'react'
import styles from "./ChatContainer.module.scss"
import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'
import { User } from '../types'

type Props = {
    user: User 
}

export default function ChatContainer({ user }: Props) {

const [ clickedUser, setClickedUser ] = useState<User | null>(null)

  return (
    <div className={styles.chatContainer}>

    <ChatHeader user={user}/>

    <div>
            <button className={styles.option} /* disabled={!!clickedUser}  */
                onClick={() => setClickedUser(null)}>Matches
            </button>
            <button className={styles.option} disabled={!clickedUser}>Chat</button>
    </div>

        {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}

        {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
    </div>  
    )
}