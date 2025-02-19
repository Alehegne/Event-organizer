// import { generateComponents } from "@uploadthing/react";
// export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
//the above one is deprecated

import type { OurFileRouter } from "@/app/api/uploadthing/core";

import {generateReactHelpers} from "@uploadthing/react";


export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
