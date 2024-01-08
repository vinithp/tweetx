import { connect } from '@/dbConfig/dbConfig'
import { auth } from '@/helper/auth'
import Feed from '@/module/feedsModule'
import { NextRequest, NextResponse} from 'next/server'
import jws from 'jsonwebtoken'


connect()
export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {userName,post} = reqBody
        if(!post){
            return NextResponse.json({error:'provide all necessary data'},{status: 400})
        }
        const newFeed = new Feed({
            userName,
            post,
            date: new Date().toISOString().slice(0, 10)
        })

        await newFeed.save()

        return NextResponse.json({message:'post created successfully'},{status: 201})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}

export async function GET(req: NextRequest){
    try {
        const userByToken: any = auth(req)
        const feed = await Feed.find({userName: userByToken.userName},{userName:1, post:1, date:1})

        return NextResponse.json({data:feed},{status: 200})

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}