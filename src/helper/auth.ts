import jws from 'jsonwebtoken'
import { NextResponse,NextRequest } from "next/server";

const secretToken = process.env.TOKEN_SECRET!

export const auth = (req: NextRequest) =>{
    try {
        const token = req.cookies.get('token')?.value || ''
        if(!token){
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }
        const tokenData: any = jws.verify(token, secretToken)
        return tokenData
    } catch (error) {
        console.log(error)
    }
}

