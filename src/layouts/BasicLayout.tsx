import React from 'react';
import { history } from 'umi';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider, Layout } from 'antd';
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

const renderGlobalFooter = (): React.ReactNode => {
  if (window.location.pathname.match(/\/analysis/)) {
    return null;
  }
  return <GlobalFooter />;
};

const BasicLayout: React.FC = (props) => {
  const projectId = getProjectId();

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={styles.basicLayout}>
        <Header>
          <Logo />
          {projectId && <ProjectNavBar />}
          <RightContent />
        </Header>
        <Content className={styles.content}>{props.children}</Content>
        {renderGlobalFooter()}
      </Layout>
    </ConfigProvider>
  );
};

export default BasicLayout;
