import Link from "next/link"
import styles from './loggedOut.module.css';


export default function LoggedOut(){
    return (
        <div style={{display: "flex"}}>
            <span className={styles.signup}>Sign up</span>
            <Link href={"/sign-in"}>
                <button className={styles.login}>Login</button>
            </Link> 
        </div>
        
    )
}