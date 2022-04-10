import { Todo, TodoStatus } from '../models/todo';

export abstract class API {
  abstract getTodos(): Promise<Array<Todo>>;
  abstract createTodo(content: string): Promise<Todo>;
  abstract changeStatusTodos(listTodo: Array<string>, status: TodoStatus): Promise<boolean>;
  abstract removeTasksByStatus(status: TodoStatus): Promise<boolean>;
  abstract removeTasksById(id: string): Promise<boolean>;
  abstract updateTaskById(id: string, content: string): Promise<boolean>;
}
