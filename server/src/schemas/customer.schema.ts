import { object, string, TypeOf } from "zod";

const customerPayload = {
  body: object({
    name: string({ required_error: "Customer name is required" }),
    contactNo: string({ required_error: "Customer contact no is required" }),
  }),
};

const params = {
  params: object({
    customerId: string({ required_error: "Customer id is required" }),
  }),
};

const createCustomerSchema = object({
  ...customerPayload,
});

const getCustomerSchema = object({
  ...params,
});

type CreateCustomerInput = TypeOf<typeof createCustomerSchema>;
type GetCustomerInput = TypeOf<typeof getCustomerSchema>;

export {
  createCustomerSchema,
  getCustomerSchema,
  CreateCustomerInput,
  GetCustomerInput,
};
