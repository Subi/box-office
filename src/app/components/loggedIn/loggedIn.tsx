"use client"
import Image from "next/image"
import { downArrow , plusIcon} from "@/images"
import styles from './loggedIn.module.css'
import {useClerk} from '@clerk/clerk-react'
import {WithUserProp} from '@clerk/clerk-react'



interface LoggedInProps {
    image: string
}

export default function LoggedIn({image}:LoggedInProps){
    console.log("here")
    const {signOut} = useClerk()
    return (
        <div style={{display: "flex" , alignItems: "center" , width: "100%" , justifyContent: "right"}}>
            <div style={{display: "flex"}}>
            <div className={styles.createListButton}>
                <span style={{margin: ".1em .6em 0 0"}}>List</span>
                <Image src={plusIcon} alt="plus_icon" height={16} width={16}/>
            </div>
            </div>
            <div className={styles.userAvatar}>
            <Image 
            src={image} 
            alt={"user image"} 
            height={38} 
            width={38}
            style={{ margin: '0 .8em .2em 2em' , borderRadius: '2em' }}
            />
            <Image src={downArrow} alt="down arrow" height={10} width={10}/>
            <div className={styles.userDropdownContainer}>
                <div className={styles.dropdownUserContent}>
                    <a>Profile</a>
                    <a>Watchlist</a>
                    <a>Settings</a>
                    <a onClick={() => signOut()}>Log out</a>
                </div>
            </div>
            </div>
        </div>
    )    
}