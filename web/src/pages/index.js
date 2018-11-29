import React from 'react';
import { Row, Col, Icon, Avatar } from 'antd';
import Link from 'umi/link';
import style from './index.less';
import articleImg from '../assets/article-img.jpeg';
import AvatarImg from '../assets/avatar.png';

const IconText = ({ type, text, theme }) => (
  <span>
    <Icon type={type} theme={theme} style={{ marginRight: 8 }}/>
    {text}
  </span>
);

const articleList = [];
for (let i = 0; i < 13; i++) {
  articleList.push({
    title: `竞品分析|做生鲜的看过来！耗时33小时的生鲜竞品分析方案 ${i}`,
    date: '2018/11/29',
    img: i % 2 === 0 ? articleImg : '',
    click_count: Math.ceil(Math.random() * 100),
    comment_count: Math.ceil(Math.random() * 20),
    description: '本篇文章介绍了一款生鲜产品的电商实操项目，提供给有需要的小伙伴们参考学习。 很多小伙伴在给我们留言说，在网上学了很多的竞品分析方法.',
  });
}

const articleHotList = [];
for (let i = 1; i < 6; i++) {
  articleHotList.push({
    index: i,
    title: `竞品分析|做生鲜的看过来！耗时33小时的生鲜竞品分析方案 ${i}`,
    click_count: Math.ceil(Math.random() * 100),
    comment_count: Math.ceil(Math.random() * 20),
  });
}

export default function() {
  return (
    <Row gutter={8}>
      <Col span={17}>
        <div className={style.left}>
          <div className={style.hotArticleList}>
            <h2>热门排行</h2>
            <ul>
              {
                articleHotList.map((article) =>
                  <li key={article.title}>
                    <div>
                      <span><Icon type="eye" theme="filled" style={{ marginRight: 8 }}/>查看（{article.click_count}）</span>
                      <span className={style.dot}/>
                      <span className={style.hotArticleListComment}>
                        <Icon type="message" theme="filled" style={{ marginRight: 8 }}/>评论（{article.comment_count}）
                      </span>
                    </div>
                    <span className={style[`label${article.index}`]}>{article.index}</span>
                    <Link to={`/article/${article.title}`}>{article.title}</Link>
                  </li>,
                )
              }
            </ul>
          </div>

          {
            articleList.map((article) =>
              <div className={style.articleList} key={article.title}>
                <Row>
                  <Col span={article.img ? 6 : 0}>
                    <img className={style.articleImg}
                         src={article.img} alt=""/>
                  </Col>
                  <Col span={article.img ? 18 : 24}>
                    <div className={style.articleContent}>
                      <h2 className={style.articleTitle}>
                        <Link to={`/article/${article.title}`}>{article.title}</Link>
                      </h2>
                      <div className={style.articleDesc}>
                        {article.description}
                      </div>
                      <div className={style.articleFooter}>
                        <span>{article.date}</span>
                        <span className={style.dot}/>
                        <IconText type="eye" theme="filled" text={article.click_count}/>
                        <span className={style.dot}/>
                        <IconText type="message" theme="filled" text={article.comment_count}/>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>,
            )
          }
        </div>
      </Col>
      <Col span={7}>
        <div className={style.right}>
          <div>
            <div className={style.meAvatar}>
              <Avatar size={180} src={AvatarImg}/>
            </div>
            <p className={style.meLink}>
              Find me on <Link to="/">
              <Icon type="github" theme="filled"/>
            </Link> and <Link to="/">
              <Icon type="mail" theme="filled"/>
            </Link> .
            </p>
          </div>
          <div>
            <div className={style.rightTitle}>
              <h2>系列文章</h2>
            </div>
            <div className={style.rightContent}>
              <ul>
                <li><Link to="/">Python全栈之路</Link></li>
                <li><Link to="/">Nginx入门到实践</Link></li>
                <li><Link to="/">Golang学习笔记</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
