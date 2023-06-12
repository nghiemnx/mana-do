import './App.css';
import React from 'react';
import ToDoPage from './components';
import KyanonLogo from './resourses/kyanon-logo.png';
import { Layout, Header, Content, Footer } from './style';
import { Image } from 'antd';

function App() {
  return (
    <>
      <Layout>
        <Header>
          <Image src={KyanonLogo} height={30} />
        </Header>
        <Content>
          <ToDoPage></ToDoPage>
        </Content>
        <Footer>&copy; Made with ❤ by Kyanon Digital</Footer>
      </Layout>
    </>
  );
}

export default App;
