import { S3Client } from "@aws-sdk/client-s3";

export const spacesClient = new S3Client({
  endpoint: process.env.DO_SPACE_ENDPOINT,
  region: process.env.DO_SPACE_REGION,
  credentials: {
    accessKeyId: process.env.DO_SPACE_KEY!,
    secretAccessKey: process.env.DO_SPACE_SECRET!,
  },
});