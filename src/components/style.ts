import styled from 'styled-components';
import { Button, Input } from 'antd';

export const ToDoPageWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-shadow: 0 2px 8px #f0f1f2;
`;

export const TodoHeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const TodoHeader = styled.h1`
  font-family: var(--font-primary);
`;

export const CreateTodoInput = styled(Input)``;

export const ButtonSubmit = styled(Button)`
  font-family: var(--font-primary);
`;

export const TodoFormWrapper = styled.div`
  height: 50px;
  margin-left: 100px;
  margin-right: 100px;
`;

export const TaskListWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  height: calc(100% - 165px);
  overflow-y: auto;
`;

export const TaskListFooterWrapper = styled.div`
  font-family: var(--font-primary);
  position: absolute;
  bottom: 0;
  left: 0;
  height: 35px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`;

export const TaskListFooterLeftSide = styled.div`
  padding-left: 5px;
  width: 20%;
  display: flex;
  justify-content: flex-start;
`;

export const TaskListFooterRightSide = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  padding-left: 5px;
`;
export const TaskListFooterMiddle = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

export const TodoContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const EmptyDataWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
