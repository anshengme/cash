import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Alert, Col, Icon, Row } from 'antd';
import Link from 'umi/link';
import style from './index.less';


const IconText = ({ type, text, theme }) => (
  <span>
    <Icon type={type} theme={theme} style={{ marginRight: 8 }}/>
    {text}
  </span>
);


@connect(({ tagDetail }) => ({ tagDetail }))
class tagDetailPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const name = match.params.name;
    dispatch({ type: 'tagDetail/get', payload: name });
  }

  render() {
    const { articles } = this.props.tagDetail;
    const { match } = this.props;
    const name = match.params.name;
    return (
      <Row gutter={8}>
        <Col span={17}>
          <div className={style.left}>
            <Alert
              style={{ marginBottom: 20 }}
              message={`标签 {${name}} 关联了 {${articles.length}} 篇文章`}
              type="success"
            />
            {
              articles.map((article) =>
                <div className={style.articleList} key={article.url}>
                  <Row>
                    {
                      (article.img === null) || !article.img ? <Fragment/> :
                        <Col span={6}>
                          <img className={style.articleImg}
                               src={`/media/${article.img}`} alt=""/>
                        </Col>
                    }
                    <Col span={article.img ? 18 : 24}>
                      <div className={style.articleContent}>
                        <h2 className={style.articleTitle}>
                          <Link to={`/article/${article.url}`}>{article.title}</Link>
                        </h2>
                        <div className={style.articleDesc}>
                          {article.description}
                        </div>
                        <div className={style.articleFooter}>
                          <span>{article['release_time']}</span>
                          <span className={style.dot}/>
                          <IconText type="eye" theme="filled" text={article['view_count']}/>
                          <span className={style.dot}/>
                          <IconText type="message" theme="filled" text={article['comment_count']}/>
                          {
                            article.tags ?
                              <Fragment>
                                <span className={style.dot}/>
                                {article.tags.map((tag) =>
                                  <Link
                                    className={style.tagLink}
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
                      </div>
                    </Col>
                  </Row>
                </div>,
              )
            }
          </div>
        </Col>
      </Row>
    );
  }
}

export default tagDetailPage;
