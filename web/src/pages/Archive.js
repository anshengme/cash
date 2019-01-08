import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Col, Row } from 'antd';
import styles from './Archive.less';
import { Helmet } from 'react-helmet';

@connect(({ archive }) => ({ archive }))
class ArchivePage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'archive/getArchive' });
  }

  render() {
    const { data } = this.props.archive;
    return (
      <Row gutter={8}>
        <Helmet>
          <title>归档 - ansheng’s blog!</title>
        </Helmet>
        <Col span={17}>
          <div className={styles.wrapper}>
            {
              Object.keys(data).reverse().map((key) =>
                <div key={key}>
                  <h2>{key}</h2>
                  <ul>
                    {
                      data[key].map((article, index) =>
                        <li key={index}>
                          <span>{article['release_time']}</span>
                          <Link to={`/article/${article.url}/`}>{article.title}</Link>
                        </li>,
                      )
                    }
                  </ul>
                </div>,
              )
            }
          </div>
        </Col>
      </Row>
    );
  }
}

export default ArchivePage;
