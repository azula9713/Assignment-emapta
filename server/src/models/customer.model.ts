import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

export interface CustomerInput {
  name: string;
  contactNo: string;
}

export interface ICustomer extends CustomerInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      default: () => `cust_${nanoid()}`,
      unique: true,
      required: true,
    },
    name: { type: String, required: true },
    contactNo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CustomerModel = mongoose.model<ICustomer>("Customer", customerSchema);

export default CustomerModel;
