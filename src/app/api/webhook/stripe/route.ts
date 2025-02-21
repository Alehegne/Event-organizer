import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
})
export async function POST(request: Request) {
  console.log("checking  out the webhooks route in func...")
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err },{status:500})
  }
  

  // Get the ID and type
  const eventType = event.type
  console.log("event type",eventType)

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    }

    const newOrder = await createOrder(order)
    console.log("new order creaeted via a webhooks",newOrder)
    return NextResponse.json({ message: 'OK', order: newOrder },{status:200})
  }

  return new Response('', { status: 200 })
}