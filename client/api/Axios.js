import axios from "axios";

const Server = axios.create({
  baseURL: "http://localhost:1337/api/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Server;
