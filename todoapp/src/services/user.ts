import { api } from "./api";

export async function login(data: any) {
  try {
    const response = await api.post("/login", data);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Something went wrong!');
  }
}

export async function register(data: any) {
  try {
    const response = await api.post("/register", data);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Something went wrong!');
  }
}
