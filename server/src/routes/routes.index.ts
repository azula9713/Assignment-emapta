import { Express } from "express";
import customerRoutes from "./customer.routes";
import productTypeRoutes from "./productType.routes";
import productRoutes from "./product.routes";

const routes = (server: Express): void => {
  server.use("/api/v1/customers", customerRoutes);
  server.use("/api/v1/product-types", productTypeRoutes);
  server.use("/api/v1/products", productRoutes);
};

export default routes;
