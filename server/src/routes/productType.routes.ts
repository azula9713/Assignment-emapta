import { Router } from "express";

import validate from "../middleware/validateResource";
import {
  createProductTypeHandler,
  getAllProductTypesHandler,
  getProductTypeHandler,
} from "../controllers/productType.controller";
import {
  createProductTypeSchema,
  getProductTypeSchema,
} from "../schemas/productType.schema";

const router = Router();

router.route("/all").get(getAllProductTypesHandler);
router
  .route("/view/:productTypeId")
  .get(validate(getProductTypeSchema), getProductTypeHandler);
router
  .route("/create")
  .post([validate(createProductTypeSchema)], createProductTypeHandler);

export default router;
