import React from 'react';
import { history } from 'umi';
import styles from './index.less';
import { Button, Input } from 'antd';

const Index = () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button type="primary" onClick={() => history.push('/welcome')}>
        Goto Welcome
      </Button>
      <Input style={{ width: 200, marginLeft: 20 }} placeholder="Basic usage" />
    </div>
  );
};

export default Index;
