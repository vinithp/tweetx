import { connect } from '@/dbConfig/dbConfig'
import { auth } from '@/helper/auth'
import User from '@/module/userModule'
import { JwtPayload } from 'jsonwebtoken'
import { NextRequest, NextResponse} from 'next/server'
import jws from 'jsonwebtoken'

connect()
export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {userName, email, phoneNumber, password} = reqBody
        if(!userName && !email && !phoneNumber && !password){
            return NextResponse.json({error:'provide all necessary data'},{status: 400})
        }
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"user already exist"},{status: 400})
        }
        const newUser = new User({
            userName,
            email,
            phoneNumber,
            password
        })
        await newUser.save()

        return NextResponse.json({message:'user created successfully'},{status: 201})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}

export async function PATCH(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {userName, email, phoneNumber} = reqBody
        if(!userName && !email && !phoneNumber){
            return NextResponse.json({error:'provide all necessary data'},{status: 400})
        }
        const user = await User.findOneAndUpdate({userName},{email,phoneNumber},{
            new: true,
          })
        if(!user){
            return NextResponse.json({error:"user not exist"},{status: 400})
        }

        return NextResponse.json({data:user, message:'user updated successfully'},{status: 200})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}

export async function GET(req: NextRequest){
    try {
        const userByToken: any = auth(req)
        const user = await User.findOne({userName: userByToken?.userName})

        return NextResponse.json({data:user},{status: 200})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}