import React from 'react';
import { Layout } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';

const { Header } = Layout;

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
      {children}
    </>
  );
};

export default BasicLayout;
