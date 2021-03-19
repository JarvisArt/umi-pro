import {
  SettingOutlined,
  DotChartOutlined,
  LineChartOutlined,
  CaretDownOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import styles from './index.less';

const ProjectNavBar: React.FC = () => {
  const envMenu = (
    <Menu>
      <Menu.Item>蚂蚁金服</Menu.Item>
      <Menu.Item>蚂蚁金服（开发）</Menu.Item>
      <Menu.Item>蚂蚁金服（测试）</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.main}>
      <div className={styles.divider}></div>
      <Dropdown overlay={envMenu} placement="bottomCenter">
        <div className={styles.projectName}>
          <span>蚂蚁金服（测试）</span>
          <CaretDownOutlined className={styles.caretDownIcon} />
        </div>
      </Dropdown>
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

export default ProjectNavBar;
