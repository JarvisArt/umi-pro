import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, AppstoreOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Sider, Content } = Layout;

const Analysis: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleClick = (e: any) => {
    console.log('click ', e);
  };

  return (
    <div className={styles.analysis}>
      <Sider
        theme="light"
        collapsible
        width={208}
        trigger={null}
        collapsed={collapsed}
        className={styles.sider}
      >
        <Menu onClick={handleClick} selectedKeys={[]} openKeys={[]} mode="inline">
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />}>
            Option 3
          </Menu.Item>
          <Menu.Item key="4" icon={<AppstoreOutlined />}>
            Option 4
          </Menu.Item>
          <Menu.Item key="5" icon={<AppstoreOutlined />}>
            Option 5
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            Option 6
          </Menu.Item>
          <Menu.Item key="7" icon={<AppstoreOutlined />}>
            Option 7
          </Menu.Item>
          <Menu.Item key="8" icon={<AppstoreOutlined />}>
            Option 8
          </Menu.Item>
          <Menu.Item key="9" icon={<AppstoreOutlined />}>
            Option 9
          </Menu.Item>
          <Menu.Item key="10" icon={<AppstoreOutlined />}>
            Option 10
          </Menu.Item>
          <Menu.Item title={false} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>事件分析</Content>
    </div>
  );
};

export default Analysis;
