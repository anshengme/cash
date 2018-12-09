/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

const menuData = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: '/admin/',
  }, {
    name: '文章管理',
    icon: 'bars',
    path: '/admin/article/',
    children: [
      {
        name: '创建文章',
        path: 'create',
      }, {
        name: '文章列表',
        path: '/',
      },
    ],
  }, {
    name: '评论管理',
    icon: 'message',
    path: '/admin/comment/',
  }, {
    name: '标签管理',
    icon: 'tag',
    path: '/admin/tag/',
  }, {
    name: '友情链接',
    icon: 'link',
    path: '/admin/link/',
  }, {
    name: '用户管理',
    icon: 'user',
    path: '/admin/user/',
  }, {
    name: '站点设置',
    icon: 'setting',
    path: '/admin/setting/',
  }, {
    name: '返回首页',
    icon: 'rollback',
    path: '/',
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
