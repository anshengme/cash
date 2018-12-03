export default [
  {
    path: '/admin/',
    component: '../layouts/AdminLayout',
    routes: [
      { path: '/admin', component: './admin/Dashboard' },
      { path: '/admin/article/create', component: './admin/ArticleCreate' },
      { path: '/admin/article', component: './admin/Article' },
      { path: '/admin/comment', component: './admin/Comment' },
      { path: '/admin/link', component: './admin/Link' },
      { path: '/admin/user', component: './admin/User' },
      { path: '/admin/setting', component: './admin/Setting' },
    ],
  }, {
    path: '/',
    component: '../layouts/BaseLayout',
    routes: [
      { path: '/', component: './index' },
      { path: '/article/:id', component: './ArticleDetail' },
      { path: '/archive/', component: './Archive' },
    ],
  },
];
