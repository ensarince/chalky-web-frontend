import { useState, ChangeEvent, useEffect } from 'react'
import styles from "./Onboarding.module.scss"
import Nav from "../components/Nav"
import { useCookies } from "react-cookie"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Match, User } from '../types'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { CircularProgress } from '@mui/material'

type Props = {}

export default function Onboarding({}: Props) {

    const [cookies, setCookies, removeCookies] = useCookies<string>()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState<User | undefined>()
    const userId = cookies.UserId

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

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); 
        }, 2000); 
    }, []);

    const [formData, setFormData] = useState({
            user_id : cookies.UserId,
            first_name: "",
            dob_day: "",
            dob_month: "",
            dob_year: "",
            show_gender: false,
            gender_identity: "",
            gender_interest: "",
            url: "",
            about: "",
            matches: [] as Match[] 
        })


    // Update the formData whenever the user object changes for updating matches
    useEffect(() => {
        setFormData((prevFormData) => ({
        ...prevFormData,
        matches: user ? user.matches : []
        }));
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
            try {
                const response = await axios.put('http://localhost:8080/user', {formData})
                console.log(response)
                const success = response.status === 200
                if (success) navigate('/dashboard')
            } catch (err) {
                console.log(err)
            }
        }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

            const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
            const name = e.target.name

            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }))
    }

return (
    <>
    <Nav minimal={true} />
        <div className={styles.onboarding}>
            {loading ? (
                <CircularProgress sx={{color:"#A9415A"}}/>
            ) : (
                <>
                <h2>{user ? "EDIT ACCOUNT" : "CREATE ACCOUNT"}</h2>
                <form onSubmit={handleSubmit}>
                        <section>
                            <label htmlFor="first_name">First Name</label>
                            <input
                                id="first_name"
                                type='text'
                                name="first_name"
                                placeholder={user ? user.first_name : "First Name"}
                                required={true}
                                value={formData.first_name}
                                onChange={handleChange}
                            />

                            <label>Birthday</label>
                            <div className={styles.multipleInput}>
                                <input
                                    id="dob_day"
                                    type="number"
                                    name="dob_day"
                                    placeholder={user ? user.dob_day : "DD"}
                                    required={true}
                                    value={formData.dob_day}
                                    onChange={handleChange}
                                />

                                <input
                                    id="dob_month"
                                    type="number"
                                    name="dob_month"
                                    placeholder={user ? user.dob_month : "MM"}
                                    required={true}
                                    value={formData.dob_month}
                                    onChange={handleChange}
                                />

                                <input
                                    id="dob_year"
                                    type="number"
                                    name="dob_year"
                                    placeholder={user ? user.dob_year : "YYYY"}
                                    required={true}
                                    value={formData.dob_year}
                                    onChange={handleChange}
                                />
                            </div>

                            <label>Gender</label>
                            <div className={styles.multipleInput}>
                                <input
                                    id="man-gender-identity"
                                    type="radio"
                                    name="gender_identity"
                                    value="man"
                                    onChange={handleChange}
                                    checked={formData.gender_identity === "man"}
                                />
                                <label htmlFor="man-gender-identity">Man</label>
                                <input
                                    id="woman-gender-identity"
                                    type="radio"
                                    name="gender_identity"
                                    value="woman"
                                    onChange={handleChange}
                                    checked={formData.gender_identity === "woman"}
                                />
                                <label htmlFor="woman-gender-identity">Woman</label>
                                <input
                                    id="more-gender-identity"
                                    type="radio"
                                    name="gender_identity"
                                    value="more"
                                    onChange={handleChange}
                                    checked={formData.gender_identity === "more"}
                                />
                                <label htmlFor="more-gender-identity">More</label>
                            </div>

                            <label htmlFor="show-gender">Show Gender on my Profile</label>

                            <input
                                id="show-gender"
                                type="checkbox"
                                name="show_gender"
                                onChange={handleChange}
                                checked={formData.show_gender}
                            />

                            <label>Show Me</label>

                            <div className={styles.multipleInput}>
                                <input
                                    id="man-gender-interest"
                                    type="radio"
                                    name="gender_interest"
                                    value="man"
                                    onChange={handleChange}
                                    checked={formData.gender_interest === "man"}
                                />
                                <label htmlFor="man-gender-interest">Man</label>
                                <input
                                    id="woman-gender-interest"
                                    type="radio"
                                    name="gender_interest"
                                    value="woman"
                                    onChange={handleChange}
                                    checked={formData.gender_interest === "woman"}
                                />
                                <label htmlFor="woman-gender-interest">Woman</label>
                                <input
                                    id="everyone-gender-interest"
                                    type="radio"
                                    name="gender_interest"
                                    value="everyone"
                                    onChange={handleChange}
                                    checked={formData.gender_interest === "everyone"}
                                />
                                <label htmlFor="everyone-gender-interest">Everyone</label>

                            </div>

                            <label htmlFor="about">About me</label>
                            <input
                                id="about"
                                type="text"
                                name="about"
                                required={true}
                                placeholder={user ? user.about : "I like long walks..."}
                                value={formData.about}
                                onChange={handleChange}
                            />
                            {user ? (
                                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <input type="submit"/>
                                    <button className="secondary-button" onClick={() => navigate('/profile')}>
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <input type="submit"/>
                            )}

                        </section>

                        <section>
                            <label htmlFor="url">Profile Photo</label>
                            <input
                                type="url"
                                name="url"
                                id="url"
                                onChange={handleChange}
                                required={true}
                                placeholder={user ? user.url : ""}
                            />
                            <div className={styles.photoInput}>
                                {formData.url && <img className={styles.photo} src={formData.url} alt="profile pic preview"/>}
                            </div>
                        </section>

                </form>    
                </>
            )}
        </div>
    </>
    )
}

