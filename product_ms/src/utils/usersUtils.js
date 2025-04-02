import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateSalt = async () => {
  return await bcryptjs.genSalt();
};

export const generatePassword = async (password, salt) => {
  return await bcryptjs.hash(password, salt);
};

export const generateToken = async (payload) => {
  try {
    return await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "14d",
    });
  } catch (error) {
    console.log(error);
  }
};

export const validateSignature = async (token) => {
  try {
    console.log(token);
    const payload = await jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );
    return payload;
  } catch (error) {
    console.log(error);
  }
};

export const validatePassword = async (password, dbPassword, salt) => {
  const passToCompare = await generatePassword(password, salt);
  return passToCompare === dbPassword;
};
