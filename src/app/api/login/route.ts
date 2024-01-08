import { connect } from '@/dbConfig/dbConfig'
import User from '@/module/userModule'
import { NextRequest, NextResponse} from 'next/server'
import jws from 'jsonwebtoken'
// import {NextApiRequest, NextApiResponse} from 'next'

connect()
export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {userName, password} = reqBody
        console.log(reqBody)
        if(!userName && !password){
            return NextResponse.json({error:'provide all necessary data'},{status: 400})
        }
        const user:{_id: String, userName: string, phoneNumber: String, email: String} | null = await User.findOne({userName,password},{userName:1, phoneNumber:1, email:1})
        if(!user){
            return NextResponse.json({error:"username/password not found"},{status: 400})
        }
        const tokenData = {
            _id: user._id,
            userName: user.userName,
            email: user.email
        }
        const token = await jws.sign(tokenData,process.env.TOKEN_SECRET!, {expiresIn: "1d"}) 
        const response = NextResponse.json({data:user ,message:'logged in successfully'},{status: 200})
        response.cookies.set('token', token,{httpOnly:true})
        return response

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}