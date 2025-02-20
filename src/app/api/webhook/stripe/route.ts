import { NextApiRequest } from "next";
import stripe from "stripe";
import { NextResponse } from "next/server";
import { CreateOrderParams } from "@/types";
import { createOrder } from "@/lib/actions/order";

export async function POST(request:Request){

    try{

    const body = await request.text();

    const signature = request.headers.get('Stripe-Signature') as string;
    const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;

    try{
        event = stripe.webhooks.constructEvent(body,signature,endPointSecret);

    }catch(error:unknown){
        if(error instanceof Error){
            console.error("webhook error",error);
            return NextResponse.json({error:`Webhook error ${error.message}`})
        }
        console.log("unknown error",error);
        return NextResponse.json({error:"Unknown error"})
    }

    //get the id and type of the event
    const eventType = event.type;

     //create
     if(eventType === 'checkout.session.completed'){

        const {id,amount_total,metadata} = event.data.object;

        const order = {
            stripeId:id,
            eventId:metadata?.eventId || '',
            buyerId:metadata?.buyerId || '',
            totalAmount:amount_total ? (amount_total/100).toString() : '0',
            createdAt:new Date(),
        }

        const newOrder = await createOrder(order)
        
        return NextResponse.json({message:'0k',order:newOrder})


     }
     //payment failed
     if(eventType === 'checkout.session.async_payment_failed'){
     }

    

      return NextResponse.json({received:true})

    }catch(error){
        console.error("event webhook error",error);
    }




    
}