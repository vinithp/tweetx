import { NextRequest, NextResponse} from 'next/server'

export async function GET(req: NextRequest){
    try {
        const response = NextResponse.json({message: `successfully logged out`, value:Math.random()},{status: 200})
        response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate')
        response.cookies.set('token', '',{httpOnly: true})
        return response

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error:error.message},{status: 500})
    }
}