import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import { fightclub } from '@/images';
import {headers} from 'next/headers'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { navigationLinks } from '@/constants';
import Watchlist from '@/app/components/watchlist/watchlist';
import { prisma } from '@/lib/prisma';
import path from 'path';


interface UserPageProps {
    params: {user:string}
}


export type Entry = {
    name:string 
    poster_image:string
    id:number
    listId: string | null
}


async function getWatchlist(username:string):Promise<Entry[] | undefined> {
    const data = await prisma.user.findFirst({
        where: { username: username},
        include: {lists: {include:{entries:true}}}
    })

    return data?.lists[0].entries

}

export default async function Page({params}:UserPageProps){
    const user: User | null = await currentUser()
    const watchlist:Entry[] | undefined   = await getWatchlist(params.user)
    

    const isActive = (link:string) => {
        const headerList:ReadonlyHeaders = headers()
        const pathname = headerList.get("x-invoke-path")?.split("/")[3]
        return pathname === link
    }

    return (
        <>
        <div id={styles.main}>
            <section id={styles.bannerContainer}>
            <div className={styles.bannerMask}></div>
            <div className={styles.banner} style={{backgroundImage: `url("https://s4.anilist.co/file/anilistcdn/user/banner/b548220-MZSu6uLRlpfh.jpg")`}}  ></div>
                <div id={styles.bannerContent}>
                    <div className={styles.userImage}>
                        <Image src={String(user?.imageUrl)} fill alt='user image' style={{objectFit: "cover"}} quality={100}/>
                    </div>
                    <div className={styles.username}>
                        <span>{params.user}</span>
                    </div>
                </div>
            </section>
            <div id={styles.contentContainer}>
                <div className={styles.userContent}>
                    <nav className={styles.navContainer}>
                        <div className={styles.navbarLinks}>
                        {navigationLinks.map((link , index)=> { 
                            return (
                                <div key={index}>
                                    <Link href={link} key={index} className={isActive(link) ? `${styles.activeLink}` : ""}>{link}</Link>
                                </div>
                               
                            )
                        })}
                        </div>
                 
                </nav>
                </div>
                <Watchlist watchlist={watchlist}/>
            </div>
        </div>
        </>
   
    )
}