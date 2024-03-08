import { baseUrl } from "./urls";
import axios from "axios";
const instance = axios.create({
    baseURL: baseUrl,
  });
  
export default instance;