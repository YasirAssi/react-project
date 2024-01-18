import axios from "axios";
import { getToken } from "./storageService";

axios.defaults.baseURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";

axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});
