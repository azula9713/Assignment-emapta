import { object, string, TypeOf } from "zod";

const productPayload = {
  body: object({
    productType: string({ required_error: "Product type is required" }),
    customer: string({ required_error: "Customer is required" }),
    deliveryStatus: string({
      required_error: "Delivery status is required",
    }),
    deliveryAddress: string({ required_error: "Delivery address is required" }),
    estimatedDeliveryDate: string({
      required_error: "Estimated delivery date is required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({ required_error: "Product id is required" }),
  }),
};

const createProductSchema = object({
  ...productPayload,
});

const updateProductSchema = object({
  ...productPayload,
  ...params,
});

const getProductSchema = object({
  ...params,
});

type CreateProductInput = TypeOf<typeof createProductSchema>;
type UpdateProductInput = TypeOf<typeof updateProductSchema>;
type GetProductInput = TypeOf<typeof getProductSchema>;

export {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  CreateProductInput,
  UpdateProductInput,
  GetProductInput,
};
