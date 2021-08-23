import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { GridComponent, TooltipComponent } from 'echarts/components';
import skyBlue from '@/utils/skyBlue';
import type { DashboardDataType } from '../../../data.d';

echarts.registerTheme('skyBlue', skyBlue);
echarts.use([PieChart, TooltipComponent, GridComponent, SVGRenderer]);

type PieProps = {
  data: DashboardDataType;
};

const Pie: React.FC<PieProps> = (props) => {
  const { data } = props;

  const getOption = () => ({
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '60%'],
        data: data.series.map((item) => ({
          value: item.data.reduce((prev, curr) => prev + curr),
          name: item.name,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
    ],
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

export default Pie;
