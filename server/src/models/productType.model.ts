import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

export interface ProductTypeInput {
  name: string;
}

export interface IProductType extends ProductTypeInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const productTypeSchema = new mongoose.Schema(
  {
    productTypeId: {
      type: String,
      default: () => `prod_type_${nanoid()}`,
      unique: true,
      required: true,
    },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductTypeModel = mongoose.model<IProductType>(
  "ProductType",
  productTypeSchema
);

export default ProductTypeModel;
