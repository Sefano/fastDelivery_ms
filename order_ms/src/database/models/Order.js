import { model, Schema } from "mongoose";
import STATUS from "../../utils/status.js";

const OrderSchema = new Schema(
  {
    userId: { type: String, reqiried: true },
    products: [
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
    amount: { type: Number, reqiried: true },
    status: { type: String, required: true, default: STATUS.CREATED },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export default model("order", OrderSchema);
