import React from 'react';
import { history } from 'umi';
import { Layout } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import AppNavbar from '@/components/GlobalHeader/AppNavbar';
import type { Route, RouterTypes } from '../typings';
import { getPageTitle } from '@/utils/utils';
import { PRO_TITLE } from '@/utils/constants';
import { useDocumentTitle } from '@/utils/hooks';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';

const { Header, Content } = Layout;

export type BasicLayoutProps = Partial<RouterTypes<Route>>;

const Logo: React.FC = () => {
  return (
    <a className={styles.logo} onClick={() => history.push('/apps')}>
      <img src={logo} alt="logo" />
      <h1>{PRO_TITLE}</h1>
    </a>
  );
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { route, children, location = { pathname: '/' } } = props;

  const pageTitle = getPageTitle(route?.routes || [], location.pathname);
  useDocumentTitle(pageTitle, PRO_TITLE);

  return (
    <>
      <Header className={styles.header}>
        <Logo />
        <AppNavbar />
        <RightContent />
      </Header>
      <Content className={styles.content}>{children}</Content>
    </>
  );
};

export default BasicLayout;
