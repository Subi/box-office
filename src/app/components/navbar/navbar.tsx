import Image from 'next/image';
import styles from './navbar.module.css';
import {navLogo} from '@/images';

export default function NavBar() {
    return (
        <nav id={styles.navbar}>
            <div className={styles.navContent}>
                <div className={styles.logoContainer}>
                    <span className={styles.logoName}>Box Office</span>
                    <Image src={navLogo} alt='logo' width={33} height={33}/>
                </div>
                <div className={styles.register}>
                    <span>Sign up</span>
                    <span>Login</span>
                </div>
            </div>
        </nav>
    )
}