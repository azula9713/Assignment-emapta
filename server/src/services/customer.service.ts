import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";

import CustomerModel, { ICustomer } from "../models/customer.model";

const createCustomer = async (
  input: DocumentDefinition<Omit<ICustomer, "createdAt" | "updatedAt">>
) => {
  return CustomerModel.create(input);
};

const findAllCustomers = async () => {
  return CustomerModel.find();
};

const findCustomer = async (
  query: FilterQuery<ICustomer>,
  options: QueryOptions = { lean: true }
) => {
  return CustomerModel.findOne(query, {}, options);
};

export { createCustomer, findAllCustomers, findCustomer };
