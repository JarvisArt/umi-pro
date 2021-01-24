import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const GlobalHeaderRight: React.SFC = () => {
  return (
    <div>
      <Tooltip title="使用文档">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <Avatar />
    </div>
  );
};

export default GlobalHeaderRight;
