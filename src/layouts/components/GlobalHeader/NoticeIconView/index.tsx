import { Badge } from 'antd';
import styles from './index.less';

export type NoticeIconProps = {
  children?: React.ReactElement;
};

const NoticeIconView: React.FC<NoticeIconProps> = (props) => {
  const { children } = props;

  return (
    <span className={styles.noticeButton}>
      <Badge count={12} offset={[-8, 12]} style={{ boxShadow: 'none' }}>
        {children}
      </Badge>
    </span>
  );
};

export default NoticeIconView;
