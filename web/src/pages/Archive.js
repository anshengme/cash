import Link from 'umi/link';
import { Col, Row } from 'antd';
import styles from './Archive.less';

export default function() {
  return (
    <Row gutter={8}>
      <Col span={17}>

        <div className={styles.wrapper}>

          <div>
            <h2>2018</h2>
            <ul>
              <li>
                <span>2018-11-30</span><Link to="/">Docker部署Sentry监控Django应用并使用email+钉钉通知</Link>
              </li>
              <li>
                <span>2018-06-27</span><Link to="/">基于CentOS利用ngrok完美进行内网穿透</Link>
              </li>
              <li>
                <span>2018-06-11</span><Link to="/">搭建自己的小型Git Server</Link>
              </li>
              <li>
                <span>2018-01-22</span><Link to="/">Celery分布式任务队列</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2>2017</h2>
            <ul>
              <li>
                <span>2018-11-30</span><Link to="/">Docker部署Django项目</Link>
              </li>
              <li>
                <span>2017-11-22</span><Link to="/">在CentOS上使用离线YUM安装软件包</Link>
              </li>
              <li>
                <span>2017-11-10</span><Link to="/">两条指令搞定SSH反向隧道</Link>
              </li>
              <li>
                <span>2017-10-16</span><Link to="/">Django中使用Oracle数据库</Link>
              </li>
            </ul>
          </div>
        </div>
      </Col>


    </Row>

  );
}
