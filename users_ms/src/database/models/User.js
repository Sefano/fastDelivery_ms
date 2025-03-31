import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, reqiried: true, unique: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    salt: { type: String },
    address: [{ type: Schema.Types.ObjectId, ref: "address", require: true }],
    cart: [
      {
        product: {
          _id: { type: String, required: true },
          name: { type: String },
          image: { type: String },
          price: { type: Number },
        },
        unit: { type: Number, required: true },
      },
    ],
    orders: [
      {
        _id: { type: String, required: true },
        sum: { type: String },
        date: { type: Date, default: Date.now() },
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
