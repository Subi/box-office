"use client"
import styles from './sidebar.module.css'
import { list } from './list'
import { MutableRefObject, useEffect, useRef, useState } from 'react'

interface SidebarProps {
    userLists: list[]
    setSelectedList(value:list):void
    setCreateList(value:boolean):void
}

export default function Sidebar({userLists , setSelectedList , setCreateList}:SidebarProps){
    const [currentIndex , setCurrentIndex] = useState<number | null>(0)

    return (
        <div id={styles.listSidebar}>
            <div onClick={() => setCreateList(true)} className={styles.createList}>Create a List</div>
            <div id={styles.listContainer}>
                <header id={styles.header}>Lists</header>
                {userLists.map((list , index) => {
                    return (
                        <div className={currentIndex === index ? `${styles.list} ${styles.active}` : styles.list   } key={list.id} onClick={() => {setSelectedList(list) , setCreateList(false) ,  setCurrentIndex(index)}}>
                            {list.title}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}