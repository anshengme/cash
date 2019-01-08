import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Badge, Button, Card, Form } from 'antd';
import StandardTable from '@/components/StandardTable';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import SearchForm from './components/SearchForm';
import styles from '../global.less';
import { Helmet } from 'react-helmet';


@connect(({ adminTag, loading }) => ({
  adminTag,
  loading: loading.models.adminTag,
}))
@Form.create()
class TagTag extends PureComponent {
  state = {
    // 控制创建标签的modal状态
    createModalVisible: false,
    // 控制更新标签的modal状态
    updateModalVisible: false,
  };

  columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '名称', dataIndex: 'name' },
    { title: '关联文章数量', dataIndex: 'article_count' },
    { title: '创建时间', dataIndex: 'ct' },
    { title: '更新时间', dataIndex: 'ut' },
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
    dispatch({ type: 'adminTag/get' });
  }

  render() {
    const { adminTag: { data }, loading } = this.props;
    const { createModalVisible, updateModalVisible } = this.state;

    // 创建
    const parentMethods = {
      handleCreateTag: this.handleCreateTag,
      handleChangeModalVisible: this.handleChangeModalVisible,
    };

    // 更新
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <div>
        <Helmet>
          <title>标签管理 - 管理后台</title>
        </Helmet>
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
  handleCreateTag = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminTag/create',
      payload: fields,
      callback: () => {
        this.handleChangeModalVisible();
      },
    });
  };

  /*
  * 修改更新连接ModalVisible的状态
  * */
  handleUpdateModalVisible = (flag, tagDetail = {}) => {
    const { dispatch } = this.props;
    console.log(tagDetail);
    dispatch({ type: 'adminTag/setState', payload: { tagDetail } });
    this.setState({ updateModalVisible: !!flag });
  };

  /*
  * 更新友情链接
  * */
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminTag/update',
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
    const { dispatch, adminTag: { searchData } } = this.props;
    const payload = {
      page: pagination['current'],
      limit: pagination['pageSize'],
      ...searchData,
    };
    dispatch({ type: 'adminTag/get', payload });
  };
}

export default TagTag;
