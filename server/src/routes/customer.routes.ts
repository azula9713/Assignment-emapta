import { Router } from "express";
import {
  createCustomerHandler,
  getAllCustomersHandler,
  getCustomerHandler,
} from "../controllers/customer.controller";

import validate from "../middleware/validateResource";
import {
  createCustomerSchema,
  getCustomerSchema,
} from "../schemas/customer.schema";

const router = Router();

router
  .route("/create")
  .post(validate(createCustomerSchema), createCustomerHandler);

router.route("/all").get(getAllCustomersHandler);
router
  .route("/view/:customerId")
  .get(validate(getCustomerSchema), getCustomerHandler);

export default router;
