"use client";
import { IEvent } from "@/lib/mongoDb/database/model/event.model";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
/*, call loadStripe from @stripe/stripe-js with your publishable key. The loadStripe function asynchronously loads the Stripe.js script and initializes a Stripe object. Pass the returned Promise to Elements. */

const CheckOut = ({ userId, event }: { userId: string; event: IEvent }) => {
  //stripe response status
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    console.log("query", query);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckOut = async () => {
    console.log("checking out ...");
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      isFree: event.isFree,
      price: event.price,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <div>
      <form action={onCheckOut}>
        <Button
          role="link"
          type="submit"
          size="lg"
          className="button hover:scale-[1.01] active:scale-105 transition-all bg-purple-600 sm:w-fit hover:bg-purple-700"
        >
          {event.isFree ? "Get Ticket for free" : "Buy The Tickets"}
        </Button>
      </form>
    </div>
  );
};

export default CheckOut;
