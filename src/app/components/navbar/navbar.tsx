"use client"
import Image from 'next/image';
import styles from './navbar.module.css';
import {navLogo} from '@/images';
import SearchBar from '../searchbar/searchbar';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import LoggedIn from '../loggedIn/loggedIn';
import LoggedOut from '../loggedOut/loggedOut';

export default function NavBar() {
    const {isSignedIn , user} = useUser()
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
                    {!isSignedIn ? <LoggedOut/> : <LoggedIn user={String(user.username)} image={user.imageUrl}/>}
                </div>
            </div>
        </nav>
        </>

    )
}