import Server from "./Axios";

export const CreateCustomer = async (data) => {
  return Server.post("customers/create", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const GetCustomers = async () => {
  return Server.get("customers/all")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const GetCustomer = async (id) => {
  return Server.get("customers/view/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
