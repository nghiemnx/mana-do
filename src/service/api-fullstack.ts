import { API } from './types';
import { Todo, TodoStatus } from '../models/todo';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

class ApiFullstack extends API {
  async createTodo(content: string): Promise<Todo> {
    const resp = await axios.post<AxiosResponse<Todo>>(`/tasks`, {
      content,
    });

    return resp.data.data;
  }

  async getTodos(): Promise<Array<Todo>> {
    const resp = await axios.get<AxiosResponse<Array<Todo>>>(`/tasks`);

    return resp.data.data;
  }

  async changeStatusTodos(listTodo: Array<string>, status: TodoStatus): Promise<boolean> {
    return true;
  }

  async removeTasksByStatus(status: TodoStatus): Promise<boolean> {
    return true;
  }

  async removeTasksById(id: string): Promise<boolean> {
    return true;
  }

  async updateTaskById(id: string, content: string): Promise<boolean> {
    return true;
  }
}

export default new ApiFullstack();
