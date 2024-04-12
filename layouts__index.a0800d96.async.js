"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[717],{6781:function(Uo,W,o){o.r(W),o.d(W,{default:function(){return Wo}});var _=o(97857),C=o.n(_),oo=o(5574),z=o.n(oo),to=o(19632),A=o.n(to),O=o(58291),u=o(22148),no=o(96214),io=o(13505),ao=o(43610),eo=o(63094),lo=o(1849),R=o(90948),ro=o(16323),so=o(90872),V=o(60265),vo=o(54128),F=o(69661),uo=o(55137),T=o(87357),co=o(11984),D=o(67294),t=o(85893),fo=(0,R.ZP)(ro.Z)(function(x){var e=x.open;return{"& .MuiSpeedDial-actions":{height:e?"unset":"0"}}}),xo=function(){var e,s,i,m,f=(0,D.useState)(!1),d=z()(f,2),S=d[0],c=d[1],p=(0,u.useModel)("@@initialState"),a=p.initialState,Z=a==null?void 0:a.boxdata.syscfgs.boxjs,r=a==null||(e=a.boxdata)===null||e===void 0?void 0:e.usercfgs,h=a==null||(s=a.ui)===null||s===void 0?void 0:s.call(a,a==null?void 0:a.boxdata),y=(h==null?void 0:h.iconThemeIdx)!==void 0?h==null?void 0:h.iconThemeIdx:1;if(r!=null&&r.isHideBoxIcon)return null;var N=a==null||(i=a.boxdata)===null||i===void 0||(m=i.syscfgs.envs)===null||m===void 0?void 0:m.find(function(v){var b;return v.id===(a==null||(b=a.boxdata)===null||b===void 0?void 0:b.syscfgs.env)}),g=[].concat(A()(r!=null&&r.isHideHelp?[]:[{icon:(0,t.jsx)(eo.Z,{sx:{color:so.Z[400]}}),name:"Help",onClick:function(){window.open("https://docs.boxjs.app/")}}]),A()(r!=null&&r.isHideRefresh?[]:[{icon:(0,t.jsx)(lo.Z,{sx:{color:V.Z[400]}}),name:"Refresh",onClick:function(){window.location.reload()}}]),[{icon:(0,t.jsx)(io.Z,{sx:{color:vo.Z[400]}}),name:"database",onClick:function(){u.history.push("/database")}}],A()((a==null?void 0:a.boxdata.syscfgs.env)==="Surge"?[{icon:(0,t.jsx)(F.Z,{alt:"BoxJs",src:(N==null?void 0:N.icons[y])||O.Z.logo,sx:{width:28,height:28,border:1,borderColor:"white"}}),name:"actions",onClick:function(){u.history.push("/actions")}}]:[]),A()(r!=null&&r.isHideCoding?[]:[{icon:(0,t.jsx)(no.Z,{sx:{color:uo.Z[400]}}),name:"Code",onClick:function(){u.history.push("/code")}}]));return(0,t.jsx)(T.Z,{className:"cus-draggable",sx:{transform:"translateZ(0px)",flexGrow:1,position:"fixed",bottom:"12%",right:16,zIndex:99},children:(0,t.jsx)(fo,{open:S,onClose:function(b){c(!1),b.preventDefault()},onClick:function(b){c(!S),b.preventDefault()},FabProps:{size:"medium"},ariaLabel:"SpeedDial controlled open example",icon:(0,t.jsx)(F.Z,{alt:"BoxJS",src:Z==null?void 0:Z.icons[y],sx:{width:1,height:1},children:(0,t.jsx)(ao.Z,{color:"error"})}),children:g.map(function(v){return(0,t.jsx)(co.Z,{icon:v.icon,tooltipTitle:v.name,onClick:v.onClick},v.name)})})})},mo=xo,po=o(76638),ho=o(81261),go=o(78579),So=o(98456),Co=o(90629),bo=o(21528),jo=o(2359),Zo=o(97458),I={footer_container:"footer_container___QFPpy",footer_container_tow:"footer_container_tow___BWiJC",footer_bar:"footer_bar___Lok0r"},yo=function(){var e=(0,u.useLocation)(),s=(0,u.useModel)("@@initialState"),i=s.initialState,m=(0,u.useModel)("api"),f=m.loading,d=i==null?void 0:i.boxdata,S={"/":{value:"/",icon:(0,t.jsx)(po.Z,{})},"/app":{value:"/app",icon:(0,t.jsx)(go.Z,{})},"/sub":{value:"/sub",icon:(0,t.jsx)(ho.Z,{})},"/my":{value:"/my",icon:(0,t.jsxs)(T.Z,{sx:{position:"relative"},children:[(0,t.jsx)(F.Z,{alt:"boxJS",src:(d==null?void 0:d.usercfgs.icon)||O.Z.logo,sx:{width:24,height:24}}),f&&(0,t.jsx)(So.Z,{size:24,sx:{position:"absolute",top:"50%",left:"50%",marginTop:"-12px",marginLeft:"-12px"}})]})}};return(0,t.jsx)(Zo.Z,{type:["bottom","bottom"],appear:!!(i!=null&&i.boxdata.usercfgs.isAnimate),children:i!=null&&i.boxdata.usercfgs.isHidedNaviBottom?null:(0,t.jsx)(T.Z,{className:d!=null&&d.usercfgs.isTraditionalMenu?I.footer_container_tow:I.footer_container,children:(0,t.jsx)(Co.Z,{className:I.footer_bar,sx:{borderRadius:7,overflow:"hidden",boxShadow:function(p){return"0px 0 3px ".concat(p.palette.primary.main)}},children:(0,t.jsx)(bo.Z,{showLabels:!0,value:e.pathname,onChange:function(p,a){u.history.push(a)},sx:{"& .Mui-selected":{"&:after":{width:.3}}},children:Object.keys(S).map(function(c){return(0,t.jsx)(jo.Z,C()(C()({},S[c]),{},{sx:{"&:after":{content:'""',position:"absolute",height:2,width:0,borderRadius:1,background:function(a){return a.palette.primary.main},top:1,transition:"width 0.3s linear",boxShadow:1}}}),c)})})},"paper")})})},Mo=yo,To=o(44842),E=o(47036),$o=o(39005),Q=o(15861),G=(0,R.ZP)(T.Z)(function(x){var e=x.theme;return{backgroundColor:e.palette.mode==="light"?"#fff":E.Z[800]}}),No=(0,R.ZP)(T.Z)(function(x){var e=x.theme;return{width:30,height:6,backgroundColor:e.palette.primary.main,borderRadius:3,position:"absolute",top:8,left:"calc(50% - 15px)",boxShadow:e.shadows[1]}}),Po=function(e){var s;return e.value?(0,t.jsx)("div",{children:(0,t.jsxs)($o.Z,{anchor:"bottom",swipeAreaWidth:0,open:e.open||!1,container:function(){return window.document.body},onClose:function(){return e.onClose()},onOpen:function(){return e.onClose()},disableSwipeToOpen:!1,ModalProps:{keepMounted:!0},sx:{"& .MuiDrawer-paperAnchorBottom":{maxHeight:"60%",minHeight:"30%",borderTopLeftRadius:8,borderTopRightRadius:8,overflow:"hidden"}},children:[(0,t.jsxs)(G,{sx:{position:"absolute",top:0,visibility:"visible",right:0,left:0,boxShadow:function(m){return m.shadows[1]}},children:[(0,t.jsx)(No,{onClick:function(){return e.onClose()}}),(0,t.jsx)(Q.Z,{sx:{p:2,color:"text.secondary"},children:"\u8FD0\u884C\u7ED3\u679C"})]}),(0,t.jsx)(G,{sx:{px:2,pb:2,mt:7,overflow:"auto"},children:(0,t.jsx)(Q.Z,{variant:"caption",color:"grey",component:"p",sx:{whiteSpace:"pre-wrap",wordBreak:"break-word",pt:2},children:((s=e.value)===null||s===void 0?void 0:s.output)||JSON.stringify(e.value||"\u6682\u65E0\u7ED3\u679C")})})]})}):null},Bo=Po,K=o(5554),Ho=o(43619),Ao=o(22430),Do=o(66720),Oo=function(e){var s=(0,u.useModel)("@@initialState"),i=s.initialState,m=s.setInitialState,f=i==null?void 0:i.boxdata,d=i==null?void 0:i.mode,S=D.useMemo(function(){return{toggleColorMode:function(r){var h=(0,K.nH)(),y=r==="auto"?h:r;i&&m(C()(C()({},i),{},{mode:y}))}}},[i]),c=(f==null?void 0:f.usercfgs.color_light_primary)||V.Z[500],p=(f==null?void 0:f.usercfgs.color_dark_primary)||E.Z[500],a=D.useMemo(function(){return(0,Ho.Z)({palette:{mode:d,primary:{main:d==="light"?c:p,light:c,dark:p}}})},[d,c,p]);return(0,t.jsx)(K.kc.Provider,{value:S,children:(0,t.jsxs)(Ao.Z,{theme:a,children:[(0,t.jsx)(Do.ZP,{}),e.children]})})},Ro=Oo,Fo=o(65582),U=o(58703),X=o(54776),Io=o(21737),Jo=o(71415),Lo=o.n(Jo),$={container:"container___MJ5pp",content:"content___FEk3q",container_top:"container_top___QFCHo",my:"my___FfjD2",alert:"alert___K4HMe"},J;function Wo(){var x,e,s,i,m,f,d,S,c,p,a,Z,r,h,y,N=(0,u.useLocation)(),g=(0,u.useModel)("alert"),v=(0,u.useModel)("log"),b=(0,u.useModel)("@@initialState"),n=b.initialState,Y=(0,u.useModel)("api"),zo=Y.fetchRunScript,Vo=Y.fetchSave,L=function(){g.alert({})},H=n==null||(x=n.boxdata)===null||x===void 0||(e=x.usercfgs)===null||e===void 0?void 0:e.bgimg,P=n==null||(s=n.boxdata)===null||s===void 0||(i=s.usercfgs)===null||i===void 0||(m=i.bgimgs)===null||m===void 0||(f=m.split(`
`))===null||f===void 0?void 0:f.map(function(l){var j=(l==null?void 0:l.split(","))||[],M=z()(j,2),B=M[0],Go=B===void 0?"":B,q=M[1],Ko=q===void 0?"":q;return{name:Go,url:Ko}});if(H==="\u8DDF\u968F\u7CFB\u7EDF"){var k=P==null?void 0:P.find(function(l){return l.name=="\u6697\u9ED1"||l.name=="dark"}),w=P==null?void 0:P.find(function(l){return l.name=="\u660E\u4EAE"||l.name=="light"}),Eo=k?k.url:"",Qo=w?w.url:"";(n==null?void 0:n.mode)==="dark"?H=Eo:H=Qo}return(0,D.useEffect)(function(){var l,j;if(document.oncontextmenu=function(){return!1},n!=null&&(l=n.boxdata)!==null&&l!==void 0&&l.usercfgs.isVConsole)J=new(Lo())({theme:n==null?void 0:n.mode});else if(!(n!=null&&(j=n.boxdata)!==null&&j!==void 0&&j.usercfgs.isVConsole)&&J){var M,B;(M=J)===null||M===void 0||(B=M.destroy)===null||B===void 0||B.call(M)}n!=null&&n.boxdata.usercfgs.isWallpaperMode&&setTimeout(function(){Vo.run([{key:O.Z.userCfgs,val:JSON.stringify(C()(C()({},n==null?void 0:n.boxdata.usercfgs),{},{isWallpaperMode:!1}))}])},3e3)},[n==null||(d=n.boxdata)===null||d===void 0?void 0:d.usercfgs.isVConsole,n==null?void 0:n.boxdata.usercfgs.isWallpaperMode]),(0,t.jsxs)(Ro,{children:[(0,t.jsxs)(T.Z,{className:n!=null&&(S=n.boxdata)!==null&&S!==void 0&&S.usercfgs.isWaitToggleSearchBar?$.container_top:$.container,children:[!["/my"].includes(N.pathname)&&(0,t.jsx)(To.ZP,{}),(0,t.jsx)(mo,{}),(0,t.jsx)("div",{draggable:!1,style:{position:"fixed",top:0,left:0,bottom:0,right:0,zIndex:-1,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundColor:"transparent",backgroundImage:H?"linear-gradient(to bottom,rgba(0,0,0,.2) 0,transparent 76px), url(".concat(H,"?_=").concat(n==null?void 0:n.random,")"):void 0}}),(0,t.jsxs)(Fo.Z,{fixed:!0,maxWidth:!1,className:"".concat($.content," ").concat($[N.pathname.replace("/","")]),children:[n!=null&&n.boxdata.usercfgs.isWallpaperMode?null:(0,t.jsx)(u.Outlet,{}),(c=g.options)!==null&&c!==void 0&&c.type?(0,t.jsx)(U.Z,{className:$.alert,autoHideDuration:2e3,onClose:function(){return L()},open:(p=g.options)===null||p===void 0?void 0:p.open,anchorOrigin:{vertical:"top",horizontal:"left"},TransitionComponent:function(j){return(0,t.jsx)(X.Z,C()(C()({},j),{},{direction:"down"}))},children:(0,t.jsx)(Io.Z,{sx:{width:"100%"},onClose:function(){return L()},severity:(a=g.options)===null||a===void 0?void 0:a.type,children:(Z=g.options)===null||Z===void 0?void 0:Z.message})},g.options.key):(0,t.jsx)(U.Z,{className:$.alert,autoHideDuration:1e3,onClose:function(){return L()},open:(r=g.options)===null||r===void 0?void 0:r.open,anchorOrigin:{vertical:"top",horizontal:"left"},TransitionComponent:function(j){return(0,t.jsx)(X.Z,C()(C()({},j),{},{direction:"down"}))},message:(h=g.options)!==null&&h!==void 0&&h.type||(y=g.options)===null||y===void 0?void 0:y.message},g.options.key)]}),(0,t.jsx)(Mo,{})]}),(0,t.jsx)(Bo,{open:v.visible,value:zo.data,onClose:function(){return v.setVisible(!1)}})]})}}}]);
