import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  TURN_ON_EDIT_TODO,
  CREATE_TODO,
  REMOVE_TODO_BY_STATUS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  TURN_OFF_EDIT_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

// Improvement B0.
function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case CREATE_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case UPDATE_TODO_STATUS:
      const {
        payload: { todoId, checked },
      } = action;
      return {
        ...state,
        todos: state.todos.map((task) => {
          return task.id === todoId
            ? { ...task, status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE }
            : task;
        }),
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((task) => {
          return task.id === action.payload.todoId
            ? { ...task, content: action.payload.content }
            : task;
        }),
      };

    case TOGGLE_ALL_TODOS:
      return {
        ...state,
        todos: state.todos.map((task) => ({
          ...task,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        })),
      };

    case TURN_ON_EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((task) => {
          return task.id === action.payload.todoId
            ? {
                ...task,
                isEditing: action.payload.isEditing,
              }
            : {
                ...task,
                isEditing: false,
              };
        }),
      };

    case TURN_OFF_EDIT_ALL_TODOS:
      if (state.todos.every((task) => !task.isEditing)) return state;
      return {
        ...state,
        todos: state.todos.map((task) => ({ ...task, isEditing: false })),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((task) => task.id !== action.payload),
      };
    case REMOVE_TODO_BY_STATUS:
      if (action.payload !== TodoStatus.ACTIVE && action.payload !== TodoStatus.COMPLETED)
        return { ...state, todos: [] };
      return {
        ...state,
        todos: state.todos.filter((task) => task.status !== action.payload),
      };
    default:
      return state;
  }
}

export default reducer;
