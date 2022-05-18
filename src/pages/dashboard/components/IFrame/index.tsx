import styles from './index.less';

type IFrameProps = {
  url?: string;
};

const IFrame: React.FC<IFrameProps> = (props) => {
  return <iframe src={props.url} className={styles.iframe} />;
};

export default IFrame;
