import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, reqiried: true },
  description: { type: String, reqiried: true },
  products: [{ type: Schema.Types.ObjectId, ref: "product" }],
});

export default model("category", CategorySchema);
