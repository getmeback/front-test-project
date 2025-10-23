import {
  fakeAddTodoLS,
  fakeClearTodos,
  fakeDeleteTodoLS,
  fakeGetTodosLS,
  fakeUpdateTodoLS,
} from "@/api/fake_server";

import {
  ApiResponse,
  IGetTodosResponse,
  IUpdateTodoRequest,
  IUpdateTodoResponse,
  Todo,
} from "@/types";

export async function request<T>(func: Promise<ApiResponse<T>>): Promise<T> {
  return func.then((response) => {
    if (response.result === "error") {
      throw response.message;
    }

    return response.data;
  });
}

export const getTodoList = async (): Promise<Todo[]> => {
  return request<IGetTodosResponse>(fakeGetTodosLS()).then((response) => {
    return response.todos;
  });
};

export const addTodo = async (data: any): Promise<any> => {
  return request<{ todo: any }>(fakeAddTodoLS(data)).then((response) => {
    return response.todo;
  });
};

export const updateTodo = async (data: IUpdateTodoRequest): Promise<Todo> => {
  return request<IUpdateTodoResponse>(fakeUpdateTodoLS(data)).then(
    (response) => {
      return response.todo;
    }
  );
};

export const clearTodos = async (): Promise<any> => {
  return await fakeClearTodos().then((response) => {
    if (response.result === "error") {
      throw response.message;
    } else {
      return response;
    }
  });
};

export const deleteTodo = async (id: any): Promise<any> => {
  return await fakeDeleteTodoLS(id).then((response) => {
    if (response.result === "error") {
      throw response.message;
    } else {
      return response;
    }
  });
};
