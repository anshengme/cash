import React, { Component } from 'react';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import style from './BaseLayout.less';

@connect(({ user }) => ({ user }))
class HomeLayout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getUserDetail',
    });
  }

  render() {
    const { children } = this.props;
    return (
      <LocaleProvider locale={zh_CN}>
        <div>
          <Header/>
          <div className={style.wrapper}>{children}</div>
          <Footer/>
        </div>
      </LocaleProvider>
    );
  }
}

export default HomeLayout;
