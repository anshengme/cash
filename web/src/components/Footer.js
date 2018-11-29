import React from 'react';
import { BackTop } from 'antd';
import Link from 'umi/link';
import style from './Footer.less';

export default function() {
  const links = ['PM265', '阿猫阿狗导航', '起点学院', '设计师导航', '360UXC', '迅雷CUED', '产品经理招聘', '演界网PPT模板', '拉勾网', '推酷', '腾讯大讲堂', '9秒社团', '猪八戒网', '派代网', '盒子UI', 'Code4App', '外贸圈', '会鸽', '市场部网', 'UI设计', '25学堂', '极光推送', '互联网的一些事', '找工作', '亿欧网', '电视之家', '投资潮', '安卓巴士', '伙伴云表格', '学UI网', '腾讯信鸽', '腾讯移动分析', '腾讯御安全'];
  return (
    <footer className={style.wrapper}>

      <div className={style.footer}>
        <div className={style.box}>
          <h2 className={style.title}>友情链接</h2>
          <ul>
            {
              links.map((link) =>
                <li key={link}><Link to="#">{link}</Link></li>,
              )
            }
          </ul>
        </div>
      </div>
      <div className={style.copyright}>
        <span>Copyright @2016-2018</span>
      </div>
      <BackTop visibilityHeight="0"/>
    </footer>
  );
}
