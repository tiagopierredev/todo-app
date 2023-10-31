import { api } from "./api";

export async function getAllTodo(data: any) {
  try {
    const response = await api.get("/todo", {
      params: {
        id: data,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
}

export async function addTodo(data: any) {
  try {
    const response = await api.post("/todo", data);
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
}

export async function changeTodoValue(data: any) {
  try {
    const response = await api.patch(
      "/todo",
      {},
      {
        params: {
          ...data,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
}

export async function deleteTodo(data: any) {
  try {
    const response = await api.delete("/todo", {
      params: {
        ...data,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "Something went wrong!");
  }
}
