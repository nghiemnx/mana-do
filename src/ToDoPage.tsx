import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Todo, TodoStatus } from './models/todo';
import Service from './service';
import {
  createTodo,
  deleteAllTodos,
  setTodos,
  toggleAllTodos,
  updateTodoStatus,
} from './store/actions';
import reducer, { initialState } from './store/reducer';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [tasks, setTasks] = useState<Array<Todo>>([]);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      console.log(resp, 'nghiem');
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    if (todos && showing) {
      switch (showing) {
        case TodoStatus.ACTIVE:
          setTasks(todos.filter((item) => item.status === TodoStatus.ACTIVE));
          break;
        case TodoStatus.COMPLETED:
          setTasks(todos.filter((item) => item.status === TodoStatus.COMPLETED));
          break;
        default:
          setTasks(todos);
          break;
      }
    }
  }, [todos, showing]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
    }
  };

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {tasks.map((todo, index) => {
          return (
            <div key={index} className="ToDo__item">
              <input
                type="checkbox"
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span>{todo.content}</span>
              <button className="Todo__delete">X</button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {tasks.length > 0 ? <input type="checkbox" onChange={onToggleAllTodo} /> : <div />}
        <div className="Todo__tabs">
          <button className="Action__btn" onClick={() => setShowing('ALL')}>
            All
          </button>
          <button className="Action__btn" onClick={() => setShowing(TodoStatus.ACTIVE)}>
            Active
          </button>
          <button className="Action__btn" onClick={() => setShowing(TodoStatus.COMPLETED)}>
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
