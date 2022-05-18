import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { Select } from 'antd';
import Line from '../Charts/Line';
import Pie from '../Charts/Pie';
import Bar from '../Charts/Bar';
import type { DashboardDataType, PeriodType } from '../../data.d';
import { RenderType } from '../../data.d';
import { periodOptions } from '../Header';
import styles from './index.less';

type ChartPanelProps = {
  type: RenderType;
  data?: DashboardDataType;
  period: PeriodType;
  changePeriod: (period: PeriodType) => void;
};

const ChartPanel: React.FC<ChartPanelProps> = (props) => {
  const { type, data = { series: [], xAxis: [] }, period, changePeriod } = props;

  const [group, setGroup] = useState<string[]>(data.series.slice(0, 10).map((t) => t.name));

  const renderChart = () => {
    const chartData = cloneDeep(data);
    chartData.series = chartData.series.filter((item) => group.includes(item.name));
    switch (type) {
      case RenderType.CURVE:
        return <Line data={chartData} />;
      case RenderType.PIE:
        return <Pie data={chartData} />;
      case RenderType.BAR:
        return <Bar data={chartData} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.chartPanel}>
      <div className={styles.form}>
        <Select
          value={group}
          mode="multiple"
          style={{ flex: 1 }}
          placeholder="选择分组"
          maxTagCount="responsive"
          options={data.series.map((item) => ({
            label: item.name,
            value: item.name,
          }))}
          onChange={(value) => setGroup(value)}
        />
        <Select
          defaultValue={period}
          style={{ flex: 1, maxWidth: 140 }}
          placeholder="选择时间"
          options={periodOptions}
          onChange={changePeriod}
        />
      </div>
      {renderChart()}
    </div>
  );
};

export default ChartPanel;
