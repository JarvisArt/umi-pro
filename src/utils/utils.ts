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
    const replicaItem = JSON.parse(JSON.stringify(item));
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
