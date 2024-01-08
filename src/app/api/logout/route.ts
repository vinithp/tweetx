import { NextRequest, NextResponse} from 'next/server'

export async function GET(req: NextRequest){
    try {
        const response = NextResponse.json({message: 'successfully logged out'},{status: 200})
        response.cookies.set('token', '',{httpOnly: true})
        return response

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}