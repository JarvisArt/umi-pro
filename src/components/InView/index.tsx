import useInView from 'react-cool-inview';

export type InViewProps = {
  className?: string;
  onView: () => void;
};

const InView: React.FC<InViewProps> = (props) => {
  const { children, className, onView } = props;
  const { observe } = useInView<HTMLDivElement>({
    onEnter: () => onView(),
  });

  return (
    <div ref={observe} className={className}>
      {children}
    </div>
  );
};

export default InView;
