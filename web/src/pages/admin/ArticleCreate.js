import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import React, { PureComponent } from 'react';
import { Button, Card, Col, Form, Icon, Input, Modal, Row, Select, Tabs, Upload } from 'antd';
import { connect } from 'dva';
import styles from './style.less';
import { uploadImage } from '@/services/api';
import { MediaPath } from '@/config';


marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
});

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    sm: { span: 2 },
  },
  wrapperCol: {
    sm: { span: 22 },
  },
};

const selectFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 10 },
  },
};


@connect(({ adminArticleCreate }) => ({ adminArticleCreate }))
@Form.create()
class ArticleCreate extends PureComponent {
  state = {
    previewVisible: false,
    uploadImageVisible: false,
    previewImage: '',
    fileList: [],
    value: '',
    keywords: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'adminArticleCreate/getTags' });
  }


  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { previewVisible, previewImage, fileList, value, output, keywords } = this.state;
    const { tags } = this.props.adminArticleCreate;

    return (
      <Card className={styles.card} bordered={false}>
        <Tabs tabBarExtraContent={
          <div>
            <Button
              type="primary"
              onClick={() => {
                this.setState({ uploadImageVisible: true });
              }}
              icon="upload"
            >
              上传图片
            </Button>
            <Button
              type="primary"
              onClick={this.handleCreateArticle}
              style={{ marginLeft: 10 }}
            >
              提交
            </Button>
          </div>
        }
        >
          <TabPane tab="基本信息" key="1">
            <Form hideRequiredMark>
              <FormItem {...formItemLayout} label="标题">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入标题' }],
                })(
                  <Input placeholder="请输入标题"/>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="URL">
                {getFieldDecorator('url', {
                  rules: [{ required: true, message: '请输入URL' }],
                })(
                  <Input style={{ width: '100%' }} placeholder="请输入URL"/>,
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="摘要">
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: '请输入摘要' }],
                })(
                  <TextArea rows={3} placeholder="请输入摘要"/>,
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="标签">
                {getFieldDecorator('tags', {
                  rules: [{ required: true, message: '请选择标签' }],
                })(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="请选择文章标签"
                    onChange={this.handleTagChange}
                  >
                    {tags.map((tag) =>
                      <Option key={tag['name']}>{tag['name']}</Option>,
                    )}
                  </Select>,
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="关键字">
                {getFieldDecorator('keywords', {
                  rules: [{ required: true, message: '请输入关键字' }],
                  initialValue: keywords,
                })(
                  <Input placeholder="请输入关键字"/>,
                )}
              </FormItem>

              <Row gutter={16}>
                <Col span={6}>
                  <FormItem {...selectFormItemLayout} label="封面图">
                    {getFieldDecorator('img', {})(
                      <Upload
                        name="img"
                        listType="picture"
                        fileList={fileList}
                        disabled={fileList.length === 1}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                      >
                        <Button><Icon type="upload"/></Button>
                      </Upload>,
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...selectFormItemLayout} label="状态">
                    {getFieldDecorator('status', {
                      rules: [{ required: true, message: '请选择状态' }],
                      initialValue: 1,
                    })(
                      <Select style={{ width: '100%' }}>
                        <Option value={1}>发布</Option>
                        <Option value={2}>草稿</Option>
                      </Select>,
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...selectFormItemLayout} label="类型">
                    {getFieldDecorator('type', {
                      rules: [{ required: true, message: '请选择类型' }],
                      initialValue: 1,
                    })(
                      <Select style={{ width: '100%' }}>
                        <Option value={1}>文章</Option>
                        <Option value={2}>专题</Option>
                      </Select>,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="文章内容" key="2">
            <Form hideRequiredMark>
              <FormItem>
                {getFieldDecorator('content', {
                  rules: [{ required: true, message: '请输入' }],
                  initialValue: value,
                })(
                  <TextArea
                    onChange={this.handleChangeContent}
                    placeholder="请输入"
                    autosize={{ minRows: 20 }}
                  />,
                )}
              </FormItem>
            </Form>

          </TabPane>
          <TabPane tab="文章阅览" key="3">
            <div dangerouslySetInnerHTML={{ __html: output }}/>
          </TabPane>
        </Tabs>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img style={{ width: '100%' }} src={previewImage}/>
        </Modal>

        <Modal
          visible={this.state.uploadImageVisible}
          footer={null}
          onCancel={() => {
            this.setState({ uploadImageVisible: false });
          }}
          destroyOnClose={true}
          keyboard={false}
          maskClosable={false}
        >
          <Upload
            name="img"
            listType="picture"
            onPreview={this.handlePreview}
            customRequest={this.handleCustomUploadImage}
          >
            <Button><Icon type="upload"/>上传图片</Button>
          </Upload>
        </Modal>

      </Card>
    );
  }

  handleTagChange = (value) => {
    this.setState({
      keywords: value,
    });
  };

  handleChangeContent = e => {
    this.setState({
      output: marked(e.target.value),
    });
  };

  // 自定义图片上传
  handleCustomUploadImage = fileObj => {
    const { file } = fileObj;
    let formData = new FormData();
    formData.append('img', file);
    uploadImage(formData)
      .then((response) => {
        const { path } = response;
        this.setState({ uploadImageVisible: false });
        Modal.success({
          title: '上传成功',
          content: `${MediaPath + path}`,
        });
      });
  };

  handleCreateArticle = () => {
    const { form: { validateFieldsAndScroll }, dispatch } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        if (values['img']) {
          const { file } = values['img'];
          let formData = new FormData();
          formData.append('img', file['originFileObj']);
          uploadImage(formData)
            .then((response) => {
              const { path } = response;
              const payload = { ...values, img: MediaPath + path, keywords: values.keywords.join() };
              dispatch({
                type: 'adminArticleCreate/create',
                payload,
              });
            });
        } else {
          const payload = { ...values, keywords: values.keywords.join() };
          dispatch({
            type: 'adminArticleCreate/create',
            payload,
          });
        }
      }
    });
  };


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

}

export default ArticleCreate;
