import shortid from 'shortid';
import { Todo, TodoStatus } from '../models/todo';
import { API } from './types';

const DATABASE_NAME = 'TODO-APP';

const insertDatabase = (data: Array<Todo>) => {
  localStorage.setItem(DATABASE_NAME, JSON.stringify(data));
};

const retrieveTaskList = (): Array<Todo> => {
  let dataStr = localStorage.getItem(DATABASE_NAME);
  if (!dataStr) {
    const initData = new Array<Todo>();
    insertDatabase(initData);
    return initData;
  } else {
    return JSON.parse(dataStr) as Array<Todo>;
  }
};

const pushTaskList = (task: Todo): Todo => {
  const taskList: Array<Todo> = retrieveTaskList();
  const taskListNew: Array<Todo> = [task, ...taskList];
  insertDatabase(taskListNew);
  return task;
};

class ApiFrontend extends API {
  async createTodo(content: string): Promise<Todo> {
    const newTask = {
      content: content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid(),
      user_id: 'firstUser',
      isEditing: false,
    } as Todo;
    pushTaskList(newTask);
    return Promise.resolve(newTask);
  }

  async getTodos(): Promise<Todo[]> {
    return retrieveTaskList();
  }

  async changeStatusTodos(listTodoId: Array<string>, status: TodoStatus): Promise<boolean> {
    const curListTodos = retrieveTaskList();
    const todoNew = curListTodos.map((task) => {
      return listTodoId.includes(task.id) ? { ...task, status } : task;
    });
    insertDatabase(todoNew);
    return true;
  }

  async removeTasksByStatus(status: TodoStatus): Promise<boolean> {
    if (status !== TodoStatus.ACTIVE && status !== TodoStatus.COMPLETED) insertDatabase([]);
    const curListTodos = retrieveTaskList();
    const todoNew = curListTodos.filter((task) => {
      return task.status !== status;
    });
    insertDatabase(todoNew);
    return true;
  }

  async removeTasksById(id: string): Promise<boolean> {
    const curListTodos = retrieveTaskList();
    const todoNew = curListTodos.filter((task) => {
      return task.id !== id;
    });
    insertDatabase(todoNew);
    return true;
  }

  async updateTaskById(id: string, content: string): Promise<boolean> {
    const curListTodos = retrieveTaskList();
    const todoNew = curListTodos.map((task) => {
      return task.id === id
        ? {
            ...task,
            content,
          }
        : task;
    });
    insertDatabase(todoNew);
    return true;
  }
}

export default new ApiFrontend();
