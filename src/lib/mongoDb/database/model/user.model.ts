import { model, models, Schema } from "mongoose";


const UserSchema = new Schema({
    email:{type:String,unique:true},
    userName:{type:String,required: true,unique:true},
    firstName:{type:String,required:true,trim:true,
        validate:{
            validator:function(value:string){
                const nameRegex = /^[a-zA-Z]+$/;
                return nameRegex.test(value);

            },
            message:"firstName must be a valid name",


        }

    },
    password:{type:String,required:function(this):boolean{return this.provider === "credentials";},trim:true},
    lastName:{type:String,required:[true,"last name is required."],trim:true},
    Photo:{type:String,required:false},
    provider:{type:String,required:false,default:"credentials"},
},
{ 
    strict:false, //allow other fields to be added to the schema
}
)

const User = models.User || model("User",UserSchema);

export default User;
