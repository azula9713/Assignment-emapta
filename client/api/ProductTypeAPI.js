import Server from "./Axios";

export const CreateProductType = async (data) => {
  return Server.post("product-types/create", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const GetProductTypes = async () => {
  return Server.get("product-types/all")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const GetProductType = async (id) => {
  return Server.get("product-types/view/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
