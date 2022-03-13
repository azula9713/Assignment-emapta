import { Router } from "express";

import validate from "../middleware/validateResource";
import {
  createProductHandler,
  updateProductHandler,
  getAllProductsHandler,
  getProductHandler,
} from "../controllers/product.controller";
import {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";

const router = Router();

router.route("/all").get(getAllProductsHandler);
router
  .route("/view/:productId")
  .get(validate(getProductSchema), getProductHandler);
router
  .route("/create")
  .post([validate(createProductSchema)], createProductHandler);
router
  .route("/update/:productId")
  .put([validate(updateProductSchema)], updateProductHandler);

export default router;
