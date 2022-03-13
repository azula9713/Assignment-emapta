import { object, string, TypeOf } from "zod";

const productTypePayload = {
  body: object({
    name: string({ required_error: "Product type name is required" }),
  }),
};

const params = {
  params: object({
    productTypeId: string({ required_error: "Product type id is required" }),
  }),
};

const createProductTypeSchema = object({
  ...productTypePayload,
});

const getProductTypeSchema = object({
  ...params,
});

type CreateProductTypeInput = TypeOf<typeof createProductTypeSchema>;
type GetProductTypeInput = TypeOf<typeof getProductTypeSchema>;

export {
  createProductTypeSchema,
  getProductTypeSchema,
  CreateProductTypeInput,
  GetProductTypeInput,
};
