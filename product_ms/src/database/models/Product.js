import { model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "category" },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },

  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

ProductSchema.index({ category: 1 }).index(
  {
    name: "text",
    description: "text",
  },
  {
    default_language: "russian",
    language_override: "russian",
  }
);

export default model("product", ProductSchema);
