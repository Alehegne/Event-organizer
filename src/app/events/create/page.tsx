import CreateEventFom from "@/components/events/CreateEventFom";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const CreateEvents = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    <div>log in to create an event</div>;
  }

  return (
    <>
      <section className="wrapper bg-primary-100   bg-cover bg-center">
        <h2 className="wrapper text-center font-semibold text-xl ">
          Create Event
        </h2>
      </section>
      <CreateEventFom type="create" />
    </>
  );
};

export default CreateEvents;
