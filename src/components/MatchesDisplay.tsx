import { useEffect, useState } from 'react'
import styles from "./MatchesDisplay.module.scss"
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Match, User } from '../types'

type Props = {
    matches: Match[]
    setClickedUser: (user: User | null) => void;
}

export default function MatchesDisplay({matches, setClickedUser}: Props) {

    const [matchedProfiles, setMatchedProfiles] = useState<User[]>([])
    const [cookies, setCookie, removeCookie] = useCookies<string>();
  
    const matchedUserIds = matches?.map(({ user_id }) => user_id)
    const userId = cookies.UserId;
  
    const getMatches = async() => {
      try {
        const response = await axios.get('http://localhost:8080/users', {
          params: { userIds: JSON.stringify(matchedUserIds)}
      })
      setMatchedProfiles(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      getMatches()
    }, [matches])
  
    const filteredMatchedProfiles = matchedProfiles?.filter(
      (matchedProfile) =>
        matchedProfile.matches.filter((profile) => profile.user_id == userId)
          .length > 0
    );
  
  

  return (
    <div className={styles.matchesDisplay}>
    {filteredMatchedProfiles?.map((match, _index) => (
      <div
        key={_index}
        className={styles.matchCard}
        onClick={() => setClickedUser(match)}
      >
        <div className={styles.imgContainer}>
          <img src={match?.url} alt={match?.first_name + " profile"} />
        </div>
        <h3>{match?.first_name}</h3>
      </div>
    ))}
  </div>
  )
}