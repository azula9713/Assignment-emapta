import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

import ProductModel, { IProduct } from "../models/product.model";

const createProduct = async (
  input: DocumentDefinition<Omit<IProduct, "createdAt" | "updatedAt">>
) => {
  return ProductModel.create(input);
};

const findAllProducts = async () => {
  return ProductModel.find().populate("customer").populate("productType");
};

const findProduct = async (
  query: FilterQuery<IProduct>,
  options: QueryOptions = { lean: true }
) => {
  return ProductModel.findOne(query, {}, options)
    .populate("customer")
    .populate("productType");
};

const findAndUpdateProduct = async (
  query: FilterQuery<IProduct>,
  update: UpdateQuery<IProduct>,
  options: QueryOptions
) => {
  return ProductModel.findOneAndUpdate(query, update, options);
};

export { createProduct, findAllProducts, findProduct, findAndUpdateProduct };
