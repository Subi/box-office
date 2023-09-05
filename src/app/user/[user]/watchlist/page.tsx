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

interface UserPageProps {
    params: {user:string}
}


export default async function Page({params}:UserPageProps){
    const user: User | null = await currentUser()

    const isActive = (link:string) => {
        const headerList:ReadonlyHeaders = headers()
        const pathname = headerList.get("x-invoke-path")
        return pathname?.includes(link)
    }

    return (
        <>
             <div id={styles.main}>
            <section id={styles.bannerContainer}>
            <Image  style={{objectFit: "cover"  , objectPosition: "50% 20%"}}src={fightclub} alt='banner-background' fill quality={100}/>
                <div id={styles.bannerContent}>
                </div>
            </section>
            <div id={styles.contentContainer}>
                <div className={styles.userContent}>
                    <div className={styles.userImage}>
                        <Image src={String(user?.imageUrl)} fill alt='user image' style={{objectFit: "cover"}} quality={100}/>
                    </div>
                    <div className={styles.username}>
                        <span>negusdev</span>
                    </div>
                    <nav className={styles.navContainer}>
                        {navigationLinks.map(link => { 
                            return (
                                <Link href={link} className={isActive(link) ? `${styles.activeLink}` : ""}>{link}</Link>
                            )
                        })}
                </nav>
                </div>
                <Watchlist/>
            </div>
        </div>
        </>
   
    )
}