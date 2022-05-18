import { useState, useMemo } from 'react';
import { Table, Tooltip, Select, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { RetentionDataType, RetentionValue, PeriodType } from '../../data.d';
import { RetainTimeUnit } from '../../data.d';
import { periodOptions } from '../Header';
import { toPercent } from '@/utils/utils';
import styles from './index.less';

type RetainPanelProps = {
  gridH: number | undefined;
  period: PeriodType;
  displayPeriod?: number;
  intervalType?: RetainTimeUnit;
  retentions?: RetentionDataType[];
  changePeriod: (period: PeriodType) => void;
};

const getTimeUnitLabel = (timeUnit: RetainTimeUnit | undefined) => {
  switch (timeUnit) {
    case RetainTimeUnit.DAY:
      return '天';
    case RetainTimeUnit.WEEK:
      return '周';
    case RetainTimeUnit.MONTH:
      return '月';
    default:
      return null;
  }
};

const getTdBackground = (percent: number) => {
  if (percent > 80 && percent <= 100) {
    return '#40a9ff';
  } else if (percent > 60) {
    return '#69c0ff';
  } else if (percent > 40) {
    return '#91d5ff';
  } else if (percent > 20) {
    return '#bae7ff';
  } else {
    return '#e6f7ff';
  }
};

const RetainPanel: React.FC<RetainPanelProps> = (props) => {
  const { gridH, period, intervalType, displayPeriod = 0, retentions, changePeriod } = props;

  const timeUnitLabel = getTimeUnitLabel(intervalType);
  const [current, setCurrent] = useState(false);

  const getColumns = useMemo(() => {
    if (!retentions) {
      return;
    }
    const columns: ColumnsType<any> = [
      {
        title: '日期',
        dataIndex: 'group',
        width: `${100 / (4 + 1)}%`,
        ellipsis: true,
      },
      {
        title: '用户数',
        dataIndex: 'count',
      },
    ];
    for (let i = 0; i <= displayPeriod; i++) {
      const title = i === 0 ? `当${timeUnitLabel}` : `${i}${timeUnitLabel}后`;
      columns.push({
        title,
        dataIndex: `value${i}`,
        render: (value: RetentionValue) => {
          if (!value) {
            return null;
          }

          const percent = toPercent(value.count, value.divisor);
          return (
            <Tooltip title={`${value.count} / ${value.divisor}`}>
              <div className={styles.td} style={{ background: getTdBackground(percent) }}>
                {percent}%
              </div>
            </Tooltip>
          );
        },
      });
    }
    return columns;
  }, [retentions]);

  const getDataSource = useMemo(() => {
    if (!retentions) {
      return [];
    }
    return retentions.map((group) => {
      const dataItem = {
        group: group.group,
        count: group.count,
      };
      group.values.forEach((value, index) => {
        dataItem[`value${index}`] = value;
      });
      return dataItem;
    });
  }, [retentions]);

  const getScroll = useMemo(() => {
    if (gridH) {
      /**
       * grid高度计算公式：
       * Math.round(rowHeight * gridH + Math.max(0, gridH - 1) * margin[1])
       * rowHeight: 90
       * gridH: 4
       * margin: [16, 16]
       */
      const gridHeight = Math.round(90 * gridH + Math.max(0, gridH - 1) * 16);
      return { y: gridHeight - 70 - 47 - 44 };
    } else {
      return undefined;
    }
  }, [gridH]);

  return (
    <div className={styles.retainPanel}>
      <div className={styles.form}>
        <span>显示当{timeUnitLabel}留存：</span>
        <Switch checked={current} onChange={setCurrent} />
        <span style={{ marginLeft: 24 }}>查询时间：</span>
        <Select
          defaultValue={period}
          style={{ width: 140 }}
          placeholder="选择时间"
          options={periodOptions}
          onChange={changePeriod}
        />
      </div>
      <Table
        bordered
        size="middle"
        rowKey="group"
        columns={getColumns?.filter((column: any) => {
          return current ? true : column.dataIndex !== 'value0';
        })}
        dataSource={getDataSource}
        pagination={false}
        scroll={getScroll}
      />
    </div>
  );
};

export default RetainPanel;
