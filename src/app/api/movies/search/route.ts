import { NextRequest , NextResponse } from "next/server";
import {searchUrl} from '@/constants'
import { createOpts } from "@/constants";

export async function GET(req:NextRequest , res:NextResponse ) {
    const {searchParams} = new URL(req.url);
    const title: string | null =  searchParams.get('title')
    
    const response = await fetch(`${searchUrl}?query=${title}` , createOpts("get"))
    const {results} = await response.json()

    console.log(results)
}

