import { useEffect } from 'react';
import { useLocation } from 'umi';

const useScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
};

export default useScrollToTop;
