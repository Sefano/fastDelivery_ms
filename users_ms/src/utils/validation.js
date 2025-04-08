export const addressBody = {
  body: {
    type: "object",
    properties: {
      street: { type: "string" },
      city: { type: "string" },
      house: { type: "string" },
      apartments: { type: "string" },
    },
    required: ["street", "city", "house", "apartments"],
  },
};

export const userUpBody = {
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string", minLength: 8 },
      name: { type: "string", minLength: 1 },
      role: { type: "string" },
    },
    required: ["email", "password", "name"],
  },
};

export const userInBody = {
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string", minLength: 8 },
    },
    required: ["email", "password"],
  },
};
