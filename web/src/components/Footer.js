import React from 'react';
import { BackTop } from 'antd';
import style from './Footer.less';

export default function() {
  return (
    <footer className={style.wrapper}>
      <span>Copyright @2016-2018</span>
      <BackTop visibilityHeight="0"/>
    </footer>
  );
}
