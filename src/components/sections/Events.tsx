import React from "react";
import CustomInput from "../customUi/input";
import Collection from "../shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";

async function Events() {
  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });

  // console.log("events", events?.data);
  // console.log("category");
  // console.log("total pages,", events?.totalPages);

  return (
    <section id="#events" className="my-8 py-4">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 ">
          <h1 className="text-2xl font-semibold text-center">
            Trust by, <br />
            Thousands of Events!
          </h1>
          <div className="px-2 md:px-4">
            <CustomInput type="email" placeholder="Search category filter!" />
          </div>
        </div>
      </div>
      <div>
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </div>
    </section>
  );
}

export default Events;
