(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{mIlt:function(e,a,t){"use strict";var n=t("TqRt");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t("MVZn"));t("miYZ");var c=n(t("tsqr")),s=n(t("o0o1")),u=t("dCQc"),l={namespace:"adminTag",state:{loading:!1,data:{data:[],total:0},tagDetail:{},searchData:{}},effects:{get:s.default.mark(function e(a,t){var n,r,c,l;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,c=t.put,e.next=4,r(u.AdminTags,n);case 4:return l=e.sent,e.next=7,c({type:"setState",payload:{data:l}});case 7:case"end":return e.stop()}},e,this)}),create:s.default.mark(function e(a,t){var n,r,l;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,l=t.call,e.next=4,l(u.createTag,n);case 4:c.default.success("\u6dfb\u52a0\u6210\u529f"),r();case 6:case"end":return e.stop()}},e,this)}),update:s.default.mark(function e(a,t){var n,r,l,d,i,o;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=a.callback,l=t.call,d=t.select,e.next=4,d(e=>e.adminTag);case 4:return i=e.sent,o=i.tagDetail.id,e.next=8,l(u.updateTag,n,o);case 8:c.default.success("\u66f4\u4fee\u6539\u6210\u529f"),r();case 10:case"end":return e.stop()}},e,this)})},reducers:{setState(e,a){var t=a.payload;return(0,r.default)({},e,t)}}};a.default=l}}]);