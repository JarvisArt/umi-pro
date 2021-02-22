import React from 'react';
import { history } from 'umi';
import styles from './index.less';
import { Button } from 'antd';

const Index = () => {
  return (
    <div className={styles.button}>
      <Button type="primary" onClick={() => history.push('/welcome')}>
        Goto Welcome
      </Button>
    </div>
  );
};

export default Index;
