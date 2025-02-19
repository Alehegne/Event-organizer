import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/app/api/uploadthing/core";

// console.log("UPLOADTHING_SECRET:", process.env.UPLOADTHING_SECRET);
// console.log("UPLOADTHING_APP_ID:", process.env.UPLOADTHING_APP_ID);

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
