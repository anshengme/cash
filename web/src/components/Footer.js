import React from 'react';
import { BackTop } from 'antd';
import style from './Footer.less';

export default function() {
  let nowDate = new Date();
  return (
    <footer className={style.wrapper}>
      <span>Copyright @2016-{nowDate.getFullYear()}</span>
      <BackTop visibilityHeight="0"/>
    </footer>
  );
}
