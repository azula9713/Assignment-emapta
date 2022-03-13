/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import {
  CreateProductTypeInput,
  GetProductTypeInput,
} from "../schemas/productType.schema";
import {
  createProductType,
  findAllProductTypes,
  findProductType,
} from "../services/productType.service";
import logger from "../utils/logger";

const createProductTypeHandler = async (
  req: Request<{}, {}, CreateProductTypeInput["body"]>,
  res: Response
) => {
  const body = req.body;
  try {
    //add user role verification
    const productType = await createProductType({
      ...body,
    });
    return res.send(productType);
  } catch (err) {
    logger.error("Error creating product type", err);
    return res.status(500).send(err);
  }
};

const getProductTypeHandler = async (
  req: Request<GetProductTypeInput["params"]>,
  res: Response
) => {
  const productTypeId = req.params.productTypeId;
  const productType = await findProductType({ productTypeId });

  if (!productType) {
    return res.status(404).send({ message: "Product type not found" });
  }

  return res.send(productType);
};

const getAllProductTypesHandler = async (req: Request, res: Response) => {
  const productTypes = await findAllProductTypes();

  if (!productTypes) {
    return res.status(404).send({ message: "No product types found" });
  }

  return res.send(productTypes);
};

export {
  createProductTypeHandler,
  getProductTypeHandler,
  getAllProductTypesHandler,
};
