"use client"
import Image from "next/image"
import { downArrow , plusIcon} from "@/images"
import styles from './loggedIn.module.css'
import {useClerk} from '@clerk/clerk-react'
import Link from "next/link"
import { User } from "@clerk/nextjs/server"

interface LoggedInProps {
    username:string | undefined | null
    imageUrl:string | undefined
}

export default function LoggedIn({username , imageUrl}:LoggedInProps){
    const {signOut} = useClerk()
    return (
        <div style={{display: "flex" , alignContent: "center"}}>
            <span style={{textTransform: "capitalize" , padding: ".35em 1em 0 0 "}}>{username}</span>
            <Image style={{objectFit: "contain" , borderRadius: "50%"}}src={String(imageUrl)} alt="user image" width={35} height={35}/>
        </div>
    )    
}