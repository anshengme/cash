export default [
  {
    path: '/',
    component: '../layouts/BaseLayout',
    routes: [
      { path: '/', component: './index' },
      { path: '/article/:id', component: './ArticleDetail' },
    ],
  },
];
