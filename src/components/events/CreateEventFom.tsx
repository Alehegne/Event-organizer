"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { eventDefaultValues, EventFormSchema } from "@/lib/validator";
import DropDown from "../shared/DropDown";
import { FileUploader } from "../shared/uploader";
import { useState } from "react";
import Image from "next/image";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { useUploadThing } from "@/lib/uploadThing";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { useRouter } from "next/navigation";
import { IEvent } from "@/lib/mongoDb/database/model/event.model";

const EventForm = ({
  type,
  event,
  eventId,
}: {
  event?: IEvent;
  eventId?: string;
  type: "create" | "update";
  userId?: string;
}) => {
  const router = useRouter();

  //update the initial value for update form
  const intialValues =
    event && type === "update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;

  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("imageUploader");

  // 1. Define your form.
  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: intialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EventFormSchema>) {
    let uploadImageUrl = values.imageUrl;

    if (files.length > 0) {
      // console.log("uploading image");
      const uploadImage = await startUpload(files);

      if (!uploadImage) {
        // console.log("uploading unsuccessfull");

        return;
      }

      uploadImageUrl = uploadImage[0].url;
    }

    //create the events{ userId, event, path }
    if (type === "create") {
      try {
        const newEvents = await createEvent({
          event: { ...values, imageUrl: uploadImageUrl },
          path: "/profile",
        });

        if (newEvents) {
          form.reset();
          router.push(`/events/${newEvents._id}`);
        }
      } catch (error) {
        console.log("error in create", error);
      }
    }

    if (type === "update") {
      if (!eventId) {
        router.back();
        return;
      }
      try {
        const updatedEvents = await updateEvent({
          event: { ...values, imageUrl: uploadImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvents) {
          form.reset();
          router.push(`/events/${updatedEvents._id}`);
        }
      } catch (error) {
        console.log("error in create", error);
      }
    }
  }

  return (
    <section className="wrapper">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mb-10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Event Title"
                      {...field}
                      className="input-field"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <DropDown
                      onchangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea
                      placeholder="description"
                      {...field}
                      className="textarea rounded-2xl"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full border-dotted border-gray-200 border-4 rounded-md hover:border-gray-600 transition-all">
                  <FormControl className="h-72">
                    <FileUploader
                      onFieldChange={field.onChange}
                      setFiles={setFiles}
                      imageUrl={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                    />

                    <Input
                      placeholder="Event location or Online"
                      {...field}
                      className="input-field focus-visible:ring-0 shadow-none"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                      />
                      <p className="ml-2 text-[14px] opacity-85">Start Date</p>

                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        showTimeSelect
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                      />
                      <p className="ml-2 text-[14px] opacity-85">End Date</p>

                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        showTimeSelect
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex  md:flex-row gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image
                        src="/assets/icons/dollar.svg"
                        alt="dollar"
                        width={24}
                        height={24}
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        className="w-full hide-arrows focus-visible:ring-0 shadow-none border-none appearance-none outline-offset-0 outline-none bg-transparent text-[19px] ml-2 text-gray-800"
                      />
                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              {/* flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2 */}
                              <div className="flex items-center gap-2">
                                <label
                                  htmlFor="isFree"
                                  className="pr-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap leading-none"
                                >
                                  free ticket
                                </label>
                                <Checkbox
                                  id="isFree"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="h-5 w-5 border-2 peer"
                                />
                              </div>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                      <Image
                        src="/assets/icons/link.svg"
                        alt="url"
                        width={24}
                        height={24}
                      />

                      <Input
                        placeholder="URL"
                        {...field}
                        className="input-field focus-visible:ring-0 shadow-none"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-purple-800 hover:bg-purple-900 rounded-full active:scale-[1.01] transition-all"
          >
            {form.formState.isSubmitting ? "Submitting" : `${type} Event`}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default EventForm;

{
  /* <FormField
control={form.control}
name="description"
render={({ field }) => (
  <FormItem>
    {/* <FormLabel>Bio</FormLabel> */
}
//   <FormControl>
//     <Textarea
//       placeholder="description"
//       className="resize-none"
//       {...field}
//     />
//   </FormControl>

//   <FormMessage />
// </FormItem>
