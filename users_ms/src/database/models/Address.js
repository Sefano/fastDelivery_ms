import { model, Schema } from "mongoose";

const AddressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  house: { type: String },
  apartments: { type: String },
});

export default model("address", AddressSchema);
