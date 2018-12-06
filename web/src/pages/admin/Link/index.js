import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Button,
  Modal,
  message,
  Badge,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import { formatDateTime } from '@/utils/utils';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import styles from './index.less';


const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


/* eslint react/no-multi-comp:0 */
@connect(({ adminLink, loading }) => ({
  adminLink,
  loading: loading.models.adminLink,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    // 控制创建友情链接的modal状态
    createModalVisible: false,
    // 控制更新友情链接的modal状态
    updateModalVisible: false,
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '名称',
      dataIndex: 'name',
    }, {
      title: '网址',
      dataIndex: 'url',
    }, {
      title: '创建时间',
      dataIndex: 'ct',
      render: formatDateTime,
    }, {
      title: '更新时间',
      dataIndex: 'ut',
      render: formatDateTime,
    }, {
      title: '状态',
      dataIndex: 'is_del',
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
    dispatch({ type: 'adminLink/getLinks' });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };


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
    dispatch({ type: 'adminLink/create', payload: fields });
    message.success('添加成功');
    this.handleChangeModalVisible();
  };

  /*
  * 修改更新连接ModalVisible的状态
  * */
  handleUpdateModalVisible = flag => {
    this.setState({
      updateModalVisible: !!flag,
    });
  };

  /*
  * 更新友情链接
  * */
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminLink/update',
      payload: fields,
    });
    message.success('更修改成功');
    this.handleUpdateModalVisible();
  };
}

export default TableList;
