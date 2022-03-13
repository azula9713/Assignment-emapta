/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
  GetProductInput,
} from "../schemas/product.schema";
import {
  createProduct,
  findAllProducts,
  findProduct,
  findAndUpdateProduct,
} from "../services/product.service";
import logger from "../utils/logger";

const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) => {
  const body = req.body;

  try {
    //add user role verification
    const product = await createProduct({ ...body });
    return res.send(product);
  } catch (err) {
    logger.error("Error creating product", err);
    return res.status(500).send(err);
  }
};

const getProductHandler = async (
  req: Request<GetProductInput["params"]>,
  res: Response
) => {
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  return res.send(product);
};

const getAllProductsHandler = async (req: Request, res: Response) => {
  const products = await findAllProducts();

  if (!products) {
    return res.status(404).send({ message: "Products not found" });
  }

  return res.send(products);
};

const updateProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response
) => {
  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ productId });

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  try {
    //add user role verification
    const updatedProduct = await findAndUpdateProduct(
      { productId },
      { ...update },
      { new: true }
    );
    return res.send(updatedProduct);
  } catch (err) {
    logger.error("Error updating product", err);
    return res.status(500).send(err);
  }
};

export {
  createProductHandler,
  getProductHandler,
  getAllProductsHandler,
  updateProductHandler,
};
