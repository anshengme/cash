import React, { Component, Fragment } from 'react';
import { Button, Col, Comment, Divider, Form, Icon, Input, List, Row, Modal } from 'antd';
import { connect } from 'dva';
import styles from './ArticleDetail.less';
import indexStyles from './index.less';
import Link from 'umi/link';
import { formatDate, formatDateTime } from '@/utils/utils';

const { TextArea } = Input;

const IconText = ({ type, text, theme }) => (
  <span>
    <Icon type={type} theme={theme} style={{ marginRight: 8 }}/>
    {text}
  </span>
);

// 评论
const CommentItem = ({ comment, handleReplyComment }) => {
  return <Comment
    actions={[<span onClick={() => handleReplyComment(comment)}>回复</span>]}
    author={comment['account']['nick_name']}
    avatar={`/media/${comment['account']['avatar']}`}
    content={comment['content']}
    datetime={formatDateTime(comment['ct'])}
  >
    {
      comment['children'] && comment['children'].length > 0 ?
        comment['children'].map((comment) =>
          <CommentItem handleReplyComment={handleReplyComment} key={comment['id']} comment={comment}/>,
        ) :
        <Fragment/>
    }
  </Comment>;
};

// 评论列表
const CommentList = ({ comments, handleReplyComment }) => (
  <List
    dataSource={comments}
    header={`${comments.length} 评论`}
    itemLayout="horizontal"
    renderItem={props => <CommentItem handleReplyComment={handleReplyComment} key={props['id']} comment={props}/>}
  />
);

// 评论框
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value}/>
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        添加评论
      </Button>
    </Form.Item>
  </div>
);


@connect(({ articleDetail }) => ({ articleDetail }))
class ArticleDetailPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const url = match.params.url;
    dispatch({ type: 'articleDetail/get', payload: url });
    dispatch({ type: 'articleDetail/getComments', payload: url });
  }

  state = {
    submitting: false,
    commentContent: '',
    replyCommentContent: '',
    replyCommentisible: false,
    comment: {},
  };

  render() {
    const { article, comments } = this.props.articleDetail;
    const { submitting, commentContent, replyCommentContent } = this.state;

    return (
      <Row gutter={8}>
        <Col span={17}>
          <div className={styles.detail}>
            <h1 className={styles.title}>{article['title']}</h1>
            <div className={styles.articleFooter}>
              <span>{formatDate(article['release_time'])}</span>
              <span className={indexStyles.dot}/>
              <IconText type="eye" theme="filled" text={article['view_count']}/>
              <span className={indexStyles.dot}/>
              <a href="#comment"><IconText type="message" theme="filled" text={article['comment_count']}/></a>
              {
                article.tags ?
                  <Fragment>
                    <span className={indexStyles.dot}/>
                    {article.tags.map((tag) =>
                      <Link
                        className={indexStyles.tagLink}
                        key={tag}
                        to={`/tag/${tag}`}>
                        {tag}
                      </Link>,
                    )}
                  </Fragment>
                  :
                  <Fragment/>
              }
            </div>
            <Divider/>
            <div>
              {article['content']}
            </div>
          </div>

          <div id="comment" className={styles.comment}>
            {
              comments.length > 0 && <CommentList
                handleReplyComment={this.handleReplyComment}
                comments={comments}
              />
            }
            <Comment
              content={(
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={commentContent}
                />
              )}
            />
            <Modal
              closable={false}
              visible={this.state.replyCommentisible}
              onOk={this.handleSubmitReplyComment}
              onCancel={() => this.handleReplyComment({})}
            >
              <TextArea rows={4} onChange={this.handleReplyCommentChange} value={replyCommentContent}/>
            </Modal>
          </div>
        </Col>
      </Row>
    );
  }

  handleSubmit = () => {
    if (!this.state.commentContent) {
      return;
    }
    const { dispatch } = this.props;
    this.setState({ submitting: true });
    dispatch({
      type: 'articleDetail/createComment',
      payload: {
        content: this.state.commentContent,
      },
      callback: () => {
        this.setState({ submitting: false, commentContent: '' });
      },
    });
  };

  handleChange = e => {
    this.setState({ commentContent: e.target.value });
  };

  handleReplyComment = comment => {
    this.setState({
      replyCommentisible: !this.state.replyCommentisible,
      comment,
    });
  };

  handleReplyCommentChange = e => {
    this.setState({ replyCommentContent: e.target.value });
  };

  handleSubmitReplyComment = () => {
    if (!this.state.replyCommentContent) {
      return;
    }
    const { dispatch } = this.props;
    this.setState({ submitting: true });
    dispatch({
      type: 'articleDetail/createComment',
      payload: {
        reply: this.state.comment.id,
        content: this.state.replyCommentContent,
      },
      callback: () => {
        this.setState({ replyCommentisible: false, replyCommentContent: '', comment: '' });
      },
    });
  };
}

export default ArticleDetailPage;
