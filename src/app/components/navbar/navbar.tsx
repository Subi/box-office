"use client"
import Image from 'next/image';
import styles from './navbar.module.css';
import {navLogo, searchBarIcon} from '@/images';
import SearchBar from '../searchbar/searchbar';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import LoggedIn from '../loggedIn/loggedIn';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';



export default function NavBar() {
    const {isSignedIn , user} = useUser()
    const [overlay , setOverlay] = useState<boolean>(false)


    return (
        <>
         {<SearchBar overlay={overlay} setOverlay={setOverlay}/>}
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
                <div id={styles.searchBarIcon} onClick={() => {setOverlay(true)}}>
                    <Image src={searchBarIcon} alt='searchbar icon' fill />
                </div>
                {isSignedIn  ? <LoggedIn imageUrl={user.imageUrl} username={user.username}/> : <div style={{display: "flex" , alignItems: "center"}}>
                        <Link href={"/sign-in"}><span className={styles.login}>Login</span></Link>
                        <button className={styles.signup}>Sign up</button>
                    </div> 
                    }
                </div>
        </nav>
        </>

    )
}