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
import { useProjectId } from '@/utils/hooks';
import { parsePathParam } from '@/utils/utils';
import { ResponseCode } from '@/utils/constants';
import { queryApps } from './service';
import styles from './index.less';

type AppGroupDataType = {
  id: string;
  appId: string;
  name: string;
};

const modules = [
  {
    key: 'overview',
    path: '/overview',
    name: '概览',
    icon: <DotChartOutlined />,
  },
  {
    key: 'dashboard',
    path: '/dashboard',
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
  const projectId = useProjectId();
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [apps, setApps] = useState<AppGroupDataType[]>([]);
  const [appId, setAppId] = useState<string>('');

  useEffect(() => {
    fetchApps();
  }, []);

  useEffect(() => {
    setSelectedKey(parsePathParam(pathname, 'projects\\/[^/]*') || '');
  }, [pathname]);

  const fetchApps = async () => {
    const { code, data } = await queryApps(projectId);
    if (code !== ResponseCode.Success) {
      return;
    }
    setApps(data);
    setAppId(data[0].id);
  };

  const getAppName = () => {
    return apps.find((app) => app.id === appId)?.name;
  };

  const changeAppId = (id: string) => {
    setAppId(id);
  };

  const onMenuClick = (event: { key: React.Key }) => {
    if (selectedKey === event.key) {
      return;
    }
    const path = modules.find((module) => module.key === event.key)?.path;
    history.push(`/projects/${projectId}${path}`);
  };

  const appMenu = (
    <Menu>
      {apps.map((app) => (
        <Menu.Item key={app.id} onClick={() => changeAppId(app.id)}>
          {app.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={styles.main}>
      <div className={styles.divider}></div>
      <Dropdown
        overlay={appMenu}
        placement="bottomCenter"
        disabled={['dashboard', 'setting'].includes(selectedKey)}
      >
        <div className={styles.projectName}>
          <span>{getAppName()}</span>
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
