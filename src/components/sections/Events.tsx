import React from "react";
import CustomInput from "../customUi/input";
import Collection from "../shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import WhileInView from "../motion/whileinView";

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
        <WhileInView>
          <div className="flex flex-col gap-8 w-full p-4 items-center xl:px-12">
            <h1 className="text-2xl font-semibold text-center">
              Trust by, <br />
              Thousands of Events!
            </h1>
            <div className="w-full flex justify-start">
              <CustomInput type="email" placeholder="Search category filter!" />
            </div>
          </div>
        </WhileInView>
      </div>
      <WhileInView>
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
      </WhileInView>
    </section>
  );
}

export default Events;
