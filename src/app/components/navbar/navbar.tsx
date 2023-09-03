import Image from 'next/image';
import styles from './navbar.module.css';
import {navLogo} from '@/images';
import SearchBar from '../searchbar/searchbar';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/api';
import LoggedIn from '../loggedIn/loggedIn';
import LoggedOut from '../loggedOut/loggedOut';

export default async function NavBar() {
    const user: User | null = await currentUser()

    return (
        <>
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
                    {!user ? <LoggedOut/> : <LoggedIn user={user}/>}
                </div>
            </div>
        </nav>
        </>

    )
}