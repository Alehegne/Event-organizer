import { model, models, Schema } from "mongoose";


export interface IOrganizer{
    _id:string;
    userName:string;
    photo?:string;
}


const OrganizerShema = new Schema({
    userName:{type:String,required:true,unique:true},
    photo:{type:String,required:false},
    

}
);

const Organizer = models.Organizer || model("Organizer",OrganizerShema);

export default Organizer;