/**
 * 从路径获取参数
 * @param {string} pathname 路径
 * @param {string} param 参数
 * @return {string}
 */
export const parsePathParam = (pathname: string, param: string): string => {
  const regExp = new RegExp(`\\/${param}\\/([^/]*)($|\\/)`);
  const match = regExp.exec(pathname);
  return match ? match[1] : '';
};

/**
 * 从路径名称获取projectId
 */
export const getProjectId = (): string => {
  return parsePathParam(window.location.pathname, 'projects');
};
