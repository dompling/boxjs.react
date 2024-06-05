"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[181],{16961:function(de,I,e){var k=e(52677),U=e.n(k),V=e(97857),C=e.n(V),z=e(19632),c=e.n(z),$=e(5574),y=e.n($),Y=e(13769),P=e.n(Y),x=e(33525),H=e(22148),J=e(40625),v=e(42761),O=e(90089),b=e(93946),A=e(42293),G=e(10155),N=e(78462),K=e(97212),g=e(59334),Q=e(15861),B=e(83321),X=e(50657),w=e(31425),q=e(50480),ee=e(75438),_e=e(36872),Z=e(72890),ae=e(93109),D=e(67294),o=e(85893),_=["defaultValue"],ne=(0,D.forwardRef)(function(u,j){var oe=u.defaultValue,E=P()(u,_),W=D.useState(!1),T=y()(W,2),S=T[0],F=T[1],te=(0,D.useState)(oe),L=y()(te,2),R=L[0],f=L[1],re=(0,D.useState)(""),i=y()(re,2),le=i[0],h=i[1],M=(0,ae.Z)(le,{wait:100}),se=(0,H.useModel)("@@initialState"),n=se.initialState,t=[{id:"extra_data_key",name:"\u975E\u8BA2\u9605\u6570\u636E",_id:"extra_data_key@local",keys:(n==null?void 0:n.boxdata.usercfgs.gist_cache_key)||[],descs_html:[],author:"local",repo:"",icons:[]}].concat(c()(((n==null?void 0:n.boxdata.sysapps)||[]).filter(function(a){return a.keys&&!!a.keys.length})));Object.values((n==null?void 0:n.boxdata.appSubCaches)||{}).forEach(function(a){var l;t=[].concat(c()(t),c()((a==null||(l=a.apps)===null||l===void 0?void 0:l.filter(function(d){return d.keys&&!!d.keys.length}))||[]))}),t=t.filter(function(a){return a.name.indexOf(M)>-1||!M?!0:!!a.keys.find(function(l){return l.indexOf(M)>-1})});var r=n==null?void 0:n.boxdata.datas;(0,D.useImperativeHandle)(j,function(){return{value:R}}),(0,D.useEffect)(function(){f(E.value)},[E.value]);var s=function(){F(!1),h("")},m=function(l){var d;f(l),(d=E.onChange)===null||d===void 0||d.call(E,{target:{name:E.name,value:l}})};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(O.Z,C()(C()({},E),{},{value:R,onChange:function(l){m(l.target.value)},size:"small",type:"text",endAdornment:(0,o.jsx)(b.Z,{size:"small","aria-label":E.name,onClick:function(){F(!0)},children:(0,o.jsx)(J.Z,{fontSize:"small",sx:{color:function(l){return l.palette.primary.main}}})})})),(0,o.jsxs)(X.Z,{open:S,onClose:function(){return s()},sx:{mt:15,mb:15,"& .MuiDialog-paper":{width:"100%"}},children:[(0,o.jsx)(A.Z,{position:"static",sx:{background:function(l){return l.palette.primary.main}},children:(0,o.jsx)(G.Z,{children:(0,o.jsxs)(x.ol,{children:[(0,o.jsx)(x.el,{placeholder:"\u8BF7\u8F93\u5165\u5E94\u7528\u540D\u79F0\u6216\u7F13\u5B58Key",inputProps:{"aria-label":"search"},onChange:function(l){h(l.target.value)}}),(0,o.jsx)(x.cB,{children:(0,o.jsx)(v.Z,{})})]})})}),(0,o.jsx)(N.Z,{subheader:(0,o.jsx)("li",{}),sx:{position:"relative",overflow:"auto",minHeight:300,"& ul":{padding:0}},children:(0,o.jsx)(Z.Z,{name:"radio-buttons-group",onChange:function(l,d){m(d)},children:t.length>0?t.map(function(a,l){var d,ie,ue="".concat(a.id,"_").concat(a.author,"_").concat(l);return(0,o.jsxs)("li",{style:{width:"100%",boxSizing:"border-box"},children:[(0,o.jsxs)(ee.Z,{sx:{borderBottom:"1px solid rgba(0, 0, 0, .125)",mt:0},children:[a==null?void 0:a.name,"\uFF08",a==null||(d=a.keys)===null||d===void 0?void 0:d.length,"\uFF09"]}),a==null||(ie=a.keys)===null||ie===void 0?void 0:ie.map(function(p){return(0,o.jsx)(K.ZP,{sx:{p:0,pl:3,pr:3},children:(0,o.jsx)(g.Z,{id:ue,primary:(0,o.jsx)(q.Z,{value:p,control:(0,o.jsx)(_e.Z,{}),label:p,sx:{"& .MuiFormControlLabel-label":{width:"80%",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"noWrap"}}}),primaryTypographyProps:{noWrap:!0,variant:"caption",sx:{fontWeight:"bold"}},secondary:(0,o.jsx)(Q.Z,{noWrap:!0,color:"grey",variant:"caption",component:"div",children:(U()(r==null?void 0:r[p])==="object"&&(r!=null&&r[p])?JSON.stringify(r==null?void 0:r[p]):r==null?void 0:r[p])||"\u65E0\u6570\u636E"})})},"".concat(ue,"-").concat(p))})]},"section-".concat(ue))}):(0,o.jsx)(K.ZP,{sx:{height:290,textAlign:"center"},children:(0,o.jsx)(g.Z,{primary:"\u672A\u627E\u5230\u76F8\u5173\u7ED3\u679C"})})})}),(0,o.jsxs)(w.Z,{sx:{borderTop:"1px solid rgba(0, 0, 0, .125)"},children:[(0,o.jsx)(B.Z,{color:"inherit",onClick:function(){return s()},children:"\u53D6\u6D88"}),(0,o.jsx)(B.Z,{onClick:function(){return s()},autoFocus:!0,children:"\u786E\u5B9A"})]})]})]})});I.Z=ne},24020:function(de,I,e){e.r(I),e.d(I,{default:function(){return ne}});var k=e(19632),U=e.n(k),V=e(9783),C=e.n(V),z=e(97857),c=e.n(z),$=e(5574),y=e.n($),Y=e(16961),P=e(58291),x=e(22148),H=e(41733),J=e(23508),v=e(51233),O=e(15861),b=e(87918),A=e(67720),G=e(2180),N=e(93946),K=e(90629),g=e(87357),Q=e(56815),B=e(83321),X=e(50135),w=e(82280),q=e(22797),ee=e(38895),_e=e(20640),Z=e.n(_e),ae=e(97458),D=e(67294),o=e(87536),_=e(85893);function ne(){var u=(0,o.cI)(),j=(0,x.useModel)("alert"),oe=(0,D.useState)({}),E=y()(oe,2),W=E[0],T=E[1],S=(0,x.useModel)("app"),F=S.expanded,te=S.handleExpandedChange,L=(0,x.useModel)("api"),R=L.fetchDataKey,f=L.fetchSave,re=(0,x.useModel)("@@initialState"),i=re.initialState,le=Object.keys((i==null?void 0:i.boxdata.datas)||{}),h=(i==null?void 0:i.boxdata.usercfgs.gist_cache_key)||[],M=(i==null?void 0:i.boxdata.usercfgs.viewkeys)||[],se=[{data:h,key:P.Z.gistCacheKey,title:"\u975E\u8BA2\u9605\u6570\u636E\uFF08".concat(h.length,"\uFF09")},{key:P.Z.viewkeys,title:"\u8FD1\u671F\u67E5\u770B\uFF08".concat(M.length,"\uFF09"),data:M}];return(0,_.jsx)(ae.Z,{interval:0,appear:!!(i!=null&&i.boxdata.usercfgs.isAnimate),children:(0,_.jsxs)(v.Z,{spacing:3,m:1,children:[se.map(function(n,t){if(!n.data.length)return null;var r=W[n.key];return(0,_.jsx)(v.Z,{direction:"column",mt:2,children:(0,_.jsxs)(w.Z,{onChange:te(n.key),expanded:F.indexOf(n.key)!==-1,children:[(0,_.jsx)(ee.Z,{sx:{m:0},expandIcon:(0,_.jsx)(J.Z,{}),"aria-controls":"panel".concat(t,"-content"),id:"panel".concat(t,"-header"),children:(0,_.jsx)(O.Z,{variant:"body2",children:n.title})}),(0,_.jsx)(q.Z,{children:(0,_.jsx)("div",{style:{display:"flex",flexWrap:"wrap"},children:n.data.map(function(s,m){return(0,_.jsx)("div",{style:{padding:3},children:(0,_.jsx)(b.Z,{label:s,variant:"filled",sx:{maxWidth:160,"& span":{width:"100%"},boxShadow:function(l){return"0px 0 1px ".concat(l.palette.primary.main)}},onDelete:function(){var l=[{key:n.key,val:n.data.filter(function(d){return d!==s})}];r==="all"&&l.push({key:n.key,val:null}),f.run(l)},onClick:function(){u.setValue("key",s),R.run(s).then(function(l){u.setValue("data",l.val)})}})},"".concat(s,"_").concat(m))})})}),(0,_.jsx)(A.Z,{}),(0,_.jsx)(G.Z,{children:(0,_.jsxs)(v.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",sx:{width:"100%",p:1},children:[(0,_.jsx)(b.Z,{label:"\u5220\u9664\u952E\u548C\u503C",size:"small",onClick:function(){return T(c()(c()({},W),{},C()({},n.key,"all")))},color:r==="all"?"primary":void 0}),(0,_.jsx)(b.Z,{label:"\u4EC5\u5220\u9664\u952E",size:"small",onClick:function(){return T(c()(c()({},W),{},C()({},n.key,"delKey")))},color:r==="delKey"||!r?"primary":void 0}),(0,_.jsxs)(N.Z,{"aria-label":"delete",color:"primary",sx:{fontSize:16},onClick:function(){var m=[{key:n.key,val:[]}];r==="all"&&n.data.map(function(a){m.push({key:a,val:null})}),f.run(m)},children:[(0,_.jsx)(H.Z,{color:"primary",sx:{fontSize:16}}),"\u6E05\u7A7A"]})]})})]})},n.title)}),(0,_.jsxs)(K.Z,{elevation:3,sx:{pt:2},children:[(0,_.jsxs)(g.Z,{pr:2,pl:2,pb:1,children:[(0,_.jsxs)(v.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",mb:2,children:[(0,_.jsx)(O.Z,{variant:"body2",children:"\u6570\u636E\u67E5\u770B\u5668"}),(0,_.jsx)(O.Z,{variant:"body2",color:"primary",component:"div",onClick:function(){var t=u.getValues("key");if(!t)return j.alert({open:!0,message:"\u8BF7\u8F93\u5165\u6570\u636E KEY",type:"warning"});Z()(t),j.alert({open:!0,message:"\u590D\u5236\u6210\u529F",type:"success"})},children:"\u590D\u5236"})]}),(0,_.jsx)(o.Qr,{name:"key",control:u.control,render:function(t){var r=t.field;return(0,_.jsx)(Y.Z,c()(c()({fullWidth:!0,size:"small",placeholder:"\u6570\u636E\u952E (Key)"},r),{},{onChange:function(m){u.setValue("data",""),r.onChange(m)}}))}}),(0,_.jsx)(Q.Z,{children:"\u8F93\u5165\u8981\u67E5\u8BE2\u7684\u6570\u636E\u952E, \u5982: boxjs_host"})]}),(0,_.jsx)(A.Z,{}),(0,_.jsx)(v.Z,{spacing:2,justifyContent:"flex-end",pt:1,pb:1,children:(0,_.jsx)(B.Z,{size:"small",variant:"text",sx:{width:"max-content",marginLeft:"auto"},onClick:function(){var t=u.getValues("key");if(!t)return j.alert({open:!0,message:"\u8BF7\u8F93\u5165\u6570\u636E KEY",type:"warning"});M.includes(t)||f.run({key:P.Z.viewkeys,val:[t].concat(U()(M))}),R.run(t).then(function(r){u.setValue("data",r.val)})},children:"\u67E5\u8BE2"})})]}),(0,_.jsxs)(K.Z,{elevation:3,sx:{pt:2},children:[(0,_.jsxs)(g.Z,{pr:2,pl:2,pb:1,children:[(0,_.jsxs)(v.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",mb:2,children:[(0,_.jsx)(O.Z,{variant:"body2",children:"\u6570\u636E\u7F16\u8F91\u5668"}),(0,_.jsx)(O.Z,{variant:"body2",color:"primary",component:"div",onClick:function(){var t=u.getValues("key");if(!t)return j.alert({open:!0,message:"\u8BF7\u8F93\u5165\u6570\u636E KEY",type:"warning"});Z()(t),j.alert({open:!0,message:"\u590D\u5236\u6210\u529F",type:"success"})},children:"\u590D\u5236"})]}),(0,_.jsx)(X.Z,c()({fullWidth:!0,multiline:!0,rows:8,size:"small",variant:"standard",placeholder:"\u6570\u636E\u5185\u5BB9",InputLabelProps:{shrink:!0}},u.register("data")))]}),(0,_.jsx)(A.Z,{}),(0,_.jsx)(v.Z,{spacing:2,justifyContent:"flex-end",pt:1,pb:1,children:(0,_.jsx)(B.Z,{size:"small",variant:"text",sx:{width:"max-content",marginLeft:"auto"},onClick:function(){var t=u.getValues("key"),r=u.getValues("data");if(!t)return j.alert({open:!0,message:"\u8BF7\u8F93\u5165\u6570\u636E KEY",type:"warning"});var s=[{key:t,val:r}];!le.includes(t)&&!h.includes(t)?s.push({key:P.Z.gistCacheKey,val:[t].concat(U()(h))}):h.includes(t)&&!r&&s.push({key:P.Z.gistCacheKey,val:h.filter(function(m){return m!==t})}),f.run(s)},children:"\u4FDD\u5B58"})})]})]},"container")})}}}]);
