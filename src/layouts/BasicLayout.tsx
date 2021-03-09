import React from 'react';
import { Layout } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';

const { Header, Content } = Layout;

const Logo: React.FC = () => {
  return (
    <a className={styles.logo}>
      <img src={logo} alt="logo" />
      <h1>Ant Design Pro</h1>
    </a>
  );
};

const BasicLayout: React.FC = (props) => {
  const { children } = props;

  return (
    <>
      <Header className={styles.header}>
        <Logo />
        <RightContent />
      </Header>
      <Content className={styles.content}>{children}</Content>
    </>
  );
};

export default BasicLayout;
