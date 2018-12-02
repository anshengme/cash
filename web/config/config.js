import pageRoutes from './router.config';

// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'Welcome to ansheng’s blog!',
      dll: true,
      routes: {
        exclude: [],
      },
      hardSource: true,
    }],
  ],
  // 启用hash路由
  history: 'hash',
  // 路由配置
  routes: pageRoutes,
};
