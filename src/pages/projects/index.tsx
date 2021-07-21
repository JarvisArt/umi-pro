import { history } from 'umi';
import { useEffect, useState } from 'react';
import { UserOutlined, PlusOutlined, EllipsisOutlined, DashboardOutlined } from '@ant-design/icons';
import { List, Tooltip, Dropdown, Menu, Input, Modal, message } from 'antd';
import OperationModal from './components/OperationForm';
import { useDebounce } from '@/utils/hooks';
import type { ProjectDataType, ProjectParams } from './data.d';
import { ResponseCode } from '@/utils/constants';
import { queryProject, addProject, updateProject, removeProject } from './service';
import styles from './index.less';

const { Search } = Input;

function fuzzyMatching(keyword: string, value: string) {
  return value ? value.toLowerCase().includes(keyword.toLowerCase()) : false;
}

const Projects: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [projects, setProjects] = useState<ProjectDataType[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<ProjectDataType> | undefined>(undefined);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const changeKeyword = useDebounce((value) => setKeyword(value), 300);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { code, data } = await queryProject();
    setLoading(false);
    if (code !== ResponseCode.Success) {
      return;
    }
    setProjects(data);
  };

  const getProjects = () => {
    return projects.filter(
      (project) =>
        fuzzyMatching(keyword, project.id) ||
        fuzzyMatching(keyword, project.name) ||
        fuzzyMatching(keyword, project.alias),
    );
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

  const handleSubmit = async (values: ProjectParams) => {
    let response = null;
    let successMessage = '';
    setConfirmLoading(true);
    if (current) {
      successMessage = '编辑成功';
      response = await updateProject(current.id as string, values);
    } else {
      successMessage = '添加成功';
      response = await addProject(values);
    }
    setConfirmLoading(false);
    if (response.code !== ResponseCode.Success) {
      return;
    }
    message.success(successMessage);
    fetchProjects();
    handleCancel();
  };

  const handleRemove = (item: ProjectDataType) => {
    Modal.confirm({
      title: '删除项目',
      content: `确定删除 "${item.name}" 吗？`,
      okText: '确认',
      cancelText: '取消',
      maskClosable: true,
      onOk: async () => {
        const { code } = await removeProject(item.id);
        if (code !== ResponseCode.Success) {
          return;
        }
        message.success('删除成功');
        fetchProjects();
      },
    });
  };

  const ellipsisMenu = (item: ProjectDataType) => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      <Menu.Item onClick={() => showEditModal(item)}>编辑</Menu.Item>
      <Menu.Item onClick={() => handleRemove(item)}>删除</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className={styles.addBtn} onClick={showModal}>
        <PlusOutlined />
      </div>
      <div className={styles.search}>
        <Search
          style={{ width: 540 }}
          size="large"
          placeholder="输入项目名称"
          enterButton="搜索"
          onChange={(e) => changeKeyword(e.target.value)}
        />
      </div>
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 20, column: 4, xxl: 5 }}
        style={{ padding: '20px 20px 0' }}
        dataSource={getProjects()}
        renderItem={(item) => (
          <List.Item key={item.id} onClick={() => history.push(`/projects/${item.id}/board`)}>
            <div className={styles.listItem}>
              <p className={styles.name}>{item.name}</p>
              <DashboardOutlined className={styles.dashboardIcon} />
              {item.master && (
                <Tooltip arrowPointAtCenter placement="right" title={`对接人：${item.master}`}>
                  <UserOutlined className={styles.userIcon} />
                </Tooltip>
              )}
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
        loading={confirmLoading}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Projects;
