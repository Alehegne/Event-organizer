import CreateEventFom from "@/components/events/CreateEventFom";
import { getEventById } from "@/lib/actions/event.actions";
import { getUserByEmail } from "@/lib/actions/user.actions";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const UpdateEvents = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await getServerSession(authOptions);
  const eventId = (await params).id;

  const events = await getEventById(eventId);

  // console.log("events in the update page", events);

  // who is updating the events
  const user = await getUserByEmail(session?.user.email);
  const userId = user._id;

  return (
    <>
      <section className="wrapper bg-primary-100   bg-cover bg-center">
        <h2 className="wrapper text-center font-semibold text-xl ">
          Update Event
        </h2>
      </section>
      <CreateEventFom
        event={events}
        type="update"
        userId={userId}
        eventId={events._id}
      />
    </>
  );
};

export default UpdateEvents;
