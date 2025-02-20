"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteEvent } from "@/lib/actions/event.actions";

const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
  console.log("starting to delete", eventId);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-gray-300 hover:bg-gray-400 mt-1 w-full p-2 rounded-lg text-start">
        <Trash2 className="hover:scale-105 transition-all" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you wanna delete the Event
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
          <AlertDialogAction
            className="w-full bg-purple-800"
            onClick={() => deleteEvent({ eventId: eventId, path: "/" })}
          >
            Delete
          </AlertDialogAction>

          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
