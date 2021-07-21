import { history } from 'umi';
import PageLoading from '@/components/PageLoading';
import { PRO_TITLE } from '@/utils/constants';
import { queryCurrent } from './services/user';

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const { data } = await queryCurrent();
      return data;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
    };
  }
  return {
    fetchUserInfo,
  };
}

/**
 * 在初始加载和路由切换时
 */
export function onRouteChange({ matchedRoutes }: any) {
  // 回到顶部
  const el = document.scrollingElement || document.documentElement;
  if (el.scrollTop !== 0) {
    el.scrollTop = 0;
  }
  // 设置标题
  if (matchedRoutes.length) {
    const title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
    document.title = title ? `${title} - ${PRO_TITLE}` : PRO_TITLE;
  }
}
