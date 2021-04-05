import { Skeleton } from 'antd';

const EventAnalysis: React.FC = () => {
  return (
    <div style={{ margin: 20, padding: 20, background: '#fff' }}>
      <Skeleton paragraph={{ rows: 8 }} />
    </div>
  );
};

export default EventAnalysis;
