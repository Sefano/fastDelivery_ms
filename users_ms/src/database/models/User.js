import { model, Schema } from "mongoose";
import Address from "./Address.js";
import ROLES from "../../utils/roles.js";
const UserSchema = new Schema(
  {
    email: { type: String, reqiried: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    salt: { type: String },
    role: { type: String, default: ROLES.USER },
    address: [{ type: [Address.schema] }],
    cart: [
      {
        product: {
          id: { type: String, required: true },
          name: { type: String },
          image: { type: String },
          price: { type: Number },
        },
        unit: { type: Number },
      },
    ],
    cartAmount: { type: Number, default: 0 },
    orders: [
      {
        orderId: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: String, required: true },
        status: { type: String, required: true },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export default model("user", UserSchema);
