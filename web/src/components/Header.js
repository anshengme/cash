import React from 'react';
import Link from 'umi/link';
import style from './Header.less';

export default function() {
  return (
    <header className={style.wrapper}>
      <div className={style.content}>
        <ul className={style.left}>
          <li>
            <Link to="/">首页</Link>
          </li>
        </ul>

        <ul className={style.right}>
          <li>
            <Link to="#">登录</Link>
          </li>
          <li className={style.register}>
            <Link to="#">注册</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
