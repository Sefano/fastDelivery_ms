import { model, Schema } from "mongoose";

const AddressSchema = new Schema({
  street: { type: String, reqiried: true },
  city: { type: String, reqiried: true },
  house: { type: String, reqiried: true },
  apartments: { type: String, reqiried: true },
});

export default model("address", AddressSchema);
