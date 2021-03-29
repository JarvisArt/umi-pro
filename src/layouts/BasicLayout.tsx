import React from 'react';
import { history } from 'umi';
import { Layout } from 'antd';
import RightContent from '@/components/GlobalHeader/RightContent';
import ProjectNavBar from '@/components/GlobalHeader/ProjectNavBar';
import GlobalFooter from '@/components/GlobalFooter';
import { getProjectId } from '@/utils/utils';
import { PRO_TITLE } from '@/utils/constants';
import logo from '@/assets/logo.svg';
import styles from './BasicLayout.less';

const { Header, Content } = Layout;

const Logo: React.FC = () => {
  return (
    <a className={styles.logo} onClick={() => history.push('/projects')}>
      <img src={logo} alt="logo" />
      <h1>{PRO_TITLE}</h1>
    </a>
  );
};

const BasicLayout: React.FC = ({ children }) => {
  const projectId = getProjectId();

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
