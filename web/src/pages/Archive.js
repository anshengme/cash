import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Col, Row } from 'antd';
import { formatDate } from '@/utils/utils';
import styles from './Archive.less';

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
                          <span>{formatDate(article['release_time'])}</span>
                          <Link to={`/article/${article.url}/`}>{article.title}</Link>
                        </li>,
                      )
                    }
                  </ul>
                </div>,
              )
            }


            {/*<div>*/}
            {/*<h2>2017</h2>*/}
            {/*<ul>*/}
            {/*<li>*/}
            {/*<span>2018-11-30</span><Link to="/">Docker部署Django项目</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*<span>2017-11-22</span><Link to="/">在CentOS上使用离线YUM安装软件包</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*<span>2017-11-10</span><Link to="/">两条指令搞定SSH反向隧道</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*<span>2017-10-16</span><Link to="/">Django中使用Oracle数据库</Link>*/}
            {/*</li>*/}
            {/*</ul>*/}
            {/*</div>*/}
          </div>
        </Col>
      </Row>
    );
  }
}

export default ArchivePage;
