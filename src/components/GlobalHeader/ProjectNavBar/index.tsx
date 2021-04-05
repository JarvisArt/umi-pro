import {
  SettingOutlined,
  DotChartOutlined,
  LineChartOutlined,
  CaretDownOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { history, useLocation } from 'umi';
import { Menu, Dropdown } from 'antd';
import { parsePathParam } from '@/utils/utils';
import styles from './index.less';

const modules = [
  {
    key: 'overview',
    path: '/overview',
    name: '概览',
    icon: <DotChartOutlined />,
  },
  {
    key: 'board',
    path: '/board',
    name: '看板',
    icon: <FundProjectionScreenOutlined />,
  },
  {
    key: 'analysis',
    path: '/analysis/event-analysis',
    name: '分析',
    icon: <LineChartOutlined />,
  },
  {
    key: 'setting',
    path: '/setting',
    name: '设置',
    icon: <SettingOutlined />,
  },
];

const ProjectNavBar: React.FC = () => {
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>('');

  useEffect(() => {
    setSelectedKey(parsePathParam(pathname, 'projects\\/[^/]*') || '');
  }, [pathname]);

  const onMenuClick = (event: { key: React.Key }) => {
    if (selectedKey === event.key) {
      return;
    }
    const path = modules.find((module) => module.key === event.key)?.path;
    history.push(`/projects/hgeksha${path}`);
  };

  const appMenu = (
    <Menu>
      <Menu.Item>蚂蚁金服</Menu.Item>
      <Menu.Item>蚂蚁金服（开发）</Menu.Item>
      <Menu.Item>蚂蚁金服（测试）</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.main}>
      <div className={styles.divider}></div>
      <Dropdown overlay={appMenu} placement="bottomCenter">
        <div className={styles.projectName}>
          <span>蚂蚁金服（测试）</span>
          <CaretDownOutlined className={styles.caretDownIcon} />
        </div>
      </Dropdown>
      <Menu mode="horizontal" theme="dark" selectedKeys={[selectedKey]} onClick={onMenuClick}>
        {modules.map((module) => (
          <Menu.Item key={module.key} icon={module.icon}>
            {module.name}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default ProjectNavBar;
