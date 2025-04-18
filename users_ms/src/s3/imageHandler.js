import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv/config";
import { s3Client } from "../index.js";

export const getImageUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: "fastdelivery",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 60 * 60 * 24,
  });
  return url;
};
