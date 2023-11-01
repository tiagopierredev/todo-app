import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "http://localhost:3333";

export const api = axios.create({
  baseURL,
});

async function getToken() {
  return await AsyncStorage.getItem("@todo_token");
}

// configura o interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// // configura o interceptor para lidar com tokens expirados
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: any) => {
//     if (error?.response?.status === 401 && error.response?.result?.expired) {
//       return refreshToken().then(async () => {
//         const token = await getToken();
//         // adiciona o novo token na requisição
//         error.config.headers["x-access-token"] = token
//         // tenta a requisição novamente
//         return api(error.config);
//       });
//     }
//     return Promise.reject(error);
//   }
// );

// async function refreshToken(): Promise<any> {
//   return api
//     .post("/users/refreshToken", {
//       refresh: localStorage.getItem("@mistyco_refresh_token"),
//       type: "users",
//     })
//     .then((response: any) => {
//       localStorage.setItem("@mistyco_token", response.data.result.token);
//       localStorage.setItem(
//         "@mistyco_refresh_token",
//         response.data.result.tokenRefresh
//       );
//       // store.dispatch(updateUser(response.data.result));
//     })
//     .catch((error: any) => {
//       return Promise.reject(error);
//     });
// }

// refreshToken();
