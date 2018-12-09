import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;


const CreateForm = Form.create()(props => {
  const { createModalVisible, form, handleCreateTag, handleChangeModalVisible } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleCreateTag(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新建标签"
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
    </Modal>
  );
});

export default CreateForm;
