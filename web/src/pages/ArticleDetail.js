import React, { Component, Fragment } from 'react';
import { Avatar, Button, Col, Divider, Icon, Input, Row } from 'antd';
import { connect } from 'dva';
import styles from './ArticleDetail.less';
import indexStyles from './index.less';
import Link from 'umi/link';
import { formatDate } from '@/utils/utils';

const { TextArea } = Input;

const IconText = ({ type, text, theme }) => (
  <span>
    <Icon type={type} theme={theme} style={{ marginRight: 8 }}/>
    {text}
  </span>
);

@connect(({ articleDetail }) => ({ articleDetail }))
class ArticleDetailPage extends Component {

  componentDidMount() {
    const { dispatch, match } = this.props;
    const url = match.params.url;
    dispatch({ type: 'articleDetail/get', payload: url });
  }

  render() {
    const { article } = this.props.articleDetail;
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
            <h2>评论</h2>
            <TextArea autosize={{ minRows: 2 }}/>
            <Button type="primary">提交评论</Button>
            <Divider/>
            <ul>
              <li>
                <Row gutter={6}>
                  <Col span={2}><Avatar size="large">一</Avatar></Col>
                  <Col span={22}>
                    <div className={styles.comment_nick_name}>一叶知秋</div>
                    <div className={styles.comment_content}>这里是评论的内容内容</div>
                    <div className={styles.comment_date_time}>2018-11-30 11:28:06</div>
                  </Col>
                </Row>
                <Divider/>
              </li>
              <li>
                <Row gutter={6}>
                  <Col span={2}><Avatar size="large">叶</Avatar></Col>
                  <Col span={22}>
                    <div className={styles.comment_nick_name}>一叶知秋</div>
                    <div className={styles.comment_content}>这里是评论的内容内容</div>
                    <div className={styles.comment_date_time}>2018-11-30 11:28:06</div>
                  </Col>
                </Row>
                <Divider/>
              </li>
              <li>
                <Row gutter={6}>
                  <Col span={2}><Avatar size="large">知</Avatar></Col>
                  <Col span={22}>
                    <div className={styles.comment_nick_name}>一叶知秋</div>
                    <div className={styles.comment_content}>这里是评论的内容内容</div>
                    <div className={styles.comment_date_time}>2018-11-30 11:28:06</div>
                  </Col>
                </Row>
                <Divider/>
              </li>
              <li>
                <Row gutter={6}>
                  <Col span={2}><Avatar size="large">秋</Avatar></Col>
                  <Col span={22}>
                    <div className={styles.comment_nick_name}>一叶知秋</div>
                    <div className={styles.comment_content}>这里是评论的内容内容</div>
                    <div className={styles.comment_date_time}>2018-11-30 11:28:06</div>
                  </Col>
                </Row>
              </li>
            </ul>
          </div>
        </Col>
        <Col span={7}/>
      </Row>
    );
  }
}

export default ArticleDetailPage;
