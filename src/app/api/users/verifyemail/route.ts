import { connect } from '@/dbconfig/dbconfig';
import User from    '@/models/user.models'
import {NextRequest,NextResponse} from 'next/server'


connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json();
        const {token}= reqBody;
        //vaalidate
        console.log(reqBody);

        const user=await User.findOne({verifyToken:token,
        verifyTokenExpiry:{$gt: Date.now()}});

        if(!user){
            return NextResponse.json({message:"user not found"}, {status:400});
        }
        console.log(user)
        user.isVerified=true;
        user.verifyTokenExpiry=undefined;
        user.verifyToken=undefined;

        await user.save();

        return NextResponse.json({message:"user verified successfully",success:true},{status:200});

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}