import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


// console.log("UPLOADTHING_SECRET:", process.env.UPLOADTHING_SECRET);
// console.log("UPLOADTHING_APP_ID:", process.env.UPLOADTHING_APP_ID);


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({  }) => {
       const session = await getServerSession(authOptions);
      //  console.log("session in the upload middleware",session)

      //  console.log("checking the eligibility to upload")

      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError("Unauthorized: You must be logged in to upload");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.userId);

      // console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId,fileUrl:file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
