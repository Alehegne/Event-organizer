import { model, models, Schema } from "mongoose";


export interface IOrder{
    _id:string;
    createdAt:Date;
    stripeId:string;
    totalAmound:number;
    event:{_id:string,title:string};
    buyer:{_id:string,firstName:string,lastName:string};
}

export type IOrderItem = {
    _id:string;
    createdAt:Date;
    stripeId:string;
    totalAmound:number;
    event:{_id:string,title:string};
    buyer:{_id:string,firstName:string,lastName:string};
}

const OrderSchema = new Schema({

    createdAt:{
        type:Date,
        default:Date.now()
    },
    stripeId:{
        type:String,
        required:true,
        unique:true
    },
    totalAmound:{
        type:Number,
    },
    event:{
        type:Schema.Types.ObjectId,
        ref:"Event"
    },
    buyer:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

});

const Order = models.Order || model("Order",OrderSchema);

export default Order;
