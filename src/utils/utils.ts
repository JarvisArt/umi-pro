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

/**
 * 从路径获取参数
 * @param {number} num1 分子
 * @param {number} num2 分母
 * @param {number} precision 精度
 * @return {number} 百分比
 */
export const toPercent = (num1: number, num2: number, precision = 2) => {
  if (!num1 || !num2) {
    return 0;
  }
  return Number(((num1 / num2) * 100).toFixed(precision));
};
