"use client"
import Image from 'next/image';
import styles from './navbar.module.css';
import {navLogo, searchBarIcon} from '@/images';
import SearchBar from '../searchbar/searchbar';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import LoggedIn from '../loggedIn/loggedIn';
import LoggedOut from '../loggedOut/loggedOut';
import { useState } from 'react';

export default function NavBar() {
    const {isSignedIn , user} = useUser()
    const [overlay , setOverlay] = useState<boolean>(false)


    return (
        <>
         <SearchBar overlay={overlay} setOverlay={setOverlay}/>
        <nav id={styles.navbar}>
            <div id={styles.leftSide}>
                <Link href={"/"}>
                    <div className={styles.logoContainer}>
                    <div className={styles.logo}>
                        <Image src={navLogo} alt='logo' fill/>
                        </div>
                        <span className={styles.logoName}>Box Office</span>
                    </div>
                </Link>
            </div>
            <div id={styles.rightSide}>
                <div id={styles.searchBarIcon} onClick={() => setOverlay(true)}>
                    <Image src={searchBarIcon} alt='searchbar icon' fill />
                </div>
                {isSignedIn ? 
                    <div style={{display: "flex" , alignItems: "center"}}>
                        <span className={styles.login}>Login</span>
                        <button className={styles.signup}>Sign up</button>
                    </div> : 
                    ""
                    }
                </div>
            {/* <div className={styles.navContent}>
                <Link href={"/"}>
                <div className={styles.logoContainer}>
                    <span className={styles.logoName}>Box Office</span>
                    <Image src={navLogo} alt='logo' width={33} height={33}/>
                </div>
                </Link>
                <div id={styles.searchBarIcon}>

                </div>
                {/* <SearchBar/> */}  
                {/* <div className={styles.register}>
                    {!isSignedIn ? <LoggedOut/> : <LoggedIn user={String(user.username)} image={user.imageUrl}/>}
                </div>
            </div> */} 
        </nav>
        </>

    )
}