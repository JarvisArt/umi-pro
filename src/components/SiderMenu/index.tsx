import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { Layout, Menu } from 'antd';
import { parsePathParam } from '@/utils/utils';
import styles from './index.less';

const { Sider } = Layout;

export type LinkItemType = {
  path: string;
  name: string;
  icon: React.ReactNode;
};

export type SiderMenuProps = {
  module: string;
  links: LinkItemType[];
  onItemClick?: (link: LinkItemType) => void;
};

const SiderMenu: React.FC<SiderMenuProps> = (props) => {
  const { module, links, onItemClick } = props;

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>('');
  const { pathname } = useLocation();

  useEffect(() => {
    setSelectedKey(`/${parsePathParam(pathname, module)}`);
  }, [pathname]);

  return (
    <div className={styles.siderMenu}>
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
          <Menu mode="inline" selectedKeys={[selectedKey]}>
            {links.map((link) => (
              <Menu.Item
                key={link.path}
                icon={link.icon}
                onClick={() => onItemClick && onItemClick(link)}
              >
                {link.name}
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className={styles.collapsedButton} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </Sider>
    </div>
  );
};

export default SiderMenu;
