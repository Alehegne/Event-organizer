import { getUserByEmail } from "@/lib/actions/user.actions";
import { authOptions } from "@/lib/auth/authOptions";
import { IEvent } from "@/lib/mongoDb/database/model/event.model";
import { getServerSession } from "next-auth";
import React from "react";
import BuyButton from "./BuyButton";

const CheckOutButton = async ({ event }: { event: IEvent }) => {
  const hasEventClosed = new Date(event.endDateTime) < new Date();
  //get user id
  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;
  const user = await getUserByEmail(userEmail);
  const userId = user?._id;

  return (
    <div>
      {hasEventClosed ? (
        <p className="px-4 text-[20px] opacity-90 font-semibold text-red-600">
          sorry, Tickets are no longer Available
        </p>
      ) : (
        <BuyButton userId={userId} event={event} session={session} />
      )}
    </div>
  );
};

export default CheckOutButton;
