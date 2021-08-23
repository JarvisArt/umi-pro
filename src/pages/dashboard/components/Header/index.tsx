import { useState, useEffect } from 'react';
import { Tabs, Select } from 'antd';
import { ResponseCode } from '@/utils/constants';
import { PeriodType } from '../../data.d';
import type { DashboardGroupDataType } from '../../data.d';
import { queryDashboardGroup } from '../../service';
import styles from './index.less';

const { TabPane } = Tabs;

const periodOptions = [
  {
    label: '最近 7 天',
    value: PeriodType.LastDays7,
  },
  {
    label: '最近 14 天',
    value: PeriodType.LastDays14,
  },
  {
    label: '最近 30 天',
    value: PeriodType.LastDays30,
  },
  {
    label: '最近两个月',
    value: PeriodType.LastDays60,
  },
  {
    label: '最近三个月',
    value: PeriodType.LastDays90,
  },
  {
    label: '本月',
    value: PeriodType.ThisMonth,
  },
  {
    label: '上个月',
    value: PeriodType.LastMonth,
  },
  {
    label: '最近半年',
    value: PeriodType.LastDays180,
  },
  {
    label: '今年',
    value: PeriodType.ThisYear,
  },
];

type HeaderProps = {
  projectId: string;
  groupId: string;
  period: PeriodType;
  changeGroupId: (id: string) => void;
  changePeriodType: (period: PeriodType) => void;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { projectId, groupId, period, changeGroupId, changePeriodType } = props;
  const [groups, setGroups] = useState<DashboardGroupDataType[]>([]);

  useEffect(() => {
    fetchDashboardGroup();
  }, []);

  const fetchDashboardGroup = async () => {
    const { code, data } = await queryDashboardGroup(projectId);
    if (code !== ResponseCode.Success) {
      return;
    }
    setGroups(data);
    changeGroupId(data.filter((group: DashboardGroupDataType) => group.isDefault)[0]?.id);
  };

  return (
    <div className={styles.header}>
      <Tabs className={styles.tabs} activeKey={groupId} onChange={changeGroupId}>
        {groups.map((item) => (
          <TabPane tab={item.name} key={item.id}></TabPane>
        ))}
      </Tabs>
      <div className={styles.right}>
        <span>查询时间</span>
        <Select
          className={styles.select}
          defaultValue={period}
          onChange={changePeriodType}
          options={periodOptions}
        />
      </div>
    </div>
  );
};

export default Header;
