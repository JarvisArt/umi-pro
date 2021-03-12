import {
  SettingOutlined,
  DotChartOutlined,
  LineChartOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import styles from './index.less';

const AppNavBar: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.divider}></div>
      <div className={styles.appName}>蚂蚁金服（测试）</div>
      <Menu mode="horizontal" theme="dark">
        <Menu.Item key="overview" icon={<DotChartOutlined />}>
          概览
        </Menu.Item>
        <Menu.Item key="board" icon={<FundProjectionScreenOutlined />}>
          看板
        </Menu.Item>
        <Menu.Item key="analysis" icon={<LineChartOutlined />}>
          分析
        </Menu.Item>
        <Menu.Item key="setting" icon={<SettingOutlined />}>
          设置
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AppNavBar;
