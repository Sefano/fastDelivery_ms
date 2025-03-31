import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateSalt = async () => {
  return await bcryptjs.genSalt();
};
