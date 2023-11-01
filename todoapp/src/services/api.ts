import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "http://localhost:3333";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

async function getToken() {
  return await AsyncStorage.getItem("@todo_token");
}

async function setToken(token: string) {
  return await AsyncStorage.setItem("@todo_token", token);
}

async function deleteToken() {
  return await AsyncStorage.removeItem("@todo_token");
}

// configura o interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// configura o interceptor para lidar com tokens expirados
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    if (error?.response?.status === 401) {
      return refreshToken().then(async () => {
        const token = await getToken();
        // adiciona o novo token na requisição
        error.config.headers["x-access-token"] = token;
        // tenta a requisição novamente
        return api(error.config);
      });
    }
    return Promise.reject(error);
  }
);

async function refreshToken(): Promise<any> {
  return api
    .patch("/refresh/token")
    .then(async (response: any) => {
      console.log(response.data.token);
      await setToken(response.data.token);
    })
    .catch(async (error: any) => {
      await deleteToken();
      return Promise.reject(error);
    });
}
