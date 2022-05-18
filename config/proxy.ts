/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://v2.umijs.org/zh/guide/deploy.html
 */
export default {
  '/api': {
    target: 'http://friday.test.seewo.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
