import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Badge, Modal, Card, Form } from 'antd';
import { Helmet } from 'react-helmet';
import StandardTable from '@/components/StandardTable';
import SearchForm from './components/SearchForm';
import styles from '../global.less';


@connect(({ adminUser, loading }) => ({
  adminUser,
  loading: loading.models.adminUser,
}))
@Form.create()
class UserPage extends PureComponent {

  columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '昵称', dataIndex: 'nick_name' },
    { title: '上次登录时间', dataIndex: 'last_login' },
    { title: '加入时间', dataIndex: 'date_joined' },
    {
      title: '是否激活', dataIndex: 'is_active',
      render: text => (
        <Fragment>
          {text ? <Badge status="success" text="激活"/> : <Badge status="error" text="黑名单"/>}
        </Fragment>
      ),
    }, {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleChangeUserStatus(record)}>修改</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'adminUser/get' });
  }

  render() {
    const { adminUser: { data }, loading } = this.props;

    return (
      <div>
        <Helmet>
          <title>用户管理 - 管理后台</title>
        </Helmet>
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <SearchForm/>
          </div>
          <div className={styles.tableList}>
            <StandardTable
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </div>
    );
  }

  /*
  * 分页
  * */
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, adminUser: { searchData } } = this.props;
    const payload = {
      page: pagination['current'],
      limit: pagination['pageSize'],
      ...searchData,
    };
    dispatch({ type: 'adminUser/get', payload });
  };

  /*
  * 更改用户状态
  * */
  handleChangeUserStatus = record => {
    const title = record['is_active'] ? '是否把该用户拉入黑名单?' : '是否激活该用户?';
    const { dispatch } = this.props;
    Modal.confirm({
      title,
      onOk() {
        dispatch({
          type: 'adminUser/update',
          payload: { is_active: record['is_active'] ? 0 : 1 },
          id: record['id'],
        });
      },
    });
  };
}

export default UserPage;
