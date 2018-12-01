import React, { Fragment } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import style from './BaseLayout.less';

export default function HomeLayout(props) {
  const { children } = props;
  return (
    <Fragment>
      <Header/>
      <div className={style.wrapper}>{children}</div>
      <Footer/>
    </Fragment>
  );
}
