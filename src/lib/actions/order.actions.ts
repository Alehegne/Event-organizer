"use server"

import { CheckoutOrderParams, CreateOrderParams } from "@/types"
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { connnectToDatabase } from "../mongoDb/database";
import Order from "../mongoDb/database/model/order.model";
import { handleError } from "../utils";


export const checkoutOrder = async(order:CheckoutOrderParams)=>{
    console.log("checking out in func...")
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    console.log("stripe in func",stripe)
    try {
        const price = order.isFree ? 0 :Number(order.price) * 100
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        submit_type:"pay",
        payment_method_types:["card","paypal","amazon_pay","alipay"],
        line_items: [
          {
            price_data:{
                currency:'usd',
                unit_amount:price,
                product_data:{
                    name:order.eventTitle,
                },
            },
            quantity: 1
          },
        ],
        metadata:{
             eventId:order.eventId,
             buyerId:order.buyerId
            //  If you want to store custom data with the payment session, use metadata:
        },
        mode: 'payment',
        shipping_address_collection:{
            allowed_countries:["US", "CA", "GB"]
        },
       
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        billing_address_collection:"required",
        custom_text:{
            shipping_address:{
                message:"please note there may be some clustered events"
            },
            submit: {
                message: 'We\'ll email you instructions on how to get your Events setted successyfully.',
              },
              after_submit: {
                message: 'Learn more about your email on our Evently website.',
              },
        }
      });
      redirect(session.url!)
        
    }catch (error) {
         throw error
    }


}



export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connnectToDatabase();
    
    console.log("creating order in db", order);
    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    console.log("new order created in the db", newOrder);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}