import { Layout } from 'antd';
import { GithubOutlined, CopyrightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './index.less';

const { Footer } = Layout;

const defaultLinks = [
  {
    key: 'Ant Design Pro',
    title: 'Ant Design Pro',
    href: 'https://pro.ant.design',
    blankTarget: true,
  },
  {
    key: 'github',
    title: <GithubOutlined />,
    href: 'https://github.com/ant-design/ant-design-pro',
    blankTarget: true,
  },
  {
    key: 'Ant Design',
    title: 'Ant Design',
    href: 'https://ant.design',
    blankTarget: true,
  },
];

const GlobalFooter: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Footer className={classNames(className, styles.footer)}>
      <div className={styles.links}>
        {defaultLinks.map((link) => (
          <a
            key={link.key}
            title={link.key}
            target={link.blankTarget ? '_blank' : '_self'}
            href={link.href}
          >
            {link.title}
          </a>
        ))}
      </div>
      <div className={styles.copyright}>
        Copyright <CopyrightOutlined /> 2021 蚂蚁金服体验技术部出品
      </div>
    </Footer>
  );
};

export default GlobalFooter;
