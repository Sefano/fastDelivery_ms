export const productBody = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      category: { type: "string" },
      price: { type: "number" },
      image: { type: "string" },
    },
    required: ["name", "description", "category", "price", "image"],
  },
};

export const caregoryBody = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
    },
    required: ["name", "description"],
  },
};
