import { Checkbox } from 'antd';
import styled from 'styled-components';

export const Layout = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

export const Header = styled.div`
	height: 60px;
	width: 100%;
	display: flex;
	align-items: center;
	padding-left: 25px;
	padding-right: 25px;
	box-shadow: 0 2px 8px #f0f1f2;
`;

export const Content = styled.div`
	margin-top: 10px;
	margin-bottom: 10px;
	height: calc(100% - 140px);
	width: 50%;
`;

export const Footer = styled.div`
	font-family: var(--font-primary);
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 -4px 10px #f0f1f2;
`;

export const CheckBoxCustom = styled(Checkbox)`
	margin-right: 10px;
`;
