import styles from "./Nav.module.scss"
import logo_white from "../assets/chalky-logo-white.png"
import logo_color from "../assets/chalky-logo-color.png"


type Props = {
  minimal: boolean
}

const Nav = ({ minimal }: Props) => {

  return (
    <div className={styles.nav}>
        <div className={styles.logoContainer}>
            <img src={minimal ? logo_color : logo_white} className={styles.logo} alt="" />
        </div>

    </div>
  )
}

export default Nav