import { useEffect, useState } from 'react';
import { DatePicker, Button, Tabs, Empty } from 'antd';
import { Chart, LineAdvance } from 'bizcharts';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './index.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const ResponsiveGridLayout = WidthProvider(Responsive);

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

const renderBoards: React.FC = (boards: any) => {
  if (boards.length === 0) {
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
      {boards.map((board: any, index: number) => (
        <div key={index} className={styles.boardItem} data-grid={board}>
          {chartLineRender}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

const Board: React.FC = () => {
  const [boards, setBoards] = useState<any>([]);

  useEffect(() => {
    setBoards([
      { x: 0, y: 0, w: 1, h: 4 },
      { x: 1, y: 0, w: 1, h: 4 },
      { x: 2, y: 0, w: 1, h: 4 },
    ]);
  }, []);

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <Tabs className={styles.tabs} defaultActiveKey="1">
          <TabPane tab="用户月增长看板" key="1"></TabPane>
          <TabPane tab="年度流水看板" key="2"></TabPane>
          <TabPane tab="总浏览量监控" key="3"></TabPane>
          <TabPane tab="总浏览量监控" key="4"></TabPane>
          <TabPane tab="总浏览量监控" key="5"></TabPane>
        </Tabs>
        <div>
          <RangePicker style={{ width: 240 }} />
          <Button type="primary" style={{ marginLeft: 10 }}>
            保存看板
          </Button>
        </div>
      </div>
      {renderBoards(boards)}
    </div>
  );
};

export default Board;
