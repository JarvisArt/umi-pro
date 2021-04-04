import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SendOutlined,
  FunnelPlotOutlined,
  InboxOutlined,
  GroupOutlined,
  ForkOutlined,
  BoxPlotOutlined,
  ShareAltOutlined,
  LaptopOutlined,
  UnorderedListOutlined,
  ControlOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Layout, Menu, Skeleton } from 'antd';
import styles from './index.less';

const { Sider, Content } = Layout;

const Analysis: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleClick = (e: any) => {
    console.log('click ', e);
  };

  return (
    <div className={styles.analysis}>
      <div
        style={{
          width: collapsed ? 48 : 208,
          transition: 'width 0.2s',
        }}
      />
      <Sider
        theme="light"
        collapsible
        width={collapsed ? 48 : 208}
        collapsedWidth={48}
        trigger={null}
        collapsed={collapsed}
        className={styles.sider}
      >
        <div className={styles.menu}>
          <Menu mode="inline" onClick={handleClick}>
            <Menu.Item key="1" icon={<SendOutlined />}>
              事件分析
            </Menu.Item>
            <Menu.Item key="2" icon={<FunnelPlotOutlined />}>
              漏斗分析
            </Menu.Item>
            <Menu.Item key="3" icon={<InboxOutlined />}>
              留存分析
            </Menu.Item>
            <Menu.Item key="4" icon={<GroupOutlined />}>
              LTV 分析
            </Menu.Item>
            <Menu.Item key="5" icon={<ForkOutlined />}>
              用户路径
            </Menu.Item>
            <Menu.Item key="6" icon={<BoxPlotOutlined />}>
              间隔分析
            </Menu.Item>
            <Menu.Item key="7" icon={<ShareAltOutlined />}>
              归因分析
            </Menu.Item>
            <Menu.Item key="8" icon={<UnorderedListOutlined />}>
              属性分析
            </Menu.Item>
            <Menu.Item key="9" icon={<ControlOutlined />}>
              自定义查询
            </Menu.Item>
            <Menu.Item key="10" icon={<LaptopOutlined />}>
              网页热力分析
            </Menu.Item>
          </Menu>
        </div>
        <div className={styles.collapsedButton} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </Sider>
      <Content>
        <div style={{ margin: 20, padding: 20, background: '#fff' }}>
          <Skeleton />
          <Skeleton />
        </div>
      </Content>
    </div>
  );
};

export default Analysis;
