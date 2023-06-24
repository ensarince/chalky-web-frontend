import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import DrawerLeft from "../components/DrawerLeft"
import styles from "./Profile.module.scss"
import Split from "../layouts/Split"
import axios from "axios"
import { useCookies } from "react-cookie"
import { User } from "../types"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import moment from "moment"
import { PencilSquareIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"
import { HeartIcon } from "@heroicons/react/20/solid"

type Props = {}

export default function Profile({}: Props) {

  const [user, setUser] = useState<User | undefined>()
  const [cookies, setCookie, removeCookie] = useCookies<string>(['user'])

  const userId = cookies.UserId
  const navigate = useNavigate();

  const calculateAge = (dobYear: string | undefined) => {
    if (!user?.dob_year) {
      return "";
    }else {
      const currentYear = moment().year();
      const age = currentYear - parseInt(user?.dob_year);
      return age.toString();
    }
  };


  //get user data from backend
  const getUser = async () => {
      try {
          const response = await axios.get('http://localhost:8080/user', {
              params: {userId}
          })
          setUser(response.data)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    getUser()
  }, [])

  console.log(user)

  return (
    <>
      <div className={styles.profile}>
        {!user ? null : (
            <div onClick={() => navigate('/dashboard')} 
              style={{position:"absolute", top:"5%", left:"2.5%", color:"#A9415A"}} 
              className={styles.btn__help}>
                <HeartIcon/>
            </div>
        )}
        <DrawerLeft />
        <div className="slide-content">
            <Split align="center">
              {!user ? (
                <CircularProgress sx={{color:"#A9415A"}}/>
              ) : (
              <div className={styles.profileSection}>
                <Carousel 
                  showIndicators={false} 
                  showThumbs={false}
                  showStatus={false}
                >
                  <div>
                      <img src={user?.url} />
                  </div>
                  <div>
                      <img src={user?.url} />
                  </div>
                </Carousel>

                <div className={styles.profileInfo}>
                  <p>
                    {user?.first_name} {" "}
                    <span style={{fontWeight:"normal"}}>{calculateAge(user?.dob_year)}</span>
                  </p>
                  <p>
                    {user?.gender_identity}
                  </p>
                  <p>
                    {user?.about}
                  </p>
                  <button className={styles.btn__help} onClick={() => navigate('/onboarding')}  style={{ background: "none", border: "none" }}>
                    <PencilSquareIcon style={{width:"24px"}} />
                  </button>
                </div>
              </div>
                )}
            </Split>
        </div>
      </div>
  </>
  )
}