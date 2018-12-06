import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

@connect(({ user }) => ({ user }))
class isAdminRoute extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'user/getUserDetail' });
    const { userDetail } = this.props.user;
    if (userDetail && !userDetail['is_superuser']) {
      router.push('/');
    }
  }

  render() {
    return (
      <Fragment>{this.props.children}</Fragment>
    );
  }
}

export default isAdminRoute;
