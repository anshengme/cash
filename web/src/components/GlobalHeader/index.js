import React, { PureComponent } from 'react';
import { Avatar, Divider, Dropdown, Icon, Menu, Spin, Tooltip } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import Link from 'umi/link';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }


  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const {
      currentUser = {},
      collapsed,
      isMobile,
      logo,
      onMenuClick,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item>
          <Link to="/admin/setting/"><Icon type="setting"/>站点设置</Link>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout">
          <Icon type="logout"/>退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32"/>
          </Link>,
          <Divider type="vertical" key="line"/>,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          <Tooltip title="使用文档">
            <a
              target="_blank"
              href="https://github.com/anshengme/cash"
              rel="noopener noreferrer"
              className={styles.action}
            >
              <Icon type="question-circle-o"/>
            </a>
          </Tooltip>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar}/>
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }}/>
          )}
        </div>
      </div>
    );
  }
}
