import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ICustomer } from "./customer.model";
import { IProductType } from "./productType.model";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

export interface ProductInput {
  productType: IProductType["_id"];
  customer: ICustomer["_id"];
  deliveryStatus: string;
  deliveryAddress: string;
  estimatedDeliveryDate: string;
}

export interface IProduct extends ProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      default: () => `prod_${nanoid()}`,
      unique: true,
      required: true,
    },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ["PENDING", "ORDERED", "SHIPPED", "CANCELLED"],
      default: "PENDING",
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    estimatedDeliveryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
