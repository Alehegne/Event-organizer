import { models,Document,Schema,model } from "mongoose";

export interface ICategory extends Document{
    _id:string;
    name:string;
}

const CategorySchema = new Schema({
    name:{type:String,required:false,unique:false},
})

const Category = models.Category || model("Category",CategorySchema);

export default Category;