import { IEvent } from "@/lib/mongoDb/database/model/event.model";
import React from "react";
import Card from "./Card";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number | string;
  limit: number;
  totalPages?: number;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
  urlParamName?: string;
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  console.log("page", page);
  console.log("totalPages", totalPages);
  console.log("urlParamName", urlParamName);

  return (
    <div className="container mx-auto p-4">
      {data && data.length > 0 ? (
        <div className="flex flex-col gap-5 items-center">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 ">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className="flex justify-center">
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className=" w-full  flex justify-center min-h-[200px] items-center mt-4 rounded-lg  flex-col gap-4">
          <h3 className="text-[20px] md:text-[30px] font-bold ">
            {emptyTitle}
          </h3>
          <p className="text-[16px] md:text-[20px] opacity-80">
            {emptyStateSubtext}
          </p>
        </div>
      )}
    </div>
  );
};

export default Collection;
