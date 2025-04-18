import { model, Schema } from "mongoose";

const CartSchema = new Schema(
  {
    userId: { type: String, required: true },
    cart: [
      {
        product: {
          id: { type: String },
          name: { type: String },
          image: { type: String },
          price: { type: Number },
          imgUrl: { type: String },
          urlExpiresIn: { type: Number },
        },
        unit: { type: Number },
      },
    ],
    cartAmount: { type: Number, default: 0 },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export default model("cart", CartSchema);
