import React, { Component } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};


@connect(({ adminSetting }) => ({ adminSetting }))
@Form.create()
class SettingPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'adminSetting/get' });
  }

  render() {
    const { adminSetting: { data } } = this.props;
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Card bordered={false}>
        <Helmet>
          <title>站点设置 - 管理后台</title>
        </Helmet>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem label="标题" {...formItemLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入站点标题' }],
              initialValue: data['title'],
            })(<Input placeholder="站点标题"/>)}
          </FormItem>

          <FormItem label="关键字" {...formItemLayout} >
            {getFieldDecorator('keywords', {
              rules: [{ required: true, message: '请输入关键字' }],
              initialValue: data['keywords'],
            })(<TextArea placeholder="关键字" rows={2}/>)}
          </FormItem>

          <FormItem label="描述" {...formItemLayout} >
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入描述' }],
              initialValue: data['description'],
            })(<TextArea placeholder="描述" rows={3}/>)}
          </FormItem>

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit">保存</Button>
          </FormItem>
        </Form>
      </Card>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({ type: 'adminSetting/update', payload: values });
      }
    });
  };
}

export default SettingPage;
