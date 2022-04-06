import { API } from './types';
import { Todo, TodoStatus } from '../models/todo';
import shortid from 'shortid';

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
  const taskListNew: Array<Todo> = [...taskList, task];
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
    } as Todo;
    pushTaskList(newTask);
    return Promise.resolve(newTask);
  }

  async getTodos(): Promise<Todo[]> {
    return retrieveTaskList();
  }
}

export default new ApiFrontend();
