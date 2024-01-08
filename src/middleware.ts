import { NextRequest, NextResponse } from "next/server"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { fetchUser, getUserState } from "./store/userSlice"
import { useEffect } from "react"

export function middleware(req: NextRequest){
    const path = req.nextUrl.pathname
    const token = req.cookies.get('token')?.value || ''
    const isPublicPath = path == '/login' || path == '/signup'
    
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/feed', req.nextUrl))

    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
}
export const config = {
    matcher: [
        '/',
        '/profile',
        '/feed',    
        '/trends',
        '/login',
        '/signup'
    ]
  }