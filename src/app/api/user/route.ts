
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createUser } from "@/lib/actions/user.actions";
import { CreateUserParams } from "@/types";


export async  function  POST(req:Request){


    try{

        const {email,username,password,firstName,lastName,userName} = await req.json();


        const hashedPassword = await bcrypt.hash(password,10);

        // console.log("user data",email,userName,password,firstName,lastName);
        // const user = await User.create({
        //     email:email,
        //     userName:userName,
        //     password:hashedPassword,
        //     firstName:firstName,
        //     lastName:lastName

        // })
        const data:CreateUserParams = {
            email:email,
            userName:userName,
            password:hashedPassword,
            firstName:firstName,
            lastName:lastName,
            photo:"",
            provider:"credentials"

        }
        await createUser(data)
    //    console.log("user created",user)

        return NextResponse.json({email:email,username:username,firstName:firstName,lastName:lastName})

    }catch(e){
        // console.log("error in user route",e)

        return NextResponse.json({error:e})
    }
}