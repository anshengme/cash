import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ adminLink }) => ({ adminLink }))
@Form.create()
class UpdateForm extends Component {
  render() {
    const { updateModalVisible, form, handleUpdateModalVisible } = this.props;
    const { linkDetail: { is_del, url, name } } = this.props.adminLink;
    return (
      <Modal
        destroyOnClose
        title="更新"
        visible={updateModalVisible}
        onOk={this.okHandle}
        onCancel={() => handleUpdateModalVisible()}
        okText="创建"
        cancelText="取消"
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '名称' }],
            initialValue: name,
          })(<Input placeholder="名称"/>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="URL">
          {form.getFieldDecorator('url', {
            initialValue: url,
            rules: [{ required: true, message: 'URL' }],
          })(<Input placeholder="URL"/>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
          {form.getFieldDecorator('is_del', {
            initialValue: is_del ? 1 : 0,
            rules: [{ required: true, message: '状态' }],
          })(
            <Select style={{ width: 120 }}>
              <Option value={0}>展示中</Option>
              <Option value={1}>删除</Option>
            </Select>,
          )}
        </FormItem>
      </Modal>
    );
  }

  okHandle = () => {
    const { form, handleUpdate } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate(fieldsValue);
    });
  };
}

export default UpdateForm;
