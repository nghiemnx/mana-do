import { Button, Empty, Form, Popconfirm, Radio, RadioChangeEvent } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Todo, TodoStatus } from '../models/todo';
import Service from '../service';
import {
  createTodo,
  removeTodo,
  setTodos,
  toggleAllTodos,
  TurnOffEditAllTodos,
  TurnOffEditTodo,
  updateTodoStatus,
  removeTodoByStatus,
  updateTodo,
} from '../store/actions';
import reducer, { initialState } from '../store/reducer';
import { CheckBoxCustom } from '../style';
import {
  ButtonSubmit,
  CreateTodoInput,
  EmptyDataWrapper,
  TaskListFooterLeftSide,
  TaskListFooterMiddle,
  TaskListFooterRightSide,
  TaskListFooterWrapper,
  TaskListWrapper,
  TodoContentWrapper,
  TodoFormWrapper,
  TodoHeader,
  TodoHeaderWrapper,
  ToDoPageWrapper,
} from './style';
import TaskItem from './TaskItem';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const [tasks, setTasks] = useState<Array<Todo>>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [numberActive, setNumberActive] = useState<number>(0);
  const [emptyStr, setEmptyStr] = useState<string>('No tasks here');
  const [clearTaskStr, setClearTaskStr] = useState<string>('Clear all tasks');
  const inputRef = useRef<any>(null);
  const taskItemRef = useRef<any>(null);
  const [form] = Form.useForm();

  const handleCreateTask = async ({ taskContent }: any) => {
    if (taskContent) {
      const resp = await Service.createTodo(taskContent);
      dispatch(createTodo(resp));
      setShowing('ALL');
      form.resetFields();
      inputRef.current.focus();
    }
  };

  const handleUpdateTaskStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: any) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const handleToggleTaskStatus = async (e: CheckboxChangeEvent) => {
    const status: TodoStatus = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    const idList: Array<string> = tasks.map((task) => task.id);
    await Service.changeStatusTodos(idList, status);
    dispatch(toggleAllTodos(e.target.checked));
    setCheckAll(e.target.checked);
  };

  const handleChangeEditTodoStatus = (todoId: string, isEditing: boolean) => {
    dispatch(TurnOffEditTodo(todoId, isEditing));
  };

  const handleRemoveAllTask = async () => {
    await Service.removeTasksByStatus(showing as TodoStatus);
    dispatch(removeTodoByStatus(showing as TodoStatus));
  };

  const handleRemoveTask = async (id: string) => {
    await Service.removeTasksById(id);
    dispatch(removeTodo(id));
  };

  const handleUpdateTask = async (id: string, content: string) => {
    await Service.updateTaskById(id, content);
    dispatch(updateTodo(id, content));
  };

  const handleTaskChange = (e: RadioChangeEvent) => {
    switch (e.target.value) {
      case 'ALL':
        setShowing('ALL');
        setEmptyStr('No task here');
        setClearTaskStr('Clear all tasks');
        break;
      case 'ACTIVE':
        setShowing(TodoStatus.ACTIVE);
        setEmptyStr('No task is active');
        setClearTaskStr('Clear active tasks');

        break;
      case 'COMPLETED':
        setShowing(TodoStatus.COMPLETED);
        setEmptyStr('No task is completed');
        setClearTaskStr('Clear completed tasks');
        break;
    }
  };

  const handleTurnOffEditAllTodos = () => {
    dispatch(TurnOffEditAllTodos());
  };

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  useEffect(() => {
    if (todos && showing) {
      switch (showing) {
        case TodoStatus.ACTIVE:
          setTasks(todos.filter((item) => item.status === TodoStatus.ACTIVE));
          setCheckAll(false);
          break;
        case TodoStatus.COMPLETED:
          setTasks(todos.filter((item) => item.status === TodoStatus.COMPLETED));
          setCheckAll(true);
          break;
        default:
          setTasks(todos);
          const totalCompleted = todos.filter((item) => item.status === TodoStatus.COMPLETED);
          setCheckAll(totalCompleted?.length === todos.length);
          break;
      }
    }
    const numberAct = todos.filter((item) => item.status === TodoStatus.ACTIVE)?.length;
    setNumberActive(numberAct);
  }, [todos, showing]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // retrieve data
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();

    // add event listener
    const handleClickOutside = (event: any) => {
      if (taskItemRef.current && !taskItemRef.current.contains(event.target)) {
        handleTurnOffEditAllTodos();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <ToDoPageWrapper>
      <TodoContentWrapper>
        <TodoHeaderWrapper>
          <TodoHeader>To Do List</TodoHeader>
        </TodoHeaderWrapper>
        <TodoFormWrapper>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleCreateTask}
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <Form.Item
              name="taskContent"
              rules={[{ required: true, message: 'Tell me what you need to do?' }]}
            >
              <CreateTodoInput
                ref={inputRef}
                suffix={<ButtonSubmit htmlType="submit">Add</ButtonSubmit>}
              ></CreateTodoInput>
            </Form.Item>
          </Form>
        </TodoFormWrapper>

        <TaskListWrapper ref={taskItemRef}>
          {tasks?.length > 0 ? (
            tasks.map((todo: Todo, index) => {
              return (
                <TaskItem
                  key={index}
                  id={todo.id}
                  content={todo.content}
                  status={todo.status}
                  isEditing={todo.isEditing}
                  handleChangeEditTodoStatus={handleChangeEditTodoStatus}
                  handleUpdateTaskStatus={handleUpdateTaskStatus}
                  handleRemoveTask={handleRemoveTask}
                  handleUpdateTask={handleUpdateTask}
                ></TaskItem>
              );
            })
          ) : (
            <EmptyDataWrapper>
              <Empty description={emptyStr} />
            </EmptyDataWrapper>
          )}
        </TaskListWrapper>
        <TaskListFooterWrapper>
          <TaskListFooterLeftSide>
            <CheckBoxCustom
              checked={checkAll}
              onChange={handleToggleTaskStatus}
              disabled={tasks?.length < 1}
            >
              Complete all
            </CheckBoxCustom>
          </TaskListFooterLeftSide>
          <TaskListFooterMiddle>
            <Radio.Group buttonStyle="solid" value={showing} onChange={(e) => handleTaskChange(e)}>
              <Radio.Button value="ALL">All - [{todos.length}]</Radio.Button>
              <Radio.Button value="ACTIVE">Active - [{numberActive}]</Radio.Button>
              <Radio.Button value="COMPLETED">
                Completed - [{todos.length - numberActive}]
              </Radio.Button>
            </Radio.Group>
          </TaskListFooterMiddle>
          <TaskListFooterRightSide>
            <Popconfirm
              placement="bottomRight"
              title="Are you sure to delete all the tasks?"
              onConfirm={handleRemoveAllTask}
              okText="Yes"
              cancelText="No"
            >
              <Button disabled={tasks?.length < 1}>{clearTaskStr}</Button>
            </Popconfirm>
          </TaskListFooterRightSide>
        </TaskListFooterWrapper>
      </TodoContentWrapper>
    </ToDoPageWrapper>
  );
};

export default ToDoPage;
