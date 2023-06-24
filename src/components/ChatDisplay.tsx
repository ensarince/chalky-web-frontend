import { useEffect, useState } from 'react'
import styles from "./ChatDisplay.module.scss"
import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import { FormattedMessage, Message, User } from '../types'
import { useNavigate } from 'react-router-dom'

type Props = {
    user: User 
    clickedUser: User
}

export default function ChatDisplay({ user , clickedUser }: Props) {

    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [usersMessages, setUsersMessages] = useState<Message[]| undefined>()
    const [clickedUsersMessages, setClickedUsersMessages] = useState<Message[] | undefined>()
    const navigate = useNavigate()

    const getUsersMessages = async () => {
        try {
                const response = await axios.get('http://localhost:8080/messages', { 
                    params: { userId: userId, correspondingUserId: clickedUserId}
                })
            setUsersMessages(response.data)
            } catch (error) {
            console.log(error)
        }
    }

    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/messages', {
                params: { userId: clickedUserId , correspondingUserId: userId}
            })
            setClickedUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsersMessages()
        getClickedUsersMessages()
    }, [])
 
    const messages: FormattedMessage [] = []

    usersMessages?.forEach((message: Message) => {
        const formattedMessage: FormattedMessage = {
            name: user?.first_name,
            img: user?.url,
            message: message.message,
            timestamp: message.timestamp,
        };
        messages.push(formattedMessage);
    });
    
    
    clickedUsersMessages?.forEach((message) => {
        const formattedMessage: FormattedMessage = {
            name: clickedUser?.first_name,
            img: clickedUser?.url,
            message: message.message,
            timestamp: message.timestamp,
            };
            messages.push(formattedMessage);
    });

    const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

  return (
    <div className={styles.chatDisplay}>

        <Chat descendingOrderMessages={descendingOrderMessages}/>
        {/* here we should get the correspondent user image and then navigate to profile page with custom profile data  */}
            <div onClick={() => navigate('/profile')} className={styles.imgContainer}>
                <img src={user?.url} alt="user" />
            </div>
            <ChatInput
                user={user}
                clickedUser={clickedUser} getUserMessages={getUsersMessages} 
                getClickedUsersMessages={getClickedUsersMessages}
            />
    </div>  
    )
}