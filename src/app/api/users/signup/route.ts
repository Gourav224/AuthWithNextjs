import { connect } from '@/dbconfig/dbconfig';
import User from    '@/models/user.models'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import {  sendmail } from '@/helpers/mailer'


connect()
export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json();
        const {username,email,password}= reqBody;
        //vaalidate
        // console.log(reqBody);
        
        const user = await User.findOne({email})
        // console.log(user);
        if(user){
            return NextResponse.json({error:"User already exists"},
                {status:400});
        }
        const salt =await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);
        const newUser= new User({
            username,
            email,
            password:hashedPassword
        });
        const savedUser=await newUser.save();
        
        
        //send verification mail

        await sendmail({email, emailType:'VERIFY',userId:savedUser._id});

        return NextResponse.json({message:"User created successfully",
            success:true,
            savedUser
        },
        {status:201});

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}