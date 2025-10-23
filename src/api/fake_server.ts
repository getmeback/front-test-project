import { nanoid } from "nanoid";

/*

Это фейковое апи, которое работает через localStorage.
Чтобы "воспользоваться" им, нужно просто вызвать соответствующую
функцию из контроллера, как если это был тот же axios, просто
здесь нет ни method, и url, просто сразу data передается.

Для имитации ошибки сделана специальная глобальная переменная
window.serverError, с помощью которой можно переключить режим
фейкового апи.

Функция fakeUpdateTodoLS имеет типизацию для образца.

*/

import {
  ApiResponse,
  IGetTodosResponse,
  IResponseError,
  IUpdateTodoRequest,
  IUpdateTodoResponse,
  Todo,
} from "@/types";

/*
Получение всех записей

GET /todos

Response:
{
  result: "success",
  todos: [
    {
      id: "1v245f2g51",
      text: "foo",
      completed: false
    },
    ...
  ];
}

Error:
{
  result: "error",
  message: "bar"
}
*/
export const fakeGetTodosLS = async (): Promise<
  ApiResponse<IGetTodosResponse> | IResponseError
> => {
  const todosInStorage = localStorage.getItem("todos");
  let list: any[] = [];

  //await sleep(1000); Специально убрано, чтобы проще было работать с hmr

  if (window.serverError) {
    console.log({
      result: "error",
      message: "Что-то пошло не так",
    });

    return {
      result: "error",
      message: "Что-то пошло не так",
    };
  }

  if (todosInStorage) {
    try {
      list = JSON.parse(todosInStorage).reverse();
    } catch (e) {
      list = [];
    }
  }

  console.log({
    result: "success",
    data: { todos: list },
  });

  return {
    result: "success",
    data: { todos: list },
  };
};

/*
Создание записи.

POST /todos
Request:
{
  text: "foo"
}

Response:
{
  result: "success",
  todo: {
    id: "1v245f2g51",
    text: "foo",
    completed: false
  }
}

Error:
{
  result: "error",
  message: "bar"
}
*/
export const fakeAddTodoLS = async (data: {
  text: string;
}): Promise<
  | {
      result: "success";
      data: { todo: Todo };
    }
  | { result: "error"; message: string }
> => {
  await sleep(1000);

  if (!data.text || window.serverError) {
    console.log({
      result: "error",
      message: "Не указаны данные",
    });

    return {
      result: "error",
      message: "Не указаны данные",
    };
  }

  const todosInStorage = localStorage.getItem("todos");
  let list: any[] = [];

  if (todosInStorage) {
    try {
      list = JSON.parse(todosInStorage);
    } catch (e) {
      list = [];
    }
  }

  const newTodo: any = {
    id: nanoid(),
    text: data.text,
  };

  list.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(list));

  console.log({
    result: "success",
    data: { todo: newTodo },
  });

  return {
    result: "success",
    data: { todo: newTodo },
  };
};

/*
Изменение записи.

POST /todos/{id}
Request:
{
  id: "1v245f2g51",
  text: "foo",
  completed: true
}

Response:
{
  result: "success",
  todo: {
    id: "1v245f2g51",
    text: "foo",
    completed: false
  }
}

Error:
{
  result: "error",
  message: "bar"
}
*/
export const fakeUpdateTodoLS = async ({
  todo,
}: IUpdateTodoRequest): Promise<
  ApiResponse<IUpdateTodoResponse> | IResponseError
> => {
  await sleep(1000);

  if (!todo.id || !todo.text || todo.completed == null || window.serverError) {
    console.log({
      result: "error",
      message: "Не указаны данные",
    });

    return {
      result: "error",
      message: "Не указаны данные",
    };
  }

  const todosInStorage = localStorage.getItem("todos");
  let list: Todo[] = [];

  if (todosInStorage) {
    try {
      list = JSON.parse(todosInStorage);
    } catch (e) {
      list = [];
    }
  }

  const todoIndex = list.findIndex((t: Todo) => t.id === todo.id);

  if (todoIndex < 0) {
    console.log({
      result: "error",
      message: "Не найден todo",
    });

    return {
      result: "error",
      message: "Не найден todo",
    };
  }

  list.splice(todoIndex, 1, todo);

  localStorage.setItem("todos", JSON.stringify(list));

  console.log({
    result: "success",
    data: {
      todo,
    },
  });

  return {
    result: "success",
    data: {
      todo,
    },
  };
};

/*
Удаление записи.

DELETE /todos/{id}
Request:
{
  id: "1v245f2g51"
}

Response:
{
  result: "success"
}

Error:
{
  result: "error",
  message: "bar"
}
*/
export const fakeDeleteTodoLS = async (
  id: string
): Promise<{ result: "error" | "success"; message?: string }> => {
  await sleep(1000);

  if (!id || window.serverError) {
    console.log({
      result: "error",
      message: "Не указаны данные",
    });

    return {
      result: "error",
      message: "Не указаны данные",
    };
  }

  const todosInStorage = localStorage.getItem("todos");
  let list: any[] = [];

  if (todosInStorage) {
    try {
      list = JSON.parse(todosInStorage);
    } catch (e) {
      list = [];
    }
  }

  const todoIndex = list.findIndex((t: any) => t.id === id);

  if (todoIndex < 0) {
    console.log({
      result: "error",
      message: "Не найден todo",
    });

    return {
      result: "error",
      message: "Не найден todo",
    };
  }

  list.splice(todoIndex, 1);

  localStorage.setItem("todos", JSON.stringify(list));

  console.log({
    result: "success",
  });

  return {
    result: "success",
  };
};

/*
Удаление всех записей.

POST /todos/clear-all
Request:
{}

Response:
{
  result: "success"
}

Error:
{
  result: "error",
  message: "bar"
}
*/
export const fakeClearTodos = async (): Promise<{
  result: "error" | "success";
  message?: string;
}> => {
  await sleep(1000);

  if (window.serverError) {
    console.log({
      result: "error",
      message: "Что-то пошло не так",
    });

    return {
      result: "error",
      message: "Что-то пошло не так",
    };
  }

  localStorage.setItem("todos", JSON.stringify([]));

  console.log({
    result: "success",
  });

  return {
    result: "success",
  };
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
