import { UserOutlined, PlusOutlined, EllipsisOutlined, DashboardOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { useEffect, useState } from 'react';
import { List, Tooltip, Dropdown, Menu, Input } from 'antd';
import OperationModal from './components/OperationForm';
import type { ProjectDataType } from './data.d';
import { queryProject } from './service';
import styles from './index.less';

const { Search } = Input;

const Projects: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectDataType[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<ProjectDataType> | undefined>(undefined);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const response = await queryProject();
    setProjects(response);
    setLoading(false);
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: ProjectDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values: ProjectDataType) => {
    console.log(values);
  };

  const ellipsisMenu = (item: ProjectDataType) => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      <Menu.Item onClick={() => showEditModal(item)}>编辑</Menu.Item>
      <Menu.Item>删除</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className={styles.addBtn} onClick={showModal}>
        <PlusOutlined />
      </div>
      <div className={styles.search}>
        <Search style={{ width: 450 }} size="large" placeholder="输入项目名称" enterButton="搜索" />
      </div>
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 20, column: 4, xxl: 5 }}
        style={{ padding: '20px 20px 0' }}
        dataSource={projects}
        renderItem={(item) => (
          <List.Item key={item.id} onClick={() => history.push(`/projects/${item.id}/board`)}>
            <div className={styles.listItem}>
              <span>{item.name}</span>
              <DashboardOutlined className={styles.dashboardIcon} />
              <Tooltip arrowPointAtCenter placement="right" title={`负责人：${item.principal}`}>
                <UserOutlined className={styles.userIcon} />
              </Tooltip>
              <Dropdown overlay={() => ellipsisMenu(item)} trigger={['click']}>
                <EllipsisOutlined
                  className={styles.ellipsisIcon}
                  onClick={(e) => e.stopPropagation()}
                />
              </Dropdown>
            </div>
          </List.Item>
        )}
      />
      <OperationModal
        current={current}
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Projects;
