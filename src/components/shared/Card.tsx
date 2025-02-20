import { getUserByEmail } from "@/lib/actions/user.actions";
import { authOptions } from "@/lib/auth/authOptions";
import { IEvent } from "@/lib/mongoDb/database/model/event.model";
import { formatDateTime } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteConfirmation from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;

  const user = await getUserByEmail(userEmail);
  const userId = user?._id;

  const isEventCreater = userId === event.organizer?._id.toString();

  // console.log("organizer Details", event.organizer);
  // console.log("isEventCreator", isEventCreater);

  return (
    <div className="w-full min-h-[380px] group relative max-w-[400px] overflow-hidden flex-col rounded-lg bg-white shadow-mg hover:shadow-lg transition-all md:min-h-[430px]">
      <Link
        href={`/events/${event._id}`}
        style={{
          backgroundImage: `url(${event.imageUrl})`,
        }}
        className="bg-center bg-cover flex justify-center  w-full h-1/2  flex-grow "
      />
      {/* is event creators */}
      {isEventCreater && !hidePrice && (
        <div className="absolute flex flex-col top-2  transition-all text-black right-2  rounded-lg">
          <Link href={`/events/${event._id}/update`} className="relative group">
            <SquarePen className="mb-1  bg-gray-200 hover:scale-105  p-2 w-[40px] h-[40px] rounded-md" />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-3 md:gap-4">
        {!hidePrice && (
          <div>
            <Link href={`/events/${event._id}`} className="flex gap-2">
              <span className="px-4 py-1 text-green-950 bg-green-100 w-min rounded-2xl text-[15px] md:text-[18px] font-semibold">
                {event.isFree ? "Free" : `$${event.price}`}
              </span>
              <p className="bg-gray-100 rounded-full px-4 py-1 w-min line-clamp-1 font-semibold text-[12px] md:text-[18px] opacity-80 text-nowrap">
                {event.category.name}
              </p>
            </Link>
          </div>
        )}

        <p className="px-4 text-[12px] opacity-95 md:text-[16px]">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className="px-4 text-[18px] md:text-[22px]  line-clamp-2 text-black flex-1">
          {event.title}
        </p>
        <div className="flex-between w-full pb-2 px-4">
          <p className="p-medium-14 md:p-medium-16">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId:${event._id}`} className="flex gap-2">
              <p className="text-purple-600">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
