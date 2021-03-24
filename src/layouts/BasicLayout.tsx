import React from 'react';
import { history } from 'umi';
import { Layout } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import ProjectNavBar from '@/components/GlobalHeader/ProjectNavBar';
import GlobalFooter from '@/components/GlobalFooter';
import type { Route, RouterTypes } from '../typings';
import { getPageTitle, getProjectId } from '@/utils/utils';
import { PRO_TITLE } from '@/utils/constants';
import { useDocumentTitle, useScrollToTop } from '@/utils/hooks';
import logo from '@/assets/logo.svg';
import styles from './BasicLayout.less';

const { Header, Content } = Layout;

export type BasicLayoutProps = Partial<RouterTypes<Route>>;

const Logo: React.FC = () => {
  return (
    <a className={styles.logo} onClick={() => history.push('/projects')}>
      <img src={logo} alt="logo" />
      <h1>{PRO_TITLE}</h1>
    </a>
  );
};

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { route, children, location = { pathname: '/' } } = props;

  const projectId = getProjectId();
  const pageTitle = getPageTitle(route?.routes || [], location.pathname);
  useDocumentTitle(pageTitle, PRO_TITLE);
  useScrollToTop();

  return (
    <Layout className={styles.basicLayout}>
      <Header>
        <Logo />
        {projectId && <ProjectNavBar />}
        <RightContent />
      </Header>
      <Content className={styles.content}>{children}</Content>
      <GlobalFooter />
    </Layout>
  );
};

export default BasicLayout;
