import {
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
import { history } from 'umi';
import SiderMenu from '@/components/SiderMenu';
import type { LinkItemType } from '@/components/SiderMenu';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './index.less';

const links = [
  {
    path: '/event-analysis',
    name: '事件分析',
    icon: <SendOutlined />,
  },
  {
    path: '/event-analysis-01',
    name: '漏斗分析',
    icon: <FunnelPlotOutlined />,
  },
  {
    path: '/event-analysis-02',
    name: '留存分析',
    icon: <InboxOutlined />,
  },
  {
    path: '/event-analysis-03',
    name: 'LTV 分析',
    icon: <GroupOutlined />,
  },
  {
    path: '/event-analysis-04',
    name: '用户路径',
    icon: <ForkOutlined />,
  },
  {
    path: '/event-analysis-05',
    name: '间隔分析',
    icon: <BoxPlotOutlined />,
  },
  {
    path: '/event-analysis-06',
    name: '归因分析',
    icon: <ShareAltOutlined />,
  },
  {
    path: '/event-analysis-07',
    name: '属性分析',
    icon: <UnorderedListOutlined />,
  },
  {
    path: '/event-analysis-08',
    name: '自定义查询',
    icon: <ControlOutlined />,
  },
  {
    path: '/event-analysis-09',
    name: '网页热力分析',
    icon: <LaptopOutlined />,
  },
];

const Analysis: React.FC = (props) => {
  const handleClick = (link: LinkItemType) => {
    history.push(`/projects/hgeksha/analysis${link.path}`);
  };

  return (
    <div className={styles.analysis}>
      <SiderMenu module="analysis" links={links} onItemClick={handleClick} />
      <div className={styles.content}>
        {props.children}
        <GlobalFooter />
      </div>
    </div>
  );
};

export default Analysis;
