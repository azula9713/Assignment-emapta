import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";

import ProductTypeModel, { IProductType } from "../models/productType.model";

const createProductType = async (
  input: DocumentDefinition<Omit<IProductType, "createdAt" | "updatedAt">>
) => {
  return ProductTypeModel.create(input);
};

const findAllProductTypes = async () => {
  return ProductTypeModel.find();
};

const findProductType = async (
  query: FilterQuery<IProductType>,
  options: QueryOptions = { lean: true }
) => {
  return ProductTypeModel.findOne(query, {}, options);
};

export { createProductType, findAllProductTypes, findProductType };
