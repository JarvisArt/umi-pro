import { useEffect, useState, useRef } from 'react';
import { EllipsisOutlined, SyncOutlined, AlertOutlined } from '@ant-design/icons';
import { Empty, Spin, Dropdown, Menu } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DashboardHeader from './components/Header';
import InView from '@/components/InView';
import ChartPanel from './components/ChartPanel';
import { useProjectId } from '@/utils/hooks';
import { ResponseCode } from '@/utils/constants';
import type { DashboardType, DashboardDataType } from './data.d';
import { ChartStatus, PeriodType, RenderType } from './data.d';
import { queryDashboards, queryChartData } from './service';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './index.less';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard: React.FC = () => {
  const projectId = useProjectId();
  const [groupId, setGroupId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboards, setDashboards] = useState<DashboardType[]>([]);
  const period = useRef<PeriodType>(PeriodType.LastDays14);

  useEffect(() => {
    if (groupId) {
      fetchDashboards(groupId);
    } else {
      setLoading(false);
    }
  }, [groupId]);

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
          h: chart.height < 4 ? 4 : chart.height, // 兼容旧版
          w: chart.width,
          minH: 4,
        },
        status: undefined,
        data: undefined,
      })),
    );
  };

  const changePeriodType = (val: PeriodType) => {
    period.current = val;
  };

  const getChartById = (id: string, newData: DashboardType[]) => {
    return newData.filter((item) => item.id === id)[0];
  };

  const fetchChartData = async (chart: DashboardType, refresh?: boolean) => {
    if (!refresh && chart.status !== undefined) {
      return;
    }
    /** 单图数据查询前Loading */
    const newDashboards = [...dashboards];
    const target = getChartById(chart.id, newDashboards);
    target.status = ChartStatus.Loading;
    setDashboards(newDashboards);
    /** 单图数据查询 */
    const { code, data } = await queryChartData(projectId, chart.id, {
      period: period.current,
    });
    /** 单图数据返回异常 */
    if (code !== ResponseCode.Success) {
      target.status = code === ChartStatus.BigQuery ? ChartStatus.BigQuery : ChartStatus.Error;
      setDashboards([...newDashboards]);
      return;
    }
    /** 单图数据返回成功 */
    target.status = ChartStatus.Success;
    target.env = data.chart.env;
    if ([RenderType.CURVE, RenderType.PIE, RenderType.BAR].includes(target.env.renderType)) {
      target.data = data.chartData;
    }
    setDashboards([...newDashboards]);
  };

  const ellipsisMenu = () => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      <Menu.Item>固定时间</Menu.Item>
      <Menu.Item>编辑单图</Menu.Item>
      <Menu.Item>删除单图</Menu.Item>
    </Menu>
  );

  const renderChart = (chart: DashboardType) => {
    if ([RenderType.CURVE, RenderType.PIE, RenderType.BAR].includes(chart.env.renderType)) {
      return <ChartPanel type={chart.env.renderType} data={chart.data as DashboardDataType} />;
    }
    return chart.env.renderType;
  };

  const renderContent = (chart: DashboardType) => {
    switch (chart.status) {
      case ChartStatus.Success:
        return renderChart(chart);
      case ChartStatus.BigQuery:
        return <AlertOutlined className={styles.bigQuery} />;
      case ChartStatus.Error:
        return (
          <SyncOutlined className={styles.refresh} onClick={() => fetchChartData(chart, true)} />
        );
      default:
        return <Spin style={{ margin: 'auto' }} />;
    }
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
        rowHeight={85}
        margin={[16, 16]}
        cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
        draggableHandle=".dragHandle"
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        measureBeforeMount={true}
        onLayoutChange={(currentLayout) => console.log(currentLayout)}
      >
        {dashboards.map((chart, index: number) => (
          <div key={chart.id + index} className={styles.dashboardItem} data-grid={chart.grid}>
            <InView className={styles.chartWrap} onView={() => fetchChartData(chart)}>
              <div className={styles.chartHeader}>
                <div className={`${styles.title} dragHandle`}>{chart.name}</div>
                <Dropdown
                  overlay={() => ellipsisMenu()}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <EllipsisOutlined style={{ fontSize: 20 }} onClick={(e) => e.stopPropagation()} />
                </Dropdown>
              </div>
              {renderContent(chart)}
            </InView>
          </div>
        ))}
      </ResponsiveGridLayout>
    );
  };

  return (
    <div className={styles.dashboard}>
      <DashboardHeader
        projectId={projectId}
        groupId={groupId}
        period={period.current}
        changeGroupId={setGroupId}
        changePeriodType={changePeriodType}
      />
      {renderDashboards()}
    </div>
  );
};

export default Dashboard;
