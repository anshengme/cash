import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;


const CreateForm = Form.create()(props => {
  const { createModalVisible, form, handleCreateLink, handleChangeModalVisible } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleCreateLink(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新建友情链接"
      visible={createModalVisible}
      onOk={okHandle}
      onCancel={() => handleChangeModalVisible()}
      okText="创建"
      cancelText="取消"
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '名称' }],
        })(<Input placeholder="名称"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="URL">
        {form.getFieldDecorator('url', {
          rules: [{ required: true, message: 'URL' }],
        })(<Input placeholder="URL"/>)}
      </FormItem>
    </Modal>
  );
});

export default CreateForm;
