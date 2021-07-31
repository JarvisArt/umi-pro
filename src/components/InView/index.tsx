import useInView from 'react-cool-inview';

export type InViewProps = {
  data: any;
  onView: (data: any) => void;
};

const InView: React.FC<InViewProps> = (props) => {
  const { children, data, onView } = props;
  const { observe } = useInView<HTMLDivElement>({
    threshold: 0.5,
    onEnter: () => onView(data),
  });

  return <div ref={observe}>{children}</div>;
};

export default InView;
