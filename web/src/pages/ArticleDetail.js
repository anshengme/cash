import React from 'react';
import { Col, Divider, Icon, Row, Input, Button, Avatar } from 'antd';
import styles from './ArticleDetail.less';
import indexStyles from './index.less';

const { TextArea } = Input;

const IconText = ({ type, text, theme }) => (
  <span>
    <Icon type={type} theme={theme} style={{ marginRight: 8 }}/>
    {text}
  </span>
);

export default function() {
  return (
    <Row gutter={8}>
      <Col span={17}>
        <div className={styles.detail}>
          <h1 className={styles.title}>《这里的黎明静悄悄》读书笔记_短篇读后感100字</h1>
          <div className={styles.articleFooter}>
            <span>2018/11/30</span>
            <span className={indexStyles.dot}/>
            <IconText type="eye" theme="filled" text="100"/>
            <span className={indexStyles.dot}/>
            <a href="#comment"><IconText type="message" theme="filled" text="200"/></a>
          </div>
          <Divider/>
          <div>
            <p>这里没有都市的喧嚣，只有树林静静的“黎明”。这里没有浪漫的爱情，只有五个年轻女兵的坟墓。五个年轻的女兵：为了守住阵地的设施，为了与德国法西斯侦察兵的周旋，离别了家庭，牺牲了爱情，献出了生命。什么是青春的美好？什么是人生的意义？读这本书，或许能找到答案。</p>
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
