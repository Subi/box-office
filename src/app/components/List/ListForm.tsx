"use client"
import styles from './listform.module.css';
import Image from 'next/image';
import { searchBarIcon } from '@/images';
import { FormEvent, useEffect, useState } from 'react';
import { MovieData } from '@/types';
import useDebounce from '@/app/hooks/useDebounce';
import ListEntries from './listEntries';
import { Entry } from '@/app/[user]/watchlist/page';

interface ListFormProps {
    username: string | null
}

export default function ListForm({username}:ListFormProps){

    const [input , setInput] = useState<string>("")
    const [searchResults , setSearchResults] = useState<MovieData[]>([])
    const [entries , setEntries] = useState<Entry[]>([])
    const [name , setName] = useState<string>("")
    const [description , setDescription] = useState<string>("")
    const debouncedSearch:string | undefined = useDebounce(input , 400)

    const search =  async (title:string) => {
        const response = await fetch(`/api/movies/search?title=${title}`)
        const {searchedResults} = await response.json()
        setSearchResults(searchedResults)
    }

    const addEntry = (result:MovieData) => {
        if(entries.find(e => e.name === result.title)) return
        const newEntry:Entry = createEntry(result)
        setEntries([...entries , newEntry])
    }

    const createEntry = (result:MovieData):Entry => {
        return {
            name: result.title,
            poster_image: result.poster_path,
            id: result.id
        }
    }  

    const addList = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)
        formData.append('entries' , JSON.stringify(entries))
        const response = await fetch('/api/lists' , {
            method: "POST",
            body: formData
        })
        if(!response.ok) {
            throw new Error("Failed to submit data")
        }
        resetValues()
    }

    const resetValues = () => {
        setName("")
        setDescription("")
        setEntries([])
        setInput("")
    }


    useEffect(() => {
      if(!debouncedSearch) return
      search(debouncedSearch)
    },[debouncedSearch])

    
    useEffect(() => {}, [searchResults])

    useEffect(() => {} , [entries])

    console.log(entries)


    return (
        <div style={{display: "flex" , flexDirection: "column",  width: "80%"}}>
        <header id={styles.header}>New List</header>
            <div id={styles.listForm}>
            <div id={styles.listFormContainer}>
                <form onSubmit={addList}>
                    <fieldset style={{border: 0}}>
                        <div className={styles.fieldRow}>
                            <label className={styles.label} ><span>Name</span></label>
                            <input type='text' name='name' value={name} className={styles.listFormInput} onChange={(e) => {setName(e.target.value)}} />
                        </div>
                        <div className={styles.fieldRow}>
                            <label className={styles.label} ><span>Description</span></label>
                            <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} style={{width: "75%" , resize: "none"}} placeholder='tell us something...'  name='description' className={styles.listFormInput} rows={4} cols={40}/>
                        </div>
                    </fieldset>
                        <input style={{marginTop: "2em"}} type="submit" value="Create List" className={styles.listFormSubmit}/>
                </form>
            </div>
            <div id={styles.searchContainer}>
                <div id={styles.searchBarContainer}>
                <span className={styles.searchBarIcon}>
                    <Image src={searchBarIcon} alt='search_icon' height={14} width={14}/>
                </span>
                <input  className={styles.searchBar} type='text' value={input} placeholder='Search for a movie' onChange={(e) => setInput(e.target.value)}/>
                <div className={styles.searchDropdown}>
                    {searchResults.length > 0 ? searchResults.map(result => {
                        return (
                            <div className={styles.resultItem} onClick={() => {addEntry(result)}}>
                                <div className={styles.resultCover}>
                                    <Image
                                    src={`https://www.themoviedb.org/t/p/original/${result.poster_path}`} 
                                    alt={result.title}
                                    fill
                                    style={{objectFit: "contain"}}
                                    />
                                </div>
                                <span className={styles.title}>
                                    {result.title}
                                </span>
                            </div>
                        )
                    }) : ""}
                </div>
            </div>
            </div>
            </div>
                <ListEntries entries={entries}/>
        </div>
    )
}