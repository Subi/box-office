import Link from "next/link"
import styles from './loggedOut.module.css';


export default function LoggedOut(){
    return (
        <div style={{display: "flex"}}>
            <Link href={"/sign-up"} className={styles.signup}>
            <span>Sign up</span>
            </Link>
            <Link href={"/sign-in"}>
                <button className={styles.login}>Login</button>
            </Link> 
        </div>
    )
}