import styles from "./ChatInput.module.scss"
import { useState } from 'react'
import axios from 'axios'
import { User } from "../types"

type Props = {
    user: User,
    clickedUser: User,
    getUserMessages: any //!,
    getClickedUsersMessages: any //!
}

export default function ChatInput({user, clickedUser, getUserMessages, getClickedUsersMessages}: Props) {

    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
  
    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea
        }
  
        try {
            await axios.post('http://localhost:8080/message', { message })
            getUserMessages()
            getClickedUsersMessages()
            setTextArea("")
        } catch (error) {
            console.log(error)
        }
    }

  return (
 <div className={styles.chatInput}> 
    <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="secondary-button" onClick={addMessage}>Send</button>
    </div>  )
}