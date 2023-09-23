"use client"
import Sidebar from "./sidebar"
import ListForm from "./ListForm"
import { Entry } from "@/app/[user]/watchlist/page"
import { useState } from "react"
import { List } from "@prisma/client"
import ListEntries from "./listEntries"
import styles from './list.module.css';
import { create } from "domain"

export type list =  {
    title:string
    description:string
    entries: Entry[]
    id:string
}

export interface ListProps {
    userLists: list[] 
}


export default function List({userLists}:ListProps){
    const [lists , setLists] = useState<list[]>(userLists)
    const [selectedList , setSelectedList] = useState<list>(userLists[0])
    const [createList , setCreateList] = useState<boolean>(false)

    return (
    <div id={styles.listWrapper}>
        <Sidebar userLists={lists} setSelectedList={setSelectedList} setCreateList={setCreateList}/>
        {createList ? <ListForm username={"subi"}/> : <ListEntries entries={selectedList.entries}/>   }
    </div>
    )
}