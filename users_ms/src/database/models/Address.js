import { model, Schema } from "mongoose";

const AddressSchema = new Schema({
  street: { type: String, reqiried: true, unique: true },
  city: { type: String, reqiried: true, unique: true },
  house: { type: String, reqiried: true, unique: true },
  apartments: { type: String, reqiried: true, unique: true },
});

export default model("address", AddressSchema);
