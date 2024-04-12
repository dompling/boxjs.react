"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[202],{92398:function(A,m,n){n.r(m),n.d(m,{default:function(){return q}});var R=n(19632),P=n.n(R),I=n(97857),u=n.n(I),O=n(58291),f=n(22148),T=n(75716),L=n(91811),y=n(24410),B=n(14957),Z=n(43329),l=n(90948),K=n(82280),S=n(38895),U=n(22797),W=n(59334),F=n(97212),$=n(90629),z=n(51233),x=n(69661),J=n(15861),N=n(78462),D=n(93946),G=n(98619),H=n(18987),C=n(97458),Y=n(67294),r=n(85893),w=(0,l.ZP)(function(e){return(0,r.jsx)(K.Z,u()({disableGutters:!0,elevation:0,square:!0},e))})(function(){return{}}),Q=(0,l.ZP)(function(e){return(0,r.jsx)(S.Z,u()({expandIcon:(0,r.jsx)(T.Z,{sx:{fontSize:"0.9rem"}})},e))})(function(e){var _=e.theme;return{padding:0,paddingRight:10,backgroundColor:_.palette.mode==="dark"?"rgba(255, 255, 255, .05)":"rgba(0, 0, 0, 0)","& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":{transform:"rotate(90deg)"},"& .MuiAccordionSummary-content":{marginLeft:_.spacing(1)}}}),V=(0,l.ZP)(U.Z)(function(e){var _=e.theme;return{padding:_.spacing(2),borderTop:"1px solid rgba(0, 0, 0, .125)"}}),X=(0,l.ZP)(W.Z)(function(){return{"& .MuiListItemText-secondary":{textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden"}}}),k=(0,l.ZP)(F.ZP)(function(){return{paddingLeft:8}});function q(){var e,_=(0,f.useModel)("app"),b=_.expanded,aa=_.setExpanded,na=(0,f.useModel)("@@initialState"),a=na.initialState,oa=(a==null?void 0:a.apps)||[],ra=(0,f.useModel)("api"),j=ra.fetchSave,E=[],ia=(a==null?void 0:a.boxdata.sysapps)||[],p=[];a==null||a.boxdata.usercfgs.appsubs.forEach(function(i){if(a!=null&&a.boxdata.appSubCaches[i.url]){var o=a==null?void 0:a.boxdata.appSubCaches[i.url];p.push(o)}}),a==null||a.boxdata.usercfgs.favapps.forEach(function(i){var o=oa.find(function(s){return s.id===i});o&&E.push(o)}),p=[].concat(P()(E.length?[{id:"favApp.id",name:"\u6536\u85CF\u5E94\u7528",description:"\u6536\u85CF\u5E94\u7528",author:"",icon:(0,r.jsx)(L.Z,{sx:{color:function(o){return o.palette.common.white}}}),repo:"",apps:E,task:[],updateTime:""}]:[]),P()(p),[{id:"sysApp.id",name:"\u7CFB\u7EDF\u5E94\u7528",description:"\u7CFB\u7EDF\u5E94\u7528",author:"",icon:(0,r.jsx)(y.Z,{sx:{color:function(o){return o.palette.common.white}}}),repo:"",apps:ia,task:[],updateTime:""}]);var h=a==null||(e=a.ui)===null||e===void 0?void 0:e.call(a,a==null?void 0:a.boxdata),sa=function(o){return function(s,g){aa(g?o:void 0)}};return(0,r.jsx)(C.Z,{style:{marginTop:16},appear:!!(a!=null&&a.boxdata.usercfgs.isAnimate),children:p.map(function(i){return(0,r.jsx)($.Z,{elevation:3,sx:{mb:2,overflow:"hidden",borderRadius:function(s){return s.spacing(2)}},children:(0,r.jsxs)(w,{expanded:b===i.id,onChange:sa(i.id),sx:{borderRadius:function(s){return s.spacing(2)},overflow:"hidden"},children:[(0,r.jsx)(Q,{"aria-controls":i.id,id:i.id,children:(0,r.jsxs)(z.Z,{spacing:2,direction:"row",justifyContent:"center",alignItems:"center",children:[typeof i.icon=="string"?(0,r.jsx)(x.Z,{id:i.id,src:i.icon,sx:{boxShadow:function(s){return s.shadows[1]}}}):(0,r.jsx)(x.Z,{id:i.id,sx:{boxShadow:function(s){return s.shadows[1]},bgcolor:function(s){return s.palette.primary.main}},children:i.icon}),(0,r.jsx)(J.Z,{children:i.name})]})}),(0,r.jsx)(V,{sx:{padding:0,maxHeight:500,overflowY:"auto"},children:(0,r.jsx)(C.Z,{type:["top","bottom"],leaveReverse:!0,children:b===i.id?(0,r.jsx)(N.Z,{sx:{padding:0,bgcolor:"background.paper"},children:i.apps.map(function(o,s){var g=E.find(function(c){return c.id===o.id});return h==null||h.loadAppBaseInfo(o),(0,r.jsx)(Y.Fragment,{children:(0,r.jsx)(k,{secondaryAction:g?(0,r.jsx)(D.Z,{edge:"end","aria-label":"cancelFav",sx:{padding:0,paddingRight:"2px"},onClick:function(){var t,M=a==null?void 0:a.boxdata.usercfgs.favapps.find(function(v){return v===o.id});if(M){var d=a==null?void 0:a.boxdata.usercfgs;j.run({key:O.Z.userCfgs,val:JSON.stringify(u()(u()({},d),{},{favapps:d==null||(t=d.favapps)===null||t===void 0?void 0:t.filter(function(v){return v!==o.id})}))})}},children:(0,r.jsx)(B.Z,{color:"primary"})}):(0,r.jsx)(D.Z,{edge:"end","aria-label":"fav",sx:{padding:0,paddingRight:"2px"},onClick:function(){var t,M=a==null?void 0:a.boxdata.usercfgs.favapps.find(function(v){return v===o.id});if(!M){var d=a==null?void 0:a.boxdata.usercfgs;d==null||(t=d.favapps)===null||t===void 0||t.push(o.id),j.run({key:O.Z.userCfgs,val:JSON.stringify(u()({},d))})}},children:(0,r.jsx)(Z.Z,{})}),children:(0,r.jsxs)(G.Z,{sx:{padding:0,pr:"0 !important"},onClick:function(){f.history.push("/app/".concat(o.id))},children:[(0,r.jsx)(H.Z,{children:(0,r.jsx)(x.Z,{alt:o.name[0],src:o.icon,sx:{boxShadow:function(t){return t.shadows[1]}}})}),(0,r.jsx)(X,{primary:o.name,secondary:o.repo})]})},"".concat(o.id,"-").concat(s))},"".concat(o.id,"-").concat(s))})},"app_list"):null})})]})},i.id)})})}},58291:function(A,m){m.Z={logo:"https://raw.githubusercontent.com/Orz-3/mini/master/Color/box.png",userCfgs:"chavy_boxjs_userCfgs",sessions:"chavy_boxjs_sessions",app_subCaches:"chavy_boxjs_app_subCaches",backups:"chavy_boxjs_backups",cursessions:"chavy_boxjs_cur_sessions",gistCacheKey:"@chavy_boxjs_userCfgs.gist_cache_key"}}}]);
