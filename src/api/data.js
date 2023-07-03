import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.55.75:7000/api",
  timeout: 1000,
  headers: { "X-Custom-Header": "*" },
});
