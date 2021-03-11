import {
  UserOutlined,
  PlusOutlined,
  SearchOutlined,
  EllipsisOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { List, Tooltip, Dropdown, Menu, Input, Button } from 'antd';
import styles from './index.less';

const list = [
  { id: 1, name: 'Alipay' },
  { id: 2, name: 'Angular' },
  { id: 3, name: 'Ant Design' },
  { id: 4, name: 'Ant Design Pro' },
  { id: 5, name: 'Bootstrap' },
  { id: 6, name: 'React' },
  { id: 7, name: 'Vue' },
  { id: 8, name: 'Webpack' },
  { id: 9, name: 'Webpack' },
  { id: 10, name: 'Webpack' },
  { id: 11, name: 'Alipay' },
  { id: 12, name: 'Angular' },
  { id: 13, name: 'Ant Design' },
  { id: 14, name: 'Ant Design Pro' },
  { id: 15, name: 'Bootstrap' },
  { id: 16, name: 'React' },
  { id: 17, name: 'Vue' },
  { id: 18, name: 'Webpack' },
  { id: 19, name: 'Webpack' },
  { id: 20, name: 'Webpack' },
  { id: 21, name: 'Webpack' },
  { id: 22, name: 'Webpack' },
  { id: 23, name: 'Alipay' },
  { id: 24, name: 'Angular' },
];

const Apps = () => {
  const ellipsisMenu = (
    <Menu>
      <Menu.Item>编辑</Menu.Item>
      <Menu.Item>删除</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className={styles.header}>
        <h3 className={styles.title}>我的项目(1)</h3>
        <Input placeholder="输入项目名称" className={styles.search} suffix={<SearchOutlined />} />
        <Button type="primary">
          <PlusOutlined /> 新建
        </Button>
      </div>
      <List
        rowKey="id"
        grid={{ gutter: 20, column: 4, xxl: 5 }}
        style={{ padding: '20px 20px 0' }}
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <div className={styles.listItem}>
              <span>{item.name}</span>
              <DashboardOutlined className={styles.appIcon} />
              <Tooltip arrowPointAtCenter placement="right" title="项目对接人：Admin">
                <UserOutlined className={styles.userIcon} />
              </Tooltip>
              <Dropdown overlay={ellipsisMenu} trigger={['click']}>
                <EllipsisOutlined className={styles.ellipsisIcon} />
              </Dropdown>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default Apps;
