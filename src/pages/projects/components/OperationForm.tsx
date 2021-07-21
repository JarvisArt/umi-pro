import { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import type { ProjectParams } from '../data.d';

type OperationModalProps = {
  visible: boolean;
  loading: boolean;
  current: Partial<ProjectParams> | undefined;
  onSubmit: (values: ProjectParams) => void;
  onCancel: () => void;
};

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const OperationModal: React.FC<OperationModalProps> = (props) => {
  const { visible, current, loading, onCancel, onSubmit } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
      });
    }
  }, [current]);

  const handleFinish = async (values: ProjectParams) => {
    onSubmit(values);
  };

  return (
    <Modal
      title={`${current ? '编辑' : '添加'}项目`}
      destroyOnClose
      visible={visible}
      onCancel={onCancel}
      onOk={form.submit}
      confirmLoading={loading}
      afterClose={form.resetFields}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="项目中文名"
          rules={[{ required: true, message: '请输入项目中文名' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        {!current && (
          <Form.Item
            name="shortName"
            label="项目英文名"
            rules={[{ required: true, message: '请输入项目英文名' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        )}
        <Form.Item name="master" label="项目对接人">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OperationModal;
