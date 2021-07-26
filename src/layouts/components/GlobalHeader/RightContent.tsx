import {
  TeamOutlined,
  BellOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import Avatar from './AvatarDropdown';
import NoticeIconView from './NoticeIconView';
import classNames from 'classnames';
import styles from './index.less';

const GlobalHeaderRight: React.SFC = () => {
  return (
    <div className={styles.right}>
      <Tooltip title="我的项目" className={styles.action}>
        <AppstoreOutlined />
      </Tooltip>
      <Tooltip title="管理中心" className={styles.action}>
        <TeamOutlined />
      </Tooltip>
      <Tooltip title="使用文档">
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <NoticeIconView>
        <BellOutlined className={classNames(styles.action, styles.noticeIcon)} />
      </NoticeIconView>
      <Avatar />
    </div>
  );
};

export default GlobalHeaderRight;
