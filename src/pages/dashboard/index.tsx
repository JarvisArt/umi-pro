import { useEffect, useState } from 'react';
import { Tabs, Empty, Select, Spin } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import InView from '@/components/InView';
import { useProjectId } from '@/utils/hooks';
import { ResponseCode } from '@/utils/constants';
import { queryDashboardGroup, queryDashboards } from './service';
import type { DashboardGroupDataType, DashboardDataType } from './data.d';
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

const Dashboard: React.FC = () => {
  const projectId = useProjectId();
  const [groups, setGroups] = useState<DashboardGroupDataType[]>([]);
  const [groupId, setGroupId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboards, setDashboards] = useState<DashboardDataType[]>([]);

  useEffect(() => {
    fetchDashboardGroup();
  }, []);

  useEffect(() => {
    if (groupId) {
      fetchDashboards(groupId);
    } else {
      setLoading(false);
    }
  }, [groupId]);

  const fetchDashboardGroup = async () => {
    const { code, data } = await queryDashboardGroup(projectId);
    if (code !== ResponseCode.Success) {
      return;
    }
    setGroups(data);
    setGroupId(data.filter((group: DashboardGroupDataType) => group.isDefault)[0]?.id);
  };

  const fetchDashboards = async (id: string) => {
    setLoading(true);
    const { code, data } = await queryDashboards(projectId, id);
    setLoading(false);
    if (code !== ResponseCode.Success) {
      return;
    }
    setDashboards(
      data.charts.map((chart: any) => ({
        id: chart.chartId,
        name: chart.chartName,
        grid: {
          x: chart.left - 1 < 0 ? 0 : chart.left - 1, // 兼容旧版
          y: chart.top - 1 < 0 ? 0 : chart.top - 1, // 兼容旧版
          w: chart.width,
          h: chart.height < 4 ? 4 : chart.height, // 兼容旧版
          minH: 4,
        },
      })),
    );
  };

  const renderDashboards = () => {
    if (loading) {
      return (
        <div className={styles.loading}>
          <Spin />
        </div>
      );
    }
    if (dashboards.length === 0) {
      return (
        <Empty
          style={{ marginTop: 60 }}
          description={<span style={{ color: '#aaa' }}>请在模型分析中添加单图</span>}
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
        measureBeforeMount={true}
        onLayoutChange={(currentLayout) => console.log(currentLayout)}
      >
        {dashboards.map((chart, index: number) => (
          <div key={chart.id + index} className={styles.dashboardItem} data-grid={chart.grid}>
            <InView data={chart} onView={(data) => console.log(data)}>
              <div className={`${styles.dragHandle} dragHandle`}>{chart.name}</div>
            </InView>
          </div>
        ))}
      </ResponsiveGridLayout>
    );
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
        </div>
      </div>
      {renderDashboards()}
    </div>
  );
};

export default Dashboard;
