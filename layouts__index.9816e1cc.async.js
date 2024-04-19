"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[717],{25806:function(co,V,o){o.r(V),o.d(V,{default:function(){return nt}});var fo=o(97857),C=o.n(fo),xo=o(5574),Q=o.n(xo),ho=o(19632),G=o.n(ho),K=o(34747),mo=o(18115),U=o(58291),v=o(22148),go=o(96214),po=o(13505),So=o(43610),bo=o(63094),Co=o(1849),k=o(90948),Zo=o(16323),jo=o(90872),io=o(60265),yo=o(54128),q=o(69661),Mo=o(55137),O=o(87357),To=o(11984),$o=o(96486),Bo=o.n($o),N=o(67294),t=o(85893),Ro=(0,k.ZP)(Zo.Z)(function(g){var e=g.open;return{"& .MuiSpeedDial-actions":{height:e?"unset":"0"}}}),Ho=function(){var e,c,i,p,f,s,S,m,x,h=(0,N.useRef)(),y=(0,N.useState)(!1),B=Q()(y,2),P=B[0],D=B[1],L=(0,N.useState)(!1),I=Q()(L,2),M=I[0],b=I[1],X=(0,v.useModel)("api"),oo=X.fetchSave,n=(0,v.useModel)("@@initialState"),a=n.initialState,F=a==null?void 0:a.boxdata.syscfgs.boxjs,u=a==null||(e=a.boxdata)===null||e===void 0?void 0:e.usercfgs,J=(0,N.useState)((u==null?void 0:u.actions_position)||{}),A=Q()(J,2),T=A[0],W=A[1],R=a==null||(c=a.ui)===null||c===void 0?void 0:c.call(a,a==null?void 0:a.boxdata),Y=(R==null?void 0:R.iconThemeIdx)!==void 0?R==null?void 0:R.iconThemeIdx:1,w=a==null||(i=a.boxdata)===null||i===void 0||(p=i.syscfgs.envs)===null||p===void 0?void 0:p.find(function(l){var d;return l.id===(a==null||(d=a.boxdata)===null||d===void 0?void 0:d.syscfgs.env)}),r=((f=window)===null||f===void 0?void 0:f.innerWidth)/2,Z=(((s=document.getElementsByClassName(mo.Z.header_container))===null||s===void 0||(S=s[0])===null||S===void 0?void 0:S.getBoundingClientRect().height)||160)+30,$=(((m=document.getElementsByClassName(K.Z.footer_container))===null||m===void 0||(x=m[0])===null||x===void 0?void 0:x.getBoundingClientRect().height)||100)+15,H=function(d){var j,no;if(!M&&(d.stopPropagation(),!!h.current)){var vo=d.touches[0],E={left:"unset",top:"unset",bottom:"unset",right:"unset"};E.left=vo.clientX-((j=h.current)===null||j===void 0?void 0:j.getBoundingClientRect().width)/2,E.bottom=window.innerHeight-(vo.clientY+((no=h.current)===null||no===void 0?void 0:no.getBoundingClientRect().height)/2),E.bottom<=$&&(E.bottom=$),E.bottom>=window.innerHeight-Z&&(E.bottom=window.innerHeight-Z),W(E)}};(0,N.useEffect)(function(){if(!M){var l;(l=h.current)===null||l===void 0||l.addEventListener("touchmove",H,{passive:!1})}return function(){var d;(d=h.current)===null||d===void 0||d.removeEventListener("touchmove",H)}},[M]);var to=[].concat(G()(u!=null&&u.isHideHelp?[]:[{icon:(0,t.jsx)(bo.Z,{sx:{color:jo.Z[400]}}),name:"Help",onClick:function(){window.open("https://docs.boxjs.app/")}}]),G()(u!=null&&u.isHideRefresh?[]:[{icon:(0,t.jsx)(Co.Z,{sx:{color:io.Z[400]}}),name:"Refresh",onClick:function(){window.location.reload()}}]),[{icon:(0,t.jsx)(po.Z,{sx:{color:yo.Z[400]}}),name:"database",onClick:function(){v.history.push("/database")}}],G()((a==null?void 0:a.boxdata.syscfgs.env)==="Surge"?[{icon:(0,t.jsx)(q.Z,{alt:"BoxJs",src:(w==null?void 0:w.icons[Y])||U.Z.logo,sx:{width:28,height:28,border:1,borderColor:"white"}}),name:"actions",onClick:function(){v.history.push("/actions")}}]:[]),G()(u!=null&&u.isHideCoding?[]:[{icon:(0,t.jsx)(go.Z,{sx:{color:Mo.Z[400]}}),name:"Code",onClick:function(){v.history.push("/code")}}]));return(0,t.jsxs)(t.Fragment,{children:[P&&(0,t.jsx)("div",{style:{position:"fixed",zIndex:98,left:0,top:0,right:0,bottom:0,background:"rgba(0,0,0,.2)"}}),(0,t.jsx)(O.Z,{ref:h,className:"cus-draggable",sx:C()({touchAction:"none",transform:"translateZ(0px)",flexGrow:1,position:"fixed",bottom:100,right:16,zIndex:99},T),component:"div",onTouchStart:function(d){M||(D(!0),d.stopPropagation())},onTouchEnd:function(d){if(D(!1),!M&&(d.stopPropagation(),!Bo().isEqual(T,u==null?void 0:u.actions_position))){var j=C()({},T);Number(j.left)>r?(j.left="unset",j.right=16):(j.left=16,j.right="unset"),W(j),oo.run({key:"@".concat(U.Z.userCfgs,".actions_position"),val:j})}},children:(0,t.jsx)(Ro,{open:M&&!P,onClose:function(d){b(!1),d.preventDefault()},onClick:function(d){b(!M),d.preventDefault()},FabProps:{size:"medium"},ariaLabel:"SpeedDial controlled open example",icon:(0,t.jsx)(q.Z,{alt:"BoxJS",src:F==null?void 0:F.icons[Y],sx:{width:1,height:1},children:(0,t.jsx)(So.Z,{color:"error"})}),children:to.map(function(l){return(0,t.jsx)(To.Z,{icon:l.icon,tooltipTitle:l.name,onClick:l.onClick},l.name)})})})]})},No=Ho,Po=o(76638),Do=o(81261),Ao=o(78579),Eo=o(98456),Oo=o(90629),zo=o(21528),Io=o(2359),Lo=o(97458),Fo=function(){var e=(0,v.useLocation)(),c=(0,v.useModel)("@@initialState"),i=c.initialState,p=(0,v.useModel)("api"),f=p.loading,s=i==null?void 0:i.boxdata,S=30,m={"/":{value:"/",icon:(0,t.jsx)(Po.Z,{sx:{fontSize:S}})},"/app":{value:"/app",icon:(0,t.jsx)(Ao.Z,{sx:{fontSize:S}})},"/sub":{value:"/sub",icon:(0,t.jsx)(Do.Z,{sx:{fontSize:S}})},"/my":{value:"/my",icon:(0,t.jsxs)(O.Z,{sx:{position:"relative"},children:[(0,t.jsx)(q.Z,{alt:"boxJS",src:(s==null?void 0:s.usercfgs.icon)||U.Z.logo,sx:{width:34,height:34}}),f&&(0,t.jsx)(Eo.Z,{size:24,sx:{position:"absolute",top:"50%",left:"50%",marginTop:"-12px",marginLeft:"-12px"}})]})}};return(0,t.jsx)(Lo.Z,{type:["bottom","bottom"],appear:!!(i!=null&&i.boxdata.usercfgs.isAnimate),children:i!=null&&i.boxdata.usercfgs.isHidedNaviBottom?null:(0,t.jsx)(O.Z,{className:s!=null&&s.usercfgs.isTraditionalMenu?K.Z.footer_container_tow:K.Z.footer_container,children:(0,t.jsx)(Oo.Z,{className:K.Z.footer_bar,sx:{borderRadius:7,overflow:"hidden",boxShadow:function(h){return"0px 0 3px ".concat(h.palette.primary.main)}},children:(0,t.jsx)(zo.Z,{showLabels:!0,value:e.pathname,onChange:function(h,y){v.history.push(y)},sx:{"& .Mui-selected":{"&:after":{width:.3}}},children:Object.keys(m).map(function(x){return(0,t.jsx)(Io.Z,C()(C()({},m[x]),{},{sx:{"&:after":{content:'""',position:"absolute",height:2,width:0,borderRadius:1,background:function(y){return y.palette.primary.main},top:1,transition:"width 0.3s linear",boxShadow:1}}}),x)})})},"paper")})})},Jo=Fo,Wo=o(33525),eo=o(47036),wo=o(39005),ao=o(15861),lo=(0,k.ZP)(O.Z)(function(g){var e=g.theme;return{backgroundColor:e.palette.mode==="light"?"#fff":eo.Z[800]}}),Vo=(0,k.ZP)(O.Z)(function(g){var e=g.theme;return{width:30,height:6,backgroundColor:e.palette.primary.main,borderRadius:3,position:"absolute",top:8,left:"calc(50% - 15px)",boxShadow:e.shadows[1]}}),Qo=function(e){var c;return e.value?(0,t.jsx)("div",{children:(0,t.jsxs)(wo.Z,{anchor:"bottom",swipeAreaWidth:0,open:e.open||!1,container:function(){return window.document.body},onClose:function(){return e.onClose()},onOpen:function(){return e.onClose()},disableSwipeToOpen:!1,ModalProps:{keepMounted:!0},sx:{zIndex:9999,"& .MuiDrawer-paperAnchorBottom":{maxHeight:"60%",minHeight:"30%",borderTopLeftRadius:8,borderTopRightRadius:8,overflow:"hidden"}},children:[(0,t.jsxs)(lo,{sx:{position:"absolute",top:0,visibility:"visible",right:0,left:0,boxShadow:function(p){return p.shadows[1]}},children:[(0,t.jsx)(Vo,{onClick:function(){return e.onClose()}}),(0,t.jsx)(ao.Z,{sx:{p:2,color:"text.secondary"},children:"\u8FD0\u884C\u7ED3\u679C"})]}),(0,t.jsx)(lo,{sx:{px:2,pb:2,mt:7,overflow:"auto"},children:(0,t.jsx)(ao.Z,{variant:"caption",color:"grey",component:"p",sx:{whiteSpace:"pre-wrap",wordBreak:"break-word",pt:2},children:((c=e.value)===null||c===void 0?void 0:c.output)||JSON.stringify(e.value||"\u6682\u65E0\u7ED3\u679C")})})]})}):null},Go=Qo,ro=o(5554),Ko=o(43619),Uo=o(22430),Xo=o(66720),Yo=function(e){var c=(0,v.useModel)("@@initialState"),i=c.initialState,p=c.setInitialState,f=i==null?void 0:i.boxdata,s=i==null?void 0:i.mode,S=N.useMemo(function(){return{toggleColorMode:function(B){var P=(0,ro.nH)(),D=B==="auto"?P:B;i&&p(C()(C()({},i),{},{mode:D}))}}},[i]),m=(f==null?void 0:f.usercfgs.color_light_primary)||io.Z[500],x=(f==null?void 0:f.usercfgs.color_dark_primary)||eo.Z[500],h=N.useMemo(function(){return(0,Ko.Z)({palette:{mode:s,primary:{main:s==="light"?m:x,light:m,dark:x}}})},[s,m,x]);return(0,t.jsx)(ro.kc.Provider,{value:S,children:(0,t.jsxs)(Uo.Z,{theme:h,children:[(0,t.jsx)(Xo.ZP,{}),e.children]})})},ko=Yo,qo=o(65582),so=o(58703),uo=o(54776),_o=o(21737),ot=o(71415),tt=o.n(ot),z={container:"container___MJ5pp",content:"content___FEk3q",container_top:"container_top___QFCHo",my:"my___FfjD2",alert:"alert___K4HMe"},_;function nt(){var g,e,c,i,p,f,s,S,m,x,h,y,B,P,D,L,I,M=(0,v.useLocation)(),b=(0,v.useModel)("alert"),X=(0,v.useModel)("log"),oo=(0,v.useModel)("@@initialState"),n=oo.initialState,a=(0,v.useModel)("api"),F=a.fetchRunScript,u=a.fetchSave,J=function(){b.alert({})},A=n==null||(g=n.boxdata)===null||g===void 0||(e=g.usercfgs)===null||e===void 0?void 0:e.bgimg,T=n==null||(c=n.boxdata)===null||c===void 0||(i=c.usercfgs)===null||i===void 0||(p=i.bgimgs)===null||p===void 0||(f=p.split(`
`))===null||f===void 0?void 0:f.map(function(r){var Z=(r==null?void 0:r.split(","))||[],$=Q()(Z,2),H=$[0],to=H===void 0?"":H,l=$[1],d=l===void 0?"":l;return{name:to,url:d}});if(A==="\u8DDF\u968F\u7CFB\u7EDF"){var W=T==null?void 0:T.find(function(r){return r.name=="\u6697\u9ED1"||r.name=="dark"}),R=T==null?void 0:T.find(function(r){return r.name=="\u660E\u4EAE"||r.name=="light"}),Y=W?W.url:"",w=R?R.url:"";(n==null?void 0:n.mode)==="dark"?A=Y:A=w}return(0,N.useEffect)(function(){var r,Z;if(document.oncontextmenu=function(){return!1},n!=null&&(r=n.boxdata)!==null&&r!==void 0&&r.usercfgs.isVConsole)_=new(tt())({theme:n==null?void 0:n.mode});else if(!(n!=null&&(Z=n.boxdata)!==null&&Z!==void 0&&Z.usercfgs.isVConsole)&&_){var $,H;($=_)===null||$===void 0||(H=$.destroy)===null||H===void 0||H.call($)}n!=null&&n.boxdata.usercfgs.isWallpaperMode&&setTimeout(function(){u.run([{key:U.Z.userCfgs,val:JSON.stringify(C()(C()({},n==null?void 0:n.boxdata.usercfgs),{},{isWallpaperMode:!1}))}])},3e3)},[n==null||(s=n.boxdata)===null||s===void 0?void 0:s.usercfgs.isVConsole,n==null?void 0:n.boxdata.usercfgs.isWallpaperMode]),(0,t.jsxs)(ko,{children:[(0,t.jsxs)(O.Z,{className:n!=null&&(S=n.boxdata)!==null&&S!==void 0&&S.usercfgs.isWaitToggleSearchBar?z.container_top:z.container,children:[!["/my"].includes(M.pathname)&&(0,t.jsx)(Wo.ZP,{}),(0,t.jsx)("div",{draggable:!1,style:{position:"fixed",top:0,left:0,bottom:0,right:0,zIndex:-1,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundColor:"transparent",backgroundImage:A?"linear-gradient(to bottom,rgba(0,0,0,.2) 0,transparent 76px), url(".concat(A,"?_=").concat(n==null?void 0:n.random,")"):void 0}}),(0,t.jsxs)(qo.Z,{fixed:!0,maxWidth:!1,className:"".concat(z.content," ").concat(z[M.pathname.replace("/","")]),children:[n!=null&&n.boxdata.usercfgs.isWallpaperMode?null:(0,t.jsx)(v.Outlet,{}),(m=b.options)!==null&&m!==void 0&&m.type?(0,t.jsx)(so.Z,{className:z.alert,autoHideDuration:2e3,onClose:function(){return J()},open:(x=b.options)===null||x===void 0?void 0:x.open,anchorOrigin:{vertical:"top",horizontal:"left"},TransitionComponent:function(Z){return(0,t.jsx)(uo.Z,C()(C()({},Z),{},{direction:"down"}))},children:(0,t.jsx)(_o.Z,{sx:{width:"100%"},onClose:function(){return J()},severity:(h=b.options)===null||h===void 0?void 0:h.type,children:(y=b.options)===null||y===void 0?void 0:y.message})},b.options.key):(0,t.jsx)(so.Z,{className:z.alert,autoHideDuration:1e3,onClose:function(){return J()},open:(B=b.options)===null||B===void 0?void 0:B.open,anchorOrigin:{vertical:"top",horizontal:"left"},TransitionComponent:function(Z){return(0,t.jsx)(uo.Z,C()(C()({},Z),{},{direction:"down"}))},message:(P=b.options)!==null&&P!==void 0&&P.type||(D=b.options)===null||D===void 0?void 0:D.message},b.options.key)]}),(0,t.jsx)(Jo,{})]}),(n==null||(L=n.boxdata)===null||L===void 0||(I=L.usercfgs)===null||I===void 0?void 0:I.isHideBoxIcon)!==!0&&(0,t.jsx)(No,{}),(0,t.jsx)(Go,{open:X.visible,value:F.data,onClose:function(){return X.setVisible(!1)}})]})}},34747:function(co,V){V.Z={footer_container:"footer_container___QFPpy",footer_container_tow:"footer_container_tow___BWiJC",footer_bar:"footer_bar___Lok0r"}}}]);
