import React from 'react';
import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import styles from './index.less';

const NoticeIconView = () => {
  return (
    <span className={styles.noticeButton}>
      <Badge count={12} style={{ boxShadow: 'none' }} className={styles.badge}>
        <BellOutlined className={styles.icon} />
      </Badge>
    </span>
  );
};

export default NoticeIconView;
