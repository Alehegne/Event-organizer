import NotFound from "@/app/not-found";
import CheckOutButton from "@/components/shared/CheckOutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const event = await getEventById(id);

  //if there is no event
  if (!event) {
    return <NotFound />;
  }

  // const page = (await searchParams).page;

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: 1,
  });
  // console.log("related events", relatedEvents);
  return (
    <div className="bg-cyan-400 bg-dotted-pattern bg-contain">
      <section className="flex justify-center items-center bg-cyan-400 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            unoptimized={true}
            className="w-full min-h-[300px] h-full object-cover object-center rounded-md"
          />
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree ? "Free" : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-gray-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-purple-500">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>
            {/* checkout btn */}
            <CheckOutButton event={event} />

            <div className="flex flex-col gap:5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  height={32}
                  width={32}
                />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly}{" "}
                    {formatDateTime(event.startDateTime).timeOnly}-{" "}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly}{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">what you will learn:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-purple-500 underline">
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* related events with same category */}
      <section className="px-4 mt-10 bg-cyan-400 bg-dotted-pattern bg-contain">
        <div className="2xl:max-w-7xl md:px-10">
          <h1 className="text-4xl font-bold mb-4 ml-4">Related events</h1>
          <Collection
            data={relatedEvents?.data}
            emptyStateSubtext="No Related Events"
            emptyTitle=""
            page={1}
            limit={4}
          />
        </div>
      </section>
    </div>
  );
}
