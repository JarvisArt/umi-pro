import { Form, Select, Button } from 'antd';
import { Chart, LineAdvance } from 'bizcharts';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './index.less';

const { Option } = Select;
const ResponsiveGridLayout = WidthProvider(Responsive);

const lineData = [
  { month: 'Jan', temperature: 7 },
  { month: 'Jan', temperature: 3.9 },
  { month: 'Feb', temperature: 13 },
  { month: 'Feb', temperature: 4.2 },
  { month: 'Mar', temperature: 16.5 },
  { month: 'Mar', temperature: 5.7 },
  { month: 'Apr', temperature: 14.5 },
  { month: 'Apr', temperature: 8.5 },
  { month: 'May', temperature: 10 },
  { month: 'May', temperature: 11.9 },
  { month: 'Jun', temperature: 7.5 },
  { month: 'Jun', temperature: 15.2 },
  { month: 'Jul', temperature: 9.2 },
  { month: 'Jul', temperature: 17 },
  { month: 'Aug', temperature: 14.5 },
  { month: 'Aug', temperature: 16.6 },
  { month: 'Sep', temperature: 9.3 },
  { month: 'Sep', temperature: 14.2 },
  { month: 'Oct', temperature: 8.3 },
  { month: 'Oct', temperature: 10.3 },
  { month: 'Nov', temperature: 8.9 },
  { month: 'Nov', temperature: 5.6 },
  { month: 'Dec', temperature: 5.6 },
  { month: 'Dec', city: 'London', temperature: 9.8 },
];

const Board: React.FC = () => {
  const chartLineRender = (
    <div style={{ width: '100%', height: '100%' }}>
      <div className={`${styles.dragHandle} dragHandle`}>手柄</div>
      <div className={styles.chartWrap}>
        <Chart padding={[30, 20, 60, 40]} autoFit data={lineData}>
          <LineAdvance shape="smooth" point area position="month*temperature" color="city" />
        </Chart>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.header}>
        <Form layout="inline">
          <Form.Item label="选择看板">
            <Select value="默认看板" style={{ width: 150 }}>
              <Option value="默认看板">默认看板</Option>
            </Select>
          </Form.Item>
          <Form.Item label="查询时间">
            <Select value="过去七天" style={{ width: 150 }}>
              <Option value="过去七天">过去七天</Option>
            </Select>
          </Form.Item>
        </Form>
        <Button type="primary">保存看板</Button>
      </div>
      <ResponsiveGridLayout
        className={styles.layout}
        rowHeight={70}
        margin={[16, 16]}
        cols={{ lg: 3, md: 3, sm: 3, xs: 3, xxs: 3 }}
        draggableHandle=".dragHandle"
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
      >
        <div key="1" data-grid={{ x: 0, y: 0, w: 1, h: 4 }}>
          {chartLineRender}
        </div>
        <div key="2" data-grid={{ x: 1, y: 0, w: 1, h: 4 }}>
          {chartLineRender}
        </div>
        <div key="3" data-grid={{ x: 2, y: 0, w: 1, h: 4 }}>
          {chartLineRender}
        </div>
      </ResponsiveGridLayout>
    </>
  );
};

export default Board;
