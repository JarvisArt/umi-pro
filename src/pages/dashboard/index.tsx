import { useEffect, useState } from 'react';
import { Tabs, Empty, Select } from 'antd';
import { Chart, LineAdvance } from 'bizcharts';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useProjectId } from '@/utils/hooks';
import { ResponseCode } from '@/utils/constants';
import type { DashboardGroupDataType } from './data.d';
import { queryDashboardGroup } from './service';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './index.less';

const { TabPane } = Tabs;
const { Option } = Select;
const ResponsiveGridLayout = WidthProvider(Responsive);

const periodOptions = [
  { label: '最近 7 天', value: 'last_days_7' },
  { label: '最近 14 天', value: 'last_days_14' },
  { label: '最近 30 天', value: 'last_days_30' },
  { label: '最近两个月', value: 'last_days_60' },
  { label: '最近三个月', value: 'last_days_90' },
  { label: '本月', value: 'this_month' },
  { label: '上个月', value: 'last_month' },
  { label: '最近半年', value: 'last_days_180' },
  { label: '今年', value: 'this_year' },
];

const lineData = [
  { month: 'Jan', city: 'Tokyo', temperature: 7 },
  { month: 'Jan', city: 'London', temperature: 3.9 },
  { month: 'Feb', city: 'Tokyo', temperature: 13 },
  { month: 'Feb', city: 'London', temperature: 4.2 },
  { month: 'Mar', city: 'Tokyo', temperature: 16.5 },
  { month: 'Mar', city: 'London', temperature: 5.7 },
  { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
  { month: 'Apr', city: 'London', temperature: 8.5 },
  { month: 'May', city: 'Tokyo', temperature: 10 },
  { month: 'May', city: 'London', temperature: 11.9 },
  { month: 'Jun', city: 'Tokyo', temperature: 7.5 },
  { month: 'Jun', city: 'London', temperature: 15.2 },
  { month: 'Jul', city: 'Tokyo', temperature: 9.2 },
  { month: 'Jul', city: 'London', temperature: 17 },
  { month: 'Aug', city: 'Tokyo', temperature: 14.5 },
  { month: 'Aug', city: 'London', temperature: 16.6 },
  { month: 'Sep', city: 'Tokyo', temperature: 9.3 },
  { month: 'Sep', city: 'London', temperature: 14.2 },
  { month: 'Oct', city: 'Tokyo', temperature: 8.3 },
  { month: 'Oct', city: 'London', temperature: 10.3 },
  { month: 'Nov', city: 'Tokyo', temperature: 8.9 },
  { month: 'Nov', city: 'London', temperature: 5.6 },
  { month: 'Dec', city: 'Tokyo', temperature: 5.6 },
  { month: 'Dec', city: 'London', temperature: 9.8 },
];

const chartLineRender = (
  <div style={{ width: '100%', height: '100%' }}>
    <div className={`${styles.dragHandle} dragHandle`}>{/* 用户增长数 */}</div>
    <div className={styles.chartWrap}>
      <Chart padding={[30, 20, 60, 40]} autoFit data={lineData}>
        <LineAdvance shape="smooth" point area position="month*temperature" color="city" />
      </Chart>
    </div>
  </div>
);

const renderDashboards: React.FC = (dashboards: any) => {
  if (dashboards.length === 0) {
    return (
      <Empty
        style={{ marginTop: 60 }}
        description={<span style={{ color: '#aaa' }}>暂无看板</span>}
      />
    );
  }
  return (
    <ResponsiveGridLayout
      className={styles.layout}
      rowHeight={70}
      margin={[16, 16]}
      cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
      draggableHandle=".dragHandle"
      resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
    >
      {dashboards.map((dashboard: any, index: number) => (
        <div key={index} className={styles.dashboardItem} data-grid={dashboard}>
          {chartLineRender}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

const Dashboard: React.FC = () => {
  const projectId = useProjectId();
  const [groups, setGroups] = useState<DashboardGroupDataType[]>([]);
  const [groupId, setGroupId] = useState<string>('');
  const [dashboards, setDashboards] = useState<any>([]);

  useEffect(() => {
    fetchDashboardGroup();
    setDashboards([
      { x: 0, y: 0, w: 1, h: 4 },
      { x: 1, y: 0, w: 1, h: 4 },
      { x: 2, y: 0, w: 1, h: 4 },
    ]);
  }, []);

  const fetchDashboardGroup = async () => {
    const { code, data } = await queryDashboardGroup(projectId);
    if (code !== ResponseCode.Success) {
      return;
    }
    setGroups(data);
    setGroupId(data.filter((group: DashboardGroupDataType) => group.isDefault)[0]?.id);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <Tabs className={styles.tabs} activeKey={groupId} onChange={(id) => setGroupId(id)}>
          {groups.map((item) => (
            <TabPane tab={item.name} key={item.id}></TabPane>
          ))}
        </Tabs>
        <div>
          <Select defaultValue="last_days_7" style={{ width: 140 }}>
            {periodOptions.map((item) => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
          {/* <Button type="primary" style={{ marginLeft: 10 }}>
            保存看板
          </Button> */}
        </div>
      </div>
      {renderDashboards(dashboards)}
    </div>
  );
};

export default Dashboard;
