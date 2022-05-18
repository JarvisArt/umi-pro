import { useEffect, useState, useRef } from 'react';
import { EllipsisOutlined, SyncOutlined, AlertOutlined } from '@ant-design/icons';
import { Empty, Spin, Dropdown, Menu } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import DashboardHeader from './components/Header';
import InView from '@/components/InView';
import ChartPanel from './components/ChartPanel';
import RetainPanel from './components/RetainPanel';
import IFrame from './components/IFrame';
import { useProjectId } from '@/utils/hooks';
import { ResponseCode } from '@/utils/constants';
import type { DashboardType } from './data.d';
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
        fixedTime: chart.fixedTime || undefined,
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
    setDashboards([]);
    fetchDashboards(groupId);
  };

  const getChartById = (id: string, newData: DashboardType[]) => {
    return newData.filter((item) => item.id === id)[0];
  };

  const fetchChartData = async (
    chart: DashboardType,
    refresh?: boolean,
    newPeriod?: PeriodType,
  ) => {
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
      period: newPeriod || chart.fixedTime || period.current,
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
    if (newPeriod) {
      target.fixedTime = newPeriod;
    }
    if ([RenderType.CURVE, RenderType.PIE, RenderType.BAR].includes(target.env.renderType)) {
      target.chartData = data.chartData;
    } else if (target.env.renderType === RenderType.GRID) {
      const queryJson = JSON.parse(data.chart.env.queryJson);
      target.displayPeriod = queryJson.displayPeriod;
      target.intervalType = queryJson.intervalType;
      target.retentions = data.retentions;
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

  const changeGrid = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    const newDashboards = [...dashboards];
    const target = getChartById(newItem.i, newDashboards);
    target.grid = {
      i: newItem.i,
      x: newItem.x,
      y: newItem.y,
      w: newItem.w,
      h: newItem.h,
      minH: 4,
    };
    setDashboards(newDashboards);
  };

  const renderChart = (chart: DashboardType) => {
    const { renderType } = chart.env;
    if ([RenderType.CURVE, RenderType.PIE, RenderType.BAR].includes(renderType)) {
      return (
        <ChartPanel
          type={renderType}
          data={chart.chartData}
          period={chart.fixedTime || period.current}
          changePeriod={(value) => fetchChartData(chart, true, value)}
        />
      );
    } else if (renderType === RenderType.GRID) {
      return (
        <RetainPanel
          gridH={chart.grid.h}
          period={chart.fixedTime || period.current}
          displayPeriod={chart.displayPeriod}
          intervalType={chart.intervalType}
          retentions={chart.retentions}
          changePeriod={(value) => fetchChartData(chart, true, value)}
        />
      );
    } else if (renderType === RenderType.IFRAME) {
      return <IFrame url={chart.env.url} />;
    }
    return renderType;
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
          style={{ marginTop: 120 }}
          description={<span style={{ color: '#aaa' }}>请在模型分析中添加单图</span>}
        />
      );
    }
    return (
      <ResponsiveGridLayout
        className={styles.layout}
        rowHeight={90}
        margin={[16, 16]}
        cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
        draggableHandle=".dragHandle"
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        measureBeforeMount={true}
        onDragStop={changeGrid}
        onResizeStop={changeGrid}
      >
        {dashboards.map((chart) => (
          <div key={chart.id} className={styles.dashboardItem} data-grid={chart.grid}>
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
