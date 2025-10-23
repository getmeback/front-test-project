export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type ApiResponse<T> = IResponseSuccess<T> | IResponseError;

export interface IResponseError {
  result: "error";
  message: string;
}

export interface IResponseSuccess<T> {
  result: "success";
  data: T;
}

export interface IGetTodosResponse {
  todos: Todo[];
}

export interface IUpdateTodoRequest {
  todo: Todo;
}

export interface IUpdateTodoResponse {
  todo: Todo;
}
