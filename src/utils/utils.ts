import { cloneDeep } from 'lodash';
import type { MenuDataItem } from '../typings';

/**
 * 树形结构数据扁平化
 * @param  {any[]} list 树形结构数据
 * @param  {string} childKey 子集Key
 * @return {array}
 */
export const flattenTheTree = (list: any[], childKey: string): any[] => {
  let result = [] as any[];
  list.forEach((item) => {
    const replicaItem = cloneDeep(item);
    delete replicaItem[childKey];
    result.push(replicaItem);
    if (item[childKey] instanceof Array && item[childKey].length > 0) {
      result = result.concat(flattenTheTree(item[childKey], childKey));
    }
  });
  return result;
};

/**
 * 获取页面标题
 * @param  {MenuDataItem[]} routes 全部路由信息
 * @param  {string} pathname  当前路径名称
 * @return {string}
 */
export const getPageTitle = (routes: MenuDataItem[], pathname?: string): string => {
  const flatteList = flattenTheTree(routes, 'routes');
  return flatteList.find((route) => route.path === pathname)?.title;
};

/**
 * 从路径获取参数
 * @param {string} pathname 路径
 * @param {string} param 参数
 * @return {string}
 */
export const parsePathParam = (pathname: string, param: string): string => {
  const regExp = new RegExp(`\\/${param}\\/(\\w+)($|\\/)`);
  const match = regExp.exec(pathname);
  return match ? match[1] : '';
};

/**
 * 从路径名称获取projectId
 */
export const getProjectId = (): string => {
  return parsePathParam(window.location.pathname, 'projects');
};
