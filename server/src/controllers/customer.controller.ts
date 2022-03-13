import { Request, Response } from "express";

import {
  CreateCustomerInput,
  GetCustomerInput,
} from "../schemas/customer.schema";
import {
  createCustomer,
  findAllCustomers,
  findCustomer,
} from "../services/customer.service";
import logger from "../utils/logger";

const createCustomerHandler = async (
  // eslint-disable-next-line @typescript-eslint/ban-types
  req: Request<{}, {}, CreateCustomerInput["body"]>,
  res: Response
) => {
  try {
    const user = await createCustomer(req.body);
    return res.send(user);
  } catch (e) {
    logger.error(e);
    return res.status(409).send((e as Error).message);
  }
};

const getCustomerHandler = async (
  req: Request<GetCustomerInput["params"]>,
  res: Response
) => {
  const customerId = req.params.customerId;
  const customer = await findCustomer({ customerId });

  if (!customer) {
    return res.status(404).send({ message: "Customer not found" });
  }

  return res.send(customer);
};

const getAllCustomersHandler = async (req: Request, res: Response) => {
  const customers = await findAllCustomers();

  if (!customers) {
    return res.status(404).send({ message: "No customers found" });
  }

  return res.send(customers);
};

export { createCustomerHandler, getCustomerHandler, getAllCustomersHandler };
