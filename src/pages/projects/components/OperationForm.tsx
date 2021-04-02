import { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { ProjectDataType } from '../data.d';

interface OperationModalProps {
  visible: boolean;
  current: Partial<ProjectDataType> | undefined;
  onSubmit: (values: ProjectDataType) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 15 },
};

const OperationModal: React.FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { visible, current, onCancel, onSubmit } = props;

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
      });
    }
  }, [current]);

  const handleFinish = (values: ProjectDataType) => {
    onSubmit(values);
  };

  return (
    <Modal
      title={`${current ? '编辑' : '添加'}项目`}
      destroyOnClose
      visible={visible}
      onCancel={onCancel}
      onOk={form.submit}
      afterClose={form.resetFields}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="项目名称"
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="principal"
          label="负责人"
          rules={[{ required: true, message: '请输入负责人' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OperationModal;
