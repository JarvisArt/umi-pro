import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import skyBlue from '@/utils/skyBlue';
import type { DashboardDataType } from '../../../data.d';

echarts.registerTheme('skyBlue', skyBlue);
echarts.use([BarChart, TooltipComponent, GridComponent, SVGRenderer, LegendComponent]);

type BarProps = {
  data: DashboardDataType;
};

const Bar: React.FC<BarProps> = (props) => {
  const { data } = props;

  const getBarOption = () => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: data.xAxis,
      type: 'scroll',
      bottom: 0,
      itemWidth: 8,
      itemHeight: 8,
    },
    grid: {
      left: 12,
      right: 12,
      bottom: 33,
      top: 20,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.series.map((item) => item.name),
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    series: data.xAxis.map((item, index) => ({
      type: 'bar',
      name: item,
      data: data.series.map((t) => t.data[index]),
    })),
  });

  return (
    <ReactEChartsCore
      style={{ height: '100%' }}
      echarts={echarts}
      option={getBarOption()}
      notMerge={true}
      lazyUpdate={true}
      opts={{ renderer: 'svg' }}
      theme="skyBlue"
    />
  );
};

export default Bar;
