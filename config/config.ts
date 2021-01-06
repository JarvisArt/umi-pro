// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  proxy,
  routes,
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {},
  fastRefresh: {},
});
