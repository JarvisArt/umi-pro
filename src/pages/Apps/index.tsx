import React from 'react';
import { List } from 'antd';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
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
  return (
    <div className={styles.appWrap}>
      <List
        rowKey="id"
        grid={{
          gutter: 20,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <div className={styles.listItem}>
              <DashboardOutlined className={styles.appIcon} style={{ color: '#fff' }} />
              <span>{item.name}</span>
              <UserOutlined className={styles.userIcon} style={{ color: '#fff' }} />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Apps;
