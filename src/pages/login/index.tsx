import { useState } from 'react';
import { history, useModel } from 'umi';
import { Form, Input, Button, message } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import { PRO_TITLE, ResponseCode } from '@/utils/constants';
import { accountLogin } from '@/services/login';
import type { LoginParamsType } from '@/services/login';
import logo from '@/assets/logo.svg';
import styles from './index.less';

const FormItem = Form.Item;

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    const { code } = await accountLogin(values);
    setSubmitting(false);
    if (code !== ResponseCode.Success) {
      return;
    }
    message.success('登录成功！');
    fetchUserInfo();
    history.replace('/');
  };

  return (
    <div className={styles.login}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <span>{PRO_TITLE}</span>
        </div>
        <Form onFinish={handleSubmit}>
          <FormItem name="account" rules={[{ required: true, message: '用户名是必填项' }]}>
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true, message: '密码是必填项' }]}>
            <Input type="password" placeholder="请输入密码" />
          </FormItem>
          <Button type="primary" htmlType="submit" loading={submitting}>
            登录
          </Button>
          <p>
            <span>Account：admin</span>
            <span>Password：ant.design</span>
          </p>
        </Form>
      </div>
      <GlobalFooter />
    </div>
  );
};

export default Login;
