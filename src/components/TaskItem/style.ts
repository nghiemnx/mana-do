import styled from 'styled-components';
import { Input } from 'antd';

export const TaskItemWrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

export const TaskItemLeft = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 70px);
`;

export const TaskItemRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60px; //  50 - 5 * 2 (TaskItemWrapper)
  height: 100%;
`;

export const TaskItemContent = styled.div`
  width: calc(100% - 40px);
  height: 20px;
`;

export const TaskItemContentEditable = styled(Input)`
  width: calc(100% - 40px);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
