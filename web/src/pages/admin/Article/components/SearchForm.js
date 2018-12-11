import React, { Component } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { connect } from 'dva';
import styles from '../../global.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ adminArticle }) => ({ adminArticle }))
@Form.create()
class SearchForm extends Component {
  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form onSubmit={this.handleSearchSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="搜索">
              {getFieldDecorator('search')(<Input placeholder="标题"/>)}
            </FormItem>
          </Col>

          <Col md={6} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('type')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={1}>文章</Option>
                  <Option value={2}>专题</Option>
                </Select>,
              )}
            </FormItem>
          </Col>

          <Col md={6} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value={1}>发布</Option>
                  <Option value={2}>草稿</Option>
                </Select>,
              )}
            </FormItem>
          </Col>

          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleSearchFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 搜索
  handleSearchSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({ type: 'adminArticle/setState', payload: { searchData: fieldsValue } });
      dispatch({ type: 'adminArticle/get', payload: fieldsValue });
    });
  };

  // 重置搜索
  handleSearchFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({ type: 'adminArticle/setState', payload: { searchData: {} } });
    dispatch({ type: 'adminArticle/get', payload: {} });
  };
}

export default SearchForm;
