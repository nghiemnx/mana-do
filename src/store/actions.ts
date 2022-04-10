import { Todo, TodoStatus } from '../models/todo';

export const SET_TODO = 'SET_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const REMOVE_TODO_BY_STATUS = 'REMOVE_TODO_BY_STATUS';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const TURN_ON_EDIT_TODO = 'TURN_ON_EDIT_TODO';
export const TURN_OFF_EDIT_ALL_TODOS = 'TURN_OFF_EDIT_ALL_TODOS';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_TODO = 'UPDATE_TODO';

export interface SetTodoAction {
  type: typeof SET_TODO;
  payload: Array<Todo>;
}

export function setTodos(todos: Array<Todo>): SetTodoAction {
  return {
    type: SET_TODO,
    payload: todos,
  };
}

///////////
export interface CreateTodoAction {
  type: typeof CREATE_TODO;
  payload: Todo;
}

export function createTodo(newTodo: Todo): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: newTodo,
  };
}

//////////////
export interface UpdateTodoStatusAction {
  type: typeof UPDATE_TODO_STATUS;
  payload: {
    todoId: string;
    checked: boolean;
  };
}

export function updateTodoStatus(todoId: string, checked: boolean): UpdateTodoStatusAction {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId,
      checked,
    },
  };
}

//////////////
export interface TurnOnEditTodoAction {
  type: typeof TURN_ON_EDIT_TODO;
  payload: {
    todoId: string;
    isEditing: boolean;
  };
}

export function TurnOffEditTodo(todoId: string, isEditing: boolean): TurnOnEditTodoAction {
  return {
    type: TURN_ON_EDIT_TODO,
    payload: {
      todoId,
      isEditing,
    },
  };
}

//////////////
export interface TurnOffEditAllTodosAction {
  type: typeof TURN_OFF_EDIT_ALL_TODOS;
  payload: {};
}

export function TurnOffEditAllTodos(): TurnOffEditAllTodosAction {
  return {
    type: TURN_OFF_EDIT_ALL_TODOS,
    payload: {},
  };
}

//////////////
export interface RemoveTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

export function removeTodo(todoId: string): RemoveTodoAction {
  return {
    type: DELETE_TODO,
    payload: todoId,
  };
}

//////////////
export interface UpdateTodoAction {
  type: typeof UPDATE_TODO;
  payload: {
    todoId: string;
    content: string;
  };
}

export function updateTodo(todoId: string, content: string): UpdateTodoAction {
  return {
    type: UPDATE_TODO,
    payload: {
      todoId,
      content,
    },
  };
}

//////////////
export interface RemoveTodoByStatusAction {
  type: typeof REMOVE_TODO_BY_STATUS;
  payload: TodoStatus;
}

export function removeTodoByStatus(status: TodoStatus): RemoveTodoByStatusAction {
  return {
    type: REMOVE_TODO_BY_STATUS,
    payload: status,
  };
}

///////////
export interface ToggleAllTodosAction {
  type: typeof TOGGLE_ALL_TODOS;
  payload: boolean;
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: checked,
  };
}

export type AppActions =
  | SetTodoAction
  | CreateTodoAction
  | UpdateTodoStatusAction
  | RemoveTodoAction
  | RemoveTodoByStatusAction
  | TurnOnEditTodoAction
  | TurnOffEditAllTodosAction
  | UpdateTodoAction
  | ToggleAllTodosAction;
