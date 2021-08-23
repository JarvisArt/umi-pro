import { Select } from 'antd';
import Line from '../Charts/Line';
import Pie from '../Charts/Pie';
import Bar from '../Charts/Bar';
import type { DashboardDataType } from '../../data.d';
import { RenderType } from '../../data.d';
import styles from './index.less';

const { Option } = Select;

type ChartPanelProps = {
  type: RenderType;
  data: DashboardDataType;
};

const ChartPanel: React.FC<ChartPanelProps> = (props) => {
  const { type, data } = props;

  const renderChart = () => {
    switch (type) {
      case RenderType.CURVE:
        return <Line data={data} />;
      case RenderType.PIE:
        return <Pie data={data} />;
      case RenderType.BAR:
        return <Bar data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.chartPanel}>
      <div className={styles.form}>
        <Select mode="multiple" style={{ flex: 1 }} placeholder="选择分组" maxTagCount="responsive">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Select style={{ flex: 1, maxWidth: 140 }} placeholder="选择时间">
          <Option value="7">最近7天</Option>
          <Option value="14">最近14天</Option>
          <Option value="30">最近30天</Option>
        </Select>
      </div>
      {renderChart()}
    </div>
  );
};

export default ChartPanel;
