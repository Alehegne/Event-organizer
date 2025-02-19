import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getUserByEmail } from "@/lib/actions/user.actions";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  //get the user id from the session
  const session = await getServerSession(authOptions);
  const email = session?.user.email;
  const user = await getUserByEmail(email);
  let userId;
  if (user) userId = user._id;
  //get the events with this user id
  const eventsOrganized = await getEventsByUser({ userId: userId, page: 1 });

  return (
    <div className="bg-dotted-pattern">
      {/* current user tickets */}
      <section className="py-5 bg-cover bg-center">
        <div className="wrapper flex justify-center items-center sm:justify-between">
          <h3 className="text-3xl font-bold bg-gradient-to-b from-black to-gray-900 bg-clip-text text-transparent">
            My Tickets
          </h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>
      {/* <section className="wrapper my-8">
    <Collection
          data={events?.data}
          emptyTitle="No Event Tickets Purchased"
          emptyStateSubtext="Explore the Events"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          totalPages={2}
        />
    </section> */}
      {/* Events created by the user */}
      <section className="bg-cover bg-center pl-4">
        <div className="wrapper p-4 flex justify-center items-center sm:justify-between">
          <h3 className="text-3xl font-bold bg-gradient-to-b from-black to-gray-900 bg-clip-text text-transparent">
            Events Created
          </h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/events/create">Create New Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper pt-4">
        <Collection
          data={eventsOrganized?.data}
          emptyTitle="No Event have been created"
          emptyStateSubtext="Go create Some Now"
          collectionType="Events_Organized"
          limit={3}
          page={1}
          totalPages={2}
        />
      </section>
    </div>
  );
};

export default ProfilePage;
