"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4188],{87918:function(na,K,c){c.d(K,{Z:function(){return q}});var S=c(63366),s=c(87462),u=c(67294),b=c(86010),U=c(94780),d=c(41796),j=c(88169),k=c(85893),W=(0,j.Z)((0,k.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel"),B=c(51705),r=c(98216),O=c(82607),A=c(71657),D=c(90948),H=c(1588),h=c(34867);function G(a){return(0,h.Z)("MuiChip",a)}var l=(0,H.Z)("MuiChip",["root","sizeSmall","sizeMedium","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]);const J=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant","tabIndex","skipFocusWhenDisabled"],Q=a=>{const{classes:o,disabled:p,size:e,color:t,iconColor:$,onDelete:C,clickable:n,variant:v}=a,y={root:["root",v,p&&"disabled",`size${(0,r.Z)(e)}`,`color${(0,r.Z)(t)}`,n&&"clickable",n&&`clickableColor${(0,r.Z)(t)}`,C&&"deletable",C&&`deletableColor${(0,r.Z)(t)}`,`${v}${(0,r.Z)(t)}`],label:["label",`label${(0,r.Z)(e)}`],avatar:["avatar",`avatar${(0,r.Z)(e)}`,`avatarColor${(0,r.Z)(t)}`],icon:["icon",`icon${(0,r.Z)(e)}`,`iconColor${(0,r.Z)($)}`],deleteIcon:["deleteIcon",`deleteIcon${(0,r.Z)(e)}`,`deleteIconColor${(0,r.Z)(t)}`,`deleteIcon${(0,r.Z)(v)}Color${(0,r.Z)(t)}`]};return(0,U.Z)(y,G,o)},X=(0,D.ZP)("div",{name:"MuiChip",slot:"Root",overridesResolver:(a,o)=>{const{ownerState:p}=a,{color:e,iconColor:t,clickable:$,onDelete:C,size:n,variant:v}=p;return[{[`& .${l.avatar}`]:o.avatar},{[`& .${l.avatar}`]:o[`avatar${(0,r.Z)(n)}`]},{[`& .${l.avatar}`]:o[`avatarColor${(0,r.Z)(e)}`]},{[`& .${l.icon}`]:o.icon},{[`& .${l.icon}`]:o[`icon${(0,r.Z)(n)}`]},{[`& .${l.icon}`]:o[`iconColor${(0,r.Z)(t)}`]},{[`& .${l.deleteIcon}`]:o.deleteIcon},{[`& .${l.deleteIcon}`]:o[`deleteIcon${(0,r.Z)(n)}`]},{[`& .${l.deleteIcon}`]:o[`deleteIconColor${(0,r.Z)(e)}`]},{[`& .${l.deleteIcon}`]:o[`deleteIcon${(0,r.Z)(v)}Color${(0,r.Z)(e)}`]},o.root,o[`size${(0,r.Z)(n)}`],o[`color${(0,r.Z)(e)}`],$&&o.clickable,$&&e!=="default"&&o[`clickableColor${(0,r.Z)(e)})`],C&&o.deletable,C&&e!=="default"&&o[`deletableColor${(0,r.Z)(e)}`],o[v],o[`${v}${(0,r.Z)(e)}`]]}})(({theme:a,ownerState:o})=>{const p=a.palette.mode==="light"?a.palette.grey[700]:a.palette.grey[300];return(0,s.Z)({maxWidth:"100%",fontFamily:a.typography.fontFamily,fontSize:a.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(a.vars||a).palette.text.primary,backgroundColor:(a.vars||a).palette.action.selected,borderRadius:32/2,whiteSpace:"nowrap",transition:a.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${l.disabled}`]:{opacity:(a.vars||a).palette.action.disabledOpacity,pointerEvents:"none"},[`& .${l.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:a.vars?a.vars.palette.Chip.defaultAvatarColor:p,fontSize:a.typography.pxToRem(12)},[`& .${l.avatarColorPrimary}`]:{color:(a.vars||a).palette.primary.contrastText,backgroundColor:(a.vars||a).palette.primary.dark},[`& .${l.avatarColorSecondary}`]:{color:(a.vars||a).palette.secondary.contrastText,backgroundColor:(a.vars||a).palette.secondary.dark},[`& .${l.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:a.typography.pxToRem(10)},[`& .${l.icon}`]:(0,s.Z)({marginLeft:5,marginRight:-6},o.size==="small"&&{fontSize:18,marginLeft:4,marginRight:-4},o.iconColor===o.color&&(0,s.Z)({color:a.vars?a.vars.palette.Chip.defaultIconColor:p},o.color!=="default"&&{color:"inherit"})),[`& .${l.deleteIcon}`]:(0,s.Z)({WebkitTapHighlightColor:"transparent",color:a.vars?`rgba(${a.vars.palette.text.primaryChannel} / 0.26)`:(0,d.Fq)(a.palette.text.primary,.26),fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:a.vars?`rgba(${a.vars.palette.text.primaryChannel} / 0.4)`:(0,d.Fq)(a.palette.text.primary,.4)}},o.size==="small"&&{fontSize:16,marginRight:4,marginLeft:-4},o.color!=="default"&&{color:a.vars?`rgba(${a.vars.palette[o.color].contrastTextChannel} / 0.7)`:(0,d.Fq)(a.palette[o.color].contrastText,.7),"&:hover, &:active":{color:(a.vars||a).palette[o.color].contrastText}})},o.size==="small"&&{height:24},o.color!=="default"&&{backgroundColor:(a.vars||a).palette[o.color].main,color:(a.vars||a).palette[o.color].contrastText},o.onDelete&&{[`&.${l.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.focusOpacity}))`:(0,d.Fq)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)}},o.onDelete&&o.color!=="default"&&{[`&.${l.focusVisible}`]:{backgroundColor:(a.vars||a).palette[o.color].dark}})},({theme:a,ownerState:o})=>(0,s.Z)({},o.clickable&&{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.hoverOpacity}))`:(0,d.Fq)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity)},[`&.${l.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.focusOpacity}))`:(0,d.Fq)(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)},"&:active":{boxShadow:(a.vars||a).shadows[1]}},o.clickable&&o.color!=="default"&&{[`&:hover, &.${l.focusVisible}`]:{backgroundColor:(a.vars||a).palette[o.color].dark}}),({theme:a,ownerState:o})=>(0,s.Z)({},o.variant==="outlined"&&{backgroundColor:"transparent",border:a.vars?`1px solid ${a.vars.palette.Chip.defaultBorder}`:`1px solid ${a.palette.mode==="light"?a.palette.grey[400]:a.palette.grey[700]}`,[`&.${l.clickable}:hover`]:{backgroundColor:(a.vars||a).palette.action.hover},[`&.${l.focusVisible}`]:{backgroundColor:(a.vars||a).palette.action.focus},[`& .${l.avatar}`]:{marginLeft:4},[`& .${l.avatarSmall}`]:{marginLeft:2},[`& .${l.icon}`]:{marginLeft:4},[`& .${l.iconSmall}`]:{marginLeft:2},[`& .${l.deleteIcon}`]:{marginRight:5},[`& .${l.deleteIconSmall}`]:{marginRight:3}},o.variant==="outlined"&&o.color!=="default"&&{color:(a.vars||a).palette[o.color].main,border:`1px solid ${a.vars?`rgba(${a.vars.palette[o.color].mainChannel} / 0.7)`:(0,d.Fq)(a.palette[o.color].main,.7)}`,[`&.${l.clickable}:hover`]:{backgroundColor:a.vars?`rgba(${a.vars.palette[o.color].mainChannel} / ${a.vars.palette.action.hoverOpacity})`:(0,d.Fq)(a.palette[o.color].main,a.palette.action.hoverOpacity)},[`&.${l.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette[o.color].mainChannel} / ${a.vars.palette.action.focusOpacity})`:(0,d.Fq)(a.palette[o.color].main,a.palette.action.focusOpacity)},[`& .${l.deleteIcon}`]:{color:a.vars?`rgba(${a.vars.palette[o.color].mainChannel} / 0.7)`:(0,d.Fq)(a.palette[o.color].main,.7),"&:hover, &:active":{color:(a.vars||a).palette[o.color].main}}})),Y=(0,D.ZP)("span",{name:"MuiChip",slot:"Label",overridesResolver:(a,o)=>{const{ownerState:p}=a,{size:e}=p;return[o.label,o[`label${(0,r.Z)(e)}`]]}})(({ownerState:a})=>(0,s.Z)({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},a.size==="small"&&{paddingLeft:8,paddingRight:8}));function m(a){return a.key==="Backspace"||a.key==="Delete"}var q=u.forwardRef(function(o,p){const e=(0,A.Z)({props:o,name:"MuiChip"}),{avatar:t,className:$,clickable:C,color:n="default",component:v,deleteIcon:y,disabled:I=!1,icon:Z,label:w,onClick:F,onDelete:f,onKeyDown:L,onKeyUp:T,size:_="medium",variant:aa="filled",tabIndex:oa,skipFocusWhenDisabled:la=!1}=e,ra=(0,S.Z)(e,J),x=u.useRef(null),ea=(0,B.Z)(x,p),V=i=>{i.stopPropagation(),f&&f(i)},ca=i=>{i.currentTarget===i.target&&m(i)&&i.preventDefault(),L&&L(i)},ia=i=>{i.currentTarget===i.target&&(f&&m(i)?f(i):i.key==="Escape"&&x.current&&x.current.blur()),T&&T(i)},z=C!==!1&&F?!0:C,R=z||f?O.Z:v||"div",P=(0,s.Z)({},e,{component:R,disabled:I,size:_,color:n,iconColor:u.isValidElement(Z)&&Z.props.color||n,onDelete:!!f,clickable:z,variant:aa}),g=Q(P),ta=R===O.Z?(0,s.Z)({component:v||"div",focusVisibleClassName:g.focusVisible},f&&{disableRipple:!0}):{};let M=null;f&&(M=y&&u.isValidElement(y)?u.cloneElement(y,{className:(0,b.Z)(y.props.className,g.deleteIcon),onClick:V}):(0,k.jsx)(W,{className:(0,b.Z)(g.deleteIcon),onClick:V}));let N=null;t&&u.isValidElement(t)&&(N=u.cloneElement(t,{className:(0,b.Z)(g.avatar,t.props.className)}));let E=null;return Z&&u.isValidElement(Z)&&(E=u.cloneElement(Z,{className:(0,b.Z)(g.icon,Z.props.className)})),(0,k.jsxs)(X,(0,s.Z)({as:R,className:(0,b.Z)(g.root,$),disabled:z&&I?!0:void 0,onClick:F,onKeyDown:ca,onKeyUp:ia,ref:ea,tabIndex:la&&I?-1:oa,ownerState:P},ta,ra,{children:[N||E,(0,k.jsx)(Y,{className:(0,b.Z)(g.label),ownerState:P,children:w}),M]}))})}}]);