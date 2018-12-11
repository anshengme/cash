import { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { connect } from 'dva';
import SiderMenu from '../components/SiderMenu/SiderMenu';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.svg';
import GlobalHeader from '../components/GlobalHeader';
import AdminFooter from '../components/AdminFooter';

const { Content, Header } = Layout;

@connect(({ user }) => ({ user }))
class BasicLayout extends Component {
  state = {
    collapsed: false,
  };

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;
    const { userDetail } = this.props.user;
    return (
      <LocaleProvider locale={zh_CN}>
        <Layout>
          <SiderMenu
            logo={logo}
            collapsed={collapsed}
            menuData={getMenuData()}
            location={location}
            onCollapse={this.handleMenuCollapse}
          />
          <Layout>
            <Header style={{ padding: 0 }}>
              <GlobalHeader
                logOut={this.handleLogout}
                logo={logo}
                collapsed={collapsed}
                currentUser={userDetail ? userDetail : {}}
                onCollapse={this.handleMenuCollapse}
              />
            </Header>
            <Content style={{ margin: '24px 24px 0', height: '100%' }}>
              {children}
            </Content>
            <AdminFooter/>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }

  // 退出登录
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/logout' });
  };
}

export default BasicLayout;
