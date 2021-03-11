import { useEffect } from 'react';

const useDocumentTitle = (pageTitle: string, proTitle: string) => {
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} - ${proTitle}`;
    } else {
      document.title = proTitle;
    }
  }, [pageTitle]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDocumentTitle;
