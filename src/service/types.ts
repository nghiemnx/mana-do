import { Todo } from '../models/todo';

export abstract class API {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
}
