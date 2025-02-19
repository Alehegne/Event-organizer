"use client";
import { IEvent } from "@/lib/mongoDb/database/model/event.model";
import { Session } from "next-auth";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import CheckOut from "./CheckOut";
import { toast } from "@/hooks/use-toast";

type types = {
  userId: string;
  event: IEvent;
  session: Session | null;
};

const BuyButton = ({ userId, event, session }: types) => {
  return (
    <div>
      {!session ? (
        <Button
          onClick={() => {
            signIn();
          }}
          className="bg-purple-600 hover:bg-purple-700 p-3"
        >
          Get Tickets
        </Button>
      ) : (
        <CheckOut userId={userId} event={event} />
      )}
    </div>
  );
};

export default BuyButton;
