import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Badge, Button, Card, Form } from 'antd';
import StandardTable from '@/components/StandardTable';
import { formatDateTime } from '@/utils/utils';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import SearchForm from './components/SearchForm';
import styles from '../global.less';


@connect(({ adminLink, loading }) => ({
  adminLink,
  loading: loading.models.adminLink,
}))
@Form.create()
class LinkPage extends PureComponent {
  state = {
    // 控制创建友情链接的modal状态
    createModalVisible: false,
    // 控制更新友情链接的modal状态
    updateModalVisible: false,
  };

  columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '名称', dataIndex: 'name' },
    { title: '网址', dataIndex: 'url' },
    { title: '创建时间', dataIndex: 'ct', render: formatDateTime },
    { title: '更新时间', dataIndex: 'ut', render: formatDateTime },
    {
      title: '状态', dataIndex: 'is_del',
      render: text => (
        <Fragment>
          {text ? <Badge status="error" text="已删除"/> : <Badge status="success" text="展示中"/>}
        </Fragment>
      ),
    }, {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'adminLink/get' });
  }

  render() {
    const { adminLink: { data }, loading } = this.props;
    const { createModalVisible, updateModalVisible } = this.state;

    // 创建
    const parentMethods = {
      handleCreateLink: this.handleCreateLink,
      handleChangeModalVisible: this.handleChangeModalVisible,
    };

    // 更新
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableListForm}>
            <SearchForm/>
          </div>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleChangeModalVisible(true)}
              >
                新建
              </Button>
            </div>
            <StandardTable
              loading={loading}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} createModalVisible={createModalVisible}/>
        <UpdateForm{...updateMethods} updateModalVisible={updateModalVisible}/>
      </div>
    );
  }

  /*
  * 修改创建连接ModalVisible的状态
  * */
  handleChangeModalVisible = flag => {
    this.setState({
      createModalVisible: !!flag,
    });
  };

  /*
  * 创建友情链接
  * */
  handleCreateLink = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminLink/create',
      payload: fields,
      callback: () => {
        this.handleChangeModalVisible();
      },
    });
  };

  /*
  * 修改更新连接ModalVisible的状态
  * */
  handleUpdateModalVisible = (flag, linkDetail = {}) => {
    const { dispatch } = this.props;
    dispatch({ type: 'adminLink/setState', payload: { linkDetail } });
    this.setState({ updateModalVisible: !!flag });
  };

  /*
  * 更新友情链接
  * */
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminLink/update',
      payload: fields,
      callback: () => {
        this.handleUpdateModalVisible();
      },
    });
  };

  /*
  * 分页
  * */
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, adminLink: { searchData } } = this.props;
    const payload = {
      page: pagination['current'],
      limit: pagination['pageSize'],
      ...searchData,
    };
    dispatch({ type: 'adminLink/get', payload });
  };
}

export default LinkPage;
