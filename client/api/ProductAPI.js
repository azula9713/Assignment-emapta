import Server from "./Axios";

export const CreateProduct = async (data) => {
  return Server.post("products/create", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const GetProducts = async () => {
  return Server.get("products/all")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const GetProduct = async (id) => {
  return Server.get("products/view/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const UpdateProduct = async (data) => {
  console.log("data", data);
  return Server.put("products/update/" + data.variables.id, data.variables.data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
