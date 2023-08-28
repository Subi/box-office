import Image from 'next/image';
import styles from './navbar.module.css';
import {navLogo} from '@/images';
import SearchBar from '../searchbar/searchbar';
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav id={styles.navbar}>
            <div className={styles.navContent}>
                <Link href={"/"}>
                <div className={styles.logoContainer}>
                    <span className={styles.logoName}>Box Office</span>
                    <Image src={navLogo} alt='logo' width={33} height={33}/>
                </div>
                </Link>
                {/* <SearchBar/> */}
                <div className={styles.register}>
                    {/* <span>Sign up</span>
                    <span>Login</span> */}
                    <Link className={styles.waitlist} href={"https://form.typeform.com/to/EYD74sa8"}>Join Waitlist</Link>
                </div>
            </div>
        </nav>
    )
}