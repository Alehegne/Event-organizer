import mongoose from "mongoose";


const mongo_uri = process.env.DB_URL



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached =(global as any).mongoose || {conn:null,promise:null}

export const connnectToDatabase = async()=>{

    if(cached.conn) return cached.connect;

    if(!mongo_uri){
        throw new Error("please define the Mongo_uri env varaible in .env.local")
    }
     
    cached.promise = cached.promise || mongoose.connect(mongo_uri ,{
        dbName:"evently",
        bufferCommands:false,
    })

    cached.conn = await cached.promise;

    return cached.conn;

    
}

