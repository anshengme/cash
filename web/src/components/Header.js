import md5 from 'md5';
import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Form, Icon, Input, Modal } from 'antd';

import styles from './Header.less';

const FormItem = Form.Item;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
@Form.create()
class Header extends Component {
  state = { isShowLoginOrRegisterModal: false, email: '', password: '' };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <header className={styles.wrapper}>
        <div className={styles.content}>
          <ul className={styles.left}>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/archive">归档</Link></li>
          </ul>

          <ul className={styles.right}>
            <li>
              <a href="#" onClick={this.changeIsShowLoginOrRegisterModal}>登录</a>
            </li>
            <li className={styles.register}>
              <a href="#" onClick={this.changeIsShowLoginOrRegisterModal}>注册</a>
            </li>
          </ul>
        </div>

        <Modal
          title="登录 or 注册（未注册用户将自动创建）"
          visible={this.state.isShowLoginOrRegisterModal}
          okText="登录"
          cancelText="取消"
          onOk={this.handleLoginOrRegisterSubmit}
          onCancel={this.changeIsShowLoginOrRegisterModal}
          maskClosable={false}
        >
          <Form>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入邮箱' }],
                initialValue: this.state.email,
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                  placeholder="Email"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
                initialValue: this.state.password,
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </header>
    )
      ;
  }

  // 更改是否显示登录框的状态
  changeIsShowLoginOrRegisterModal = () => {
    this.setState((prevState, props) => ({
      isShowLoginOrRegisterModal: !prevState.isShowLoginOrRegisterModal,
    }));
  };

  // 登录
  handleLoginOrRegisterSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'login/login',
          payload: { ...values, password: md5(values.password) },
        });
      }
    });
  };
}

export default Header;
