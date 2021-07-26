import { useRef } from 'react';
import { getProjectId } from '@/utils/utils';

function useProjectId(): string {
  const projectIdRef = useRef<string>('');

  if (!projectIdRef.current) {
    projectIdRef.current = getProjectId();
  }

  return projectIdRef.current;
}

export default useProjectId;
