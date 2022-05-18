import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
} from 'echarts/components';
import skyBlue from '@/utils/skyBlue';
import type { DashboardDataType } from '../../../data.d';

echarts.registerTheme('skyBlue', skyBlue);
echarts.use([
  LineChart,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  LegendComponent,
  DataZoomComponent,
]);

type LineProps = {
  data: DashboardDataType;
};

const Line: React.FC<LineProps> = (props) => {
  const { data } = props;

  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      confine: true,
    },
    legend: {
      data: data.series.map((item) => item.name),
      type: 'scroll',
      bottom: 0,
    },
    grid: {
      left: 12,
      right: 12,
      bottom: 74,
      top: 20,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    dataZoom: [
      {
        start: 0,
        end: 100,
        handleSize: 28,
        bottom: 34,
      },
    ],
    series: data.series.map((item) => ({
      ...item,
      type: 'line',
      showSymbol: false,
      smooth: true,
    })),
  });

  return (
    <ReactEChartsCore
      style={{ height: '100%' }}
      echarts={echarts}
      option={getOption()}
      notMerge={true}
      lazyUpdate={true}
      opts={{ renderer: 'svg' }}
      theme="skyBlue"
    />
  );
};

export default Line;
