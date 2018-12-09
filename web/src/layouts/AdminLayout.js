import { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import SiderMenu from '../components/SiderMenu/SiderMenu';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.svg';
import GlobalHeader from '../components/GlobalHeader';
import AdminFooter from '../components/AdminFooter';

const { Content, Header } = Layout;

export default class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;
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
                logo={logo}
                collapsed={collapsed}
                currentUser={{
                  name: 'Serati Ma',
                  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                  userid: '00000001',
                  notifyCount: 12,
                }}
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
}