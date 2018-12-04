import React, { Component } from 'react';
import { connect } from 'dva';
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
      <div>
        <Header/>
        <div className={style.wrapper}>{children}</div>
        <Footer/>
      </div>
    );
  }
}

export default HomeLayout;
