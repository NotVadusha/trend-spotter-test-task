import axios from "axios";
import { envsafe, url } from "envsafe";

const { VITE_API_BASE_URL } = envsafe(
  {
    VITE_API_BASE_URL: url(),
  },
  // Vite has it's envs in import.meta.env instead of process.env
  // Annoying, but that's how it is
  { env: import.meta.env },
);

export const api = axios.create({
  baseURL: VITE_API_BASE_URL,
});
