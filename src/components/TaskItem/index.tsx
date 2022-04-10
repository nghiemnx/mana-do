import { DeleteTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import { InputRef, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { TodoStatus } from '../../models/todo';
import { CheckBoxCustom } from '../../style';
import {
  TaskItemContent,
  TaskItemContentEditable,
  TaskItemLeft,
  TaskItemRight,
  TaskItemWrapper,
} from './style';

type TaskItemProps = {
  id: string;
  content: string;
  status: TodoStatus;
  isEditing: string;
  handleChangeEditTodoStatus: Function;
  handleUpdateTaskStatus: Function;
  handleUpdateTask: Function;
  handleRemoveTask: Function;
};

const TaskItem = (props: TaskItemProps) => {
  //declare
  const [inputValue, setInputValue] = useState<string>(props.content);
  const taskItemRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<InputRef>(null);

  //function
  const handleEditTask = () => {
    setInputValue(props.content);
    // TODO: Handle action
    props.handleChangeEditTodoStatus(props.id, true);
  };

  const handleSubmitTask = (e: any) => {
    if (e.key === 'Enter' && inputValue) {
      props.handleUpdateTask(props.id, inputValue);
      props.handleChangeEditTodoStatus(props.id, false);
    }
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const subContentTask = (content: string, limit: number) => {
    if (content?.length <= limit) return content;
    return content.substring(0, limit).concat('...');
  };

  const handleRemoveTaskById = () => {
    props.handleRemoveTask(props.id);
  };

  useEffect(() => {
    if (editRef?.current) editRef.current?.focus();
  }, [props.isEditing]);

  return (
    <TaskItemWrapper ref={taskItemRef}>
      <TaskItemLeft>
        <CheckBoxCustom
          checked={props.status === TodoStatus.COMPLETED}
          onChange={(e) => props.handleUpdateTaskStatus(e, props.id)}
        ></CheckBoxCustom>
        {props.isEditing ? (
          <TaskItemContentEditable
            ref={editRef}
            onKeyDown={(e) => handleSubmitTask(e)}
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
          ></TaskItemContentEditable>
        ) : (
          <TaskItemContent onDoubleClick={handleEditTask}>
            {subContentTask(props.content, 60)}
          </TaskItemContent>
        )}
      </TaskItemLeft>
      <TaskItemRight>
        <Tooltip
          placement="bottomLeft"
          style={{ width: '100px' }}
          title={() => `Content: \n ${props.content}`}
        >
          <InfoCircleTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} />
        </Tooltip>
        <Tooltip placement="bottomLeft" title={'Remove this task!'}>
          <DeleteTwoTone
            onClick={handleRemoveTaskById}
            twoToneColor="#FF4242"
            style={{ fontSize: '20px', cursor: 'pointer' }}
          />
        </Tooltip>
      </TaskItemRight>
    </TaskItemWrapper>
  );
};

export default TaskItem;
