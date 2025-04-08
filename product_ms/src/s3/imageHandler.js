import {
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import "dotenv/config";
import { s3Client } from "../index.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const uploadImage = async (name, buffer, type) => {
  console.log("Creating a object from string.");
  await s3Client.send(
    new PutObjectCommand({
      Bucket: "fastdelivery",
      Key: name,
      Body: buffer,
      ContentType: type,
    })
  );
};

export const downloadImage = async () => {};

export const uploadFile = async (name) => {
  console.log("Creating a object from string.");
  await s3Client.send(
    new PutObjectCommand({
      Bucket: "fastdelivery",
      Key: name,
      Body: "Its worked!",
    })
  );
};
