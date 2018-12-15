import React, { Component, Fragment } from 'react';
import { Card, Form, Tag } from 'antd';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import StandardTable from '@/components/StandardTable';
import { formatDateTime } from '@/utils/utils';
import router from 'umi/router';

import styles from '../global.less';
import SearchForm from './components/SearchForm';

@connect(({ adminArticle, loading }) => ({
  adminArticle,
  loading: loading.models.adminArticle,
}))
@Form.create()
class ArticlePage extends Component {
  columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '标题', dataIndex: 'title' },
    { title: '创建时间', dataIndex: 'ct', render: formatDateTime },
    { title: '发布时间', dataIndex: 'release_time', render: formatDateTime },
    {
      title: '类型', dataIndex: 'type',
      render: text => (
        <Fragment>
          {text === 1 ? <Tag color="#43bcfe">文章</Tag> : <Tag color="#e7711c">专题</Tag>}
        </Fragment>
      ),
    },
    {
      title: '状态', dataIndex: 'status',
      render: text => (
        <Fragment>
          {text === 1 ? <Tag color="#87d068">发布</Tag> : <Tag color="#34a853">草稿</Tag>}
        </Fragment>
      ),
    },
    { title: '查看次数', dataIndex: 'view_count' },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => router.push({
            pathname: '/admin/article/create',
            query: {
              id: record['id'],
            },
          })}>修改</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'adminArticle/get' });
  }

  render() {
    const { adminArticle: { data }, loading } = this.props;
    return (
      <div>
        <Helmet>
          <title>文章列表 - 管理后台</title>
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
    const { dispatch, adminArticle: { searchData } } = this.props;
    const payload = {
      page: pagination['current'],
      limit: pagination['pageSize'],
      ...searchData,
    };
    dispatch({ type: 'adminArticle/get', payload });
  };
}

export default ArticlePage;
