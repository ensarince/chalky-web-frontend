import { FormattedMessage } from "../types"
import styles from "./Chat.module.scss"

type Props = {
    descendingOrderMessages: FormattedMessage[]
}

function Chat({ descendingOrderMessages }: Props) {
  return (
    <div className={styles.chatDisplay}>
        {descendingOrderMessages.map((message, _index) => (
                    <div key={_index}>
                        <div className={styles.chatHeader}>
                            <div className={styles.imgContainer}>
                                <img src={message.img} alt={message.name + ' profile'}/>
                            </div>
                            <p>{message.name}</p>
                        </div>
                        <p>{message.message}</p>
                    </div>
                ))}
    </div>  )
}

export default Chat