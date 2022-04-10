import './App.css';
import React from 'react';
import ToDoPage from './components';
import { ReactComponent as ManabieLogo } from './resourses/logo.svg';
import { Layout, Header, Content, Footer } from './style';

function App() {
  return (
    <>
      <Layout>
        <Header>
          <ManabieLogo />
        </Header>
        <Content>
          <ToDoPage></ToDoPage>
        </Content>
        <Footer>&copy; Made with ❤ by Manabie</Footer>
      </Layout>
    </>
  );
}

export default App;
