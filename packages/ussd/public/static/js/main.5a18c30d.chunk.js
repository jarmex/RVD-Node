(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{299:function(e,t,a){e.exports=a(639)},304:function(e,t,a){},306:function(e,t,a){},639:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(33),i=a.n(l),o=(a(304),a(24)),c=a(25),s=a(27),u=a(26),m=a(28),d=a(643),p=a(645),h=a(646),f=a(37),g=(a(306),a(39)),E=a(58),v=a(3),b=a.n(v),y=a(38),j=a(147),w=a.n(j),C=a(291),O=a.n(C),S=a(288),N=a.n(S),k=a(181),x=a.n(k),P=a(30),D=a.n(P),B=a(132),I=a.n(B),R=a(48),$=a.n(R),L=a(289),q=a.n(L),A=a(292),M=a.n(A),T=a(290),W=a.n(T),F=a(50),K=a.n(F),z=a(89),U=a.n(z),Q=a(90),Y=a.n(Q),H=a(269),G=a.n(H),J=a(265),V=a.n(J),X=a(266),Z=a.n(X),_=a(267),ee=a.n(_),te=a(268),ae=a.n(te),ne=a(149),re=a.n(ne),le=a(175),ie=a.n(le),oe=function(e){var t=e.onNavigate;return r.a.createElement(ie.a,null,r.a.createElement(K.a,{button:!0,onClick:function(){return t("/dashboard")}},r.a.createElement(U.a,null,r.a.createElement(V.a,null)),r.a.createElement(Y.a,{primary:"Dashboard"})),r.a.createElement(K.a,{button:!0},r.a.createElement(U.a,null,r.a.createElement(Z.a,null)),r.a.createElement(Y.a,{primary:"Simulator"})),r.a.createElement(K.a,{button:!0,onClick:function(){return t("/msisdn")}},r.a.createElement(U.a,null,r.a.createElement(ee.a,null)),r.a.createElement(Y.a,{primary:"Reports"})),r.a.createElement(K.a,{button:!0},r.a.createElement(U.a,null,r.a.createElement(ae.a,null)),r.a.createElement(Y.a,{primary:"Plugins"})))},ce=function(){return r.a.createElement("div",null,r.a.createElement(G.a,{inset:!0},"Saved reports"),r.a.createElement(K.a,{button:!0},r.a.createElement(U.a,null,r.a.createElement(re.a,null)),r.a.createElement(Y.a,{primary:"Current month"})),r.a.createElement(K.a,{button:!0},r.a.createElement(U.a,null,r.a.createElement(re.a,null)),r.a.createElement(Y.a,{primary:"Last quarter"})),r.a.createElement(K.a,{button:!0},r.a.createElement(U.a,null,r.a.createElement(re.a,null)),r.a.createElement(Y.a,{primary:"Year-end sale"})))},se=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(oe,{onNavigate:this.props.onNavigate}),r.a.createElement(I.a,null),r.a.createElement(ce,{onNavigate:this.props.onNavigate}))}}]),t}(r.a.Component),ue=a(144),me=a.n(ue),de=a(22),pe=a(81);function he(){var e=Object(de.a)(["\n  {\n    daystransaction {\n      id\n      cellid\n      imsi\n      shortcode\n      moduleName\n      moduleLabel\n      stepName\n      stepKind\n      flowend\n      replyMessage\n      msisdn\n      sessionid\n      createdAt\n    }\n  }\n"]);return he=function(){return e},e}function fe(){var e=Object(de.a)(["\n  query transactions($msisdn: String!, $feedcount: Int) {\n    transactions(msisdn: $msisdn, feedcount: $feedcount) {\n      id\n      cellid\n      imsi\n      shortcode\n      moduleName\n      moduleLabel\n      stepName\n      stepKind\n      flowend\n      replyMessage\n      msisdn\n      sessionid\n      createdAt\n    }\n  }\n"]);return fe=function(){return e},e}function ge(){var e=Object(de.a)(["\n  {\n    weeklysummary {\n      DayName\n      Count\n    }\n  }\n"]);return ge=function(){return e},e}var Ee=Object(pe.a)(ge()),ve=Object(pe.a)(fe()),be=(Object(pe.a)(he()),a(274)),ye=a.n(be),je=a(275),we=a.n(je),Ce=a(178),Oe=a.n(Ce),Se=a(179),Ne=a.n(Se),ke=a(180),xe=a.n(ke),Pe=a(278),De=a.n(Pe),Be=a(177),Ie=a.n(Be),Re=a(129),$e=a.n(Re);var Le=function(){return r.a.createElement(f.Query,{query:Ee},function(e){var t=e.data,a=e.loading,n=e.error;if(a)return r.a.createElement("div",null,"Loading....");if(n)return r.a.createElement("div",null,"Error: Unable to load data.",JSON.stringify(n));var l=t.weeklysummary;return r.a.createElement(ye.a,{width:"99%",height:320},r.a.createElement(we.a,{data:l},r.a.createElement(Ne.a,{dataKey:"DayName"}),r.a.createElement(xe.a,null),r.a.createElement(De.a,{vertical:!1,strokeDasharray:"3 3"}),r.a.createElement(Ie.a,null),r.a.createElement($e.a,null),r.a.createElement(Oe.a,{type:"monotone",dataKey:"Count",stroke:"#82ca9d"})))})},qe=a(86),Ae=a.n(qe),Me=a(104);function Te(){var e=Object(de.a)(["\n  mutation refreshProject($sid: String!, $shortcode: String!) {\n    refreshProject(sid: $sid, shortcode: $shortcode) {\n      result\n      message\n    }\n  }\n"]);return Te=function(){return e},e}function We(){var e=Object(de.a)(["\n  mutation activateProject(\n    $sid: String!\n    $shortcode: String!\n    $friendlyName: String!\n  ) {\n    activateProject(\n      sid: $sid\n      shortcode: $shortcode\n      friendlyName: $friendlyName\n    ) {\n      result\n      message\n    }\n  }\n"]);return We=function(){return e},e}function Fe(){var e=Object(de.a)(["\n  query allprojects {\n    getprojects {\n      sid\n      accountSid\n      dateCreated\n      dateUpdated\n      shortcode\n      friendlyName\n    }\n  }\n"]);return Fe=function(){return e},e}var Ke=Object(pe.a)(Fe()),ze=Object(pe.a)(We()),Ue=Object(pe.a)(Te()),Qe=a(141),Ye=a.n(Qe),He=a(143),Ge=a.n(He),Je=a(12),Ve=a.n(Je),Xe=a(142),Ze=a.n(Xe),_e=a(105),et=a.n(_e),tt=a(41),at=a.n(tt),nt=a(283),rt=a.n(nt),lt=a(145),it=a.n(lt),ot=a(146),ct=a.n(ot),st=a(112),ut=a.n(st),mt=a(279),dt=a.n(mt),pt=a(47),ht=a.n(pt),ft=a(138),gt=a.n(ft),Et=a(43),vt=a(282),bt=a.n(vt);function yt(){var e=Object(de.a)(["\n  font-style: italic;\n"]);return yt=function(){return e},e}function jt(){var e=Object(de.a)(["\n  width: 120px;\n  text-align: right;\n  padding-right: 10px;\n"]);return jt=function(){return e},e}function wt(){var e=Object(de.a)(["\n  display: flex;\n  margin: 5px 0px;\n"]);return wt=function(){return e},e}function Ct(){var e=Object(de.a)(["\n  margin: 20px 0px 30px;\n"]);return Ct=function(){return e},e}function Ot(){var e=Object(de.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  flex: 0 0 auto;\n  margin: 8px 4px;\n"]);return Ot=function(){return e},e}var St=Et.a.div(Ot()),Nt=Et.a.div(Ct()),kt=Et.a.div(wt()),xt=Et.a.div(jt()),Pt=Et.a.div(yt()),Dt=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleClick=function(){return function(){a.setState({open:!0})}},a.handleClose=function(){a.setState({open:!1})},a.handleSaveChanges=function(){var e=Object(Me.a)(Ae.a.mark(function e(t){var n,r,l,i;return Ae.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,a.state.shortcode){e.next=4;break}return a.setState({message:"The shortcode cannot be empty"}),e.abrupt("return");case 4:return n=a.props.project,e.next=7,t({variables:{sid:n.sid,friendlyName:n.friendlyName,shortcode:a.state.shortcode}});case 7:r=e.sent,l=r.data,i=l.activateProject,a.setState({message:i.message}),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),a.setState({message:"Error occurred. Try again!!"});case 16:a.props.onClose();case 17:case"end":return e.stop()}},e,this,[[0,13]])}));return function(t){return e.apply(this,arguments)}}();var n=e.project,r=void 0===n?{}:n;return a.state={shortcode:r.shortcode||"",open:!1,vertical:"bottom",horizontal:"center",message:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.onClose,l=t.project,i=this.state,o=i.vertical,c=i.horizontal,s=i.open;return r.a.createElement("div",null,r.a.createElement(D.a,{variant:"h4",gutterBottom:!0,component:"h2"},l.friendlyName),r.a.createElement(Nt,null,r.a.createElement(kt,null,r.a.createElement(xt,null,"Application Id"),r.a.createElement(Pt,null,l.sid)),r.a.createElement(kt,null,r.a.createElement(xt,null,"Account ID"),r.a.createElement(Pt,null,l.accountSid)),r.a.createElement(kt,null,r.a.createElement(xt,null,"Created Date"),r.a.createElement(Pt,null,l.dateCreated))),r.a.createElement("div",null,"Enter the Short code for this project...."),r.a.createElement("form",{className:a.container,noValidate:!0,autoComplete:"off"},r.a.createElement(gt.a,{required:!0,id:"shortcode",name:"shortcode",label:"Short Code",className:a.textField,autoFocus:!0,margin:"dense",value:this.state.shortcode,onChange:function(t){return e.setState(Object(g.a)({},t.target.name,t.target.value))},fullWidth:!0}),r.a.createElement(St,null,r.a.createElement(ht.a,{onClick:n,color:"primary"},"Close"),r.a.createElement(f.Mutation,{mutation:ze,update:function(t){var a=t.readQuery({query:Ke}).getprojects.map(function(t){return t.sid===l.sid?Object.assign({},Object(E.a)({},t),{shortcode:e.state.shortcode}):t});t.writeQuery({query:Ke,data:{getprojects:a}})}},function(t){return r.a.createElement(ht.a,{onClick:function(){return e.handleSaveChanges(t)},color:"primary"},"Save Changes")}))),r.a.createElement(bt.a,{anchorOrigin:{vertical:o,horizontal:c},open:s,onClose:this.handleClose,ContentProps:{"aria-describedby":"message-id"},message:r.a.createElement("span",{id:"message-id"},this.state.message)}))}}]),t}(n.Component),Bt=Object(y.withStyles)(function(e){return{container:{display:"flex",flexWrap:"wrap"},textField:{marginLeft:e.spacing.unit,marginRight:e.spacing.unit}}})(Dt),It=r.a.createContext({}),Rt=It.Provider,$t=It.Consumer,Lt=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).onloginChange=function(e){if(e){var t=e.token,n=e.id;a.setState({token:t,userid:n,login:!0})}else a.setState({token:void 0,userid:void 0,login:!1})},a.state={token:"",userid:"",login:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e={onloginChange:this.onloginChange};return r.a.createElement(Rt,{value:Object(E.a)({},this.state,e)},this.props.children)}}]),t}(r.a.Component),qt=$t;ut.a.extend(dt.a);var At=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={open:!1,selectedProject:{}},a.handleClickOpen=function(){a.setState({open:!0})},a.handleClose=function(){a.setState({open:!1})},a.formatDate=function(e){return ut()(e).fromNow()},a.handleRefresh=function(){var e=Object(Me.a)(Ae.a.mark(function e(t,a,n){var r,l,i,o,c;return Ae.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),r=a.sid,l=a.shortcode){e.next=5;break}return alert("Cannot refresh. Try again"),e.abrupt("return");case 5:return e.prev=5,e.next=8,n({variables:{sid:r,shortcode:l}});case 8:i=e.sent,o=i.data,c=o.refreshProject.message,alert(c),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(5),alert("ERROR!!"+e.t0.message);case 17:case"end":return e.stop()}},e,this,[[5,14]])}));return function(t,a,n){return e.apply(this,arguments)}}(),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(f.Query,{query:Ke},function(a){var n=a.data,l=a.loading,i=a.error;if(l)return r.a.createElement("div",null,"Loading");if(i)return r.a.createElement("div",null,"Error!! Unable to query the project list");var o=n.getprojects;return r.a.createElement(qt,null,function(a){var n=a.login;return r.a.createElement(f.Mutation,{mutation:Ue},function(a){return r.a.createElement(at.a,{className:t.root},r.a.createElement(Ye.a,{className:t.table},r.a.createElement(Ze.a,null,r.a.createElement(et.a,null,r.a.createElement(Ve.a,null,"Application Id"),r.a.createElement(Ve.a,null,"Name"),r.a.createElement(Ve.a,null,"Short Code"),r.a.createElement(Ve.a,{align:"right"},"Date Created"),r.a.createElement(Ve.a,{align:"right"},"Date Updated"),r.a.createElement(Ve.a,{align:"right"}))),r.a.createElement(Ge.a,null,o.map(function(l){return r.a.createElement(et.a,{key:l.sid},r.a.createElement(Ve.a,{component:"th",scope:"row"},l.sid),r.a.createElement(Ve.a,null,l.friendlyName),r.a.createElement(Ve.a,null,l.shortcode),r.a.createElement(Ve.a,{align:"right"},e.formatDate(l.dateCreated)),r.a.createElement(Ve.a,{align:"right"},e.formatDate(l.dateUpdated)),r.a.createElement(Ve.a,{align:"right"},r.a.createElement("div",null,r.a.createElement($.a,{className:t.button,"aria-label":"Delete",onClick:function(t){return e.handleRefresh(t,l,a)}},r.a.createElement(me.a,null)),n?r.a.createElement($.a,{className:t.button,"aria-label":"Delete",onClick:function(t){e.setState({selectedProject:l}),e.handleClickOpen()}},r.a.createElement(rt.a,null)):null)))}))),r.a.createElement(it.a,{disableBackdropClick:!0,disableEscapeKeyDown:!0,open:e.state.open,onClose:e.handleClose,"aria-labelledby":"form-dialog-title"},r.a.createElement(ct.a,null,r.a.createElement(Bt,{project:e.state.selectedProject,onClose:e.handleClose}))))})})})}}]),t}(r.a.Component),Mt=Object(y.withStyles)(function(e){return{root:{width:"100%",overflowX:"auto"},table:{minWidth:700},button:{margin:e.spacing.unit}}})(At),Tt=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={open:!0,refresh:!0},a.handleDrawerOpen=function(){a.setState({open:!0})},a.handleDrawerClose=function(){a.setState({open:!1})},a.handleRefresh=function(){a.setState({refresh:!a.state.refresh})},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("div",{style:{float:"left"}},r.a.createElement(D.a,{variant:"h4",gutterBottom:!0,component:"h2"},"Past 7 days"," ")),r.a.createElement("div",{style:{float:"right",marginRight:"20px"}},r.a.createElement($.a,{className:t.button,"aria-label":"Delete",onClick:function(t){return e.handleRefresh()}},r.a.createElement(me.a,null)))),r.a.createElement("div",{style:{clear:"both"}},r.a.createElement(D.a,{component:"div",className:t.chartContainer},r.a.createElement(Le,{refresh:this.state.refresh})),r.a.createElement(D.a,{variant:"h4",gutterBottom:!0,component:"h2"},"Project List"),r.a.createElement("div",{className:t.tableContainer},r.a.createElement(Mt,null))))}}]),t}(r.a.Component),Wt=Object(y.withStyles)(function(e){return{appBarSpacer:e.mixins.toolbar,chartContainer:{marginLeft:-22},tableContainer:{height:320}}})(Tt),Ft=a(287),Kt=a.n(Ft),zt=a(286),Ut=a.n(zt),Qt=a(285),Yt=a.n(Qt),Ht=a(284),Gt=a.n(Ht),Jt=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={page:0,rowsPerPage:10},a.handleChangePage=function(e,t){a.setState({page:t})},a.handleChangeRowsPerPage=function(e){a.setState({rowsPerPage:e.target.value})},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.msisdn,n=t.feedcount,l=t.classes,i=this.state,o=i.rowsPerPage,c=i.page;return r.a.createElement(f.Query,{query:ve,variables:{msisdn:a,feedcount:n}},function(t){var a=t.data,n=t.loading,i=t.error;if(n)return r.a.createElement("div",null,"Loading.....");if(i)return r.a.createElement("div",null,"Error occured. Try again");var s=a.transactions,u=s.length;return r.a.createElement(at.a,null,r.a.createElement(Ye.a,{padding:"dense"},r.a.createElement(Ze.a,null,r.a.createElement(et.a,null,r.a.createElement(Ve.a,null,"Session #"),r.a.createElement(Ve.a,{className:l.narrowCell},"Cell ID"),r.a.createElement(Ve.a,{className:l.narrowCell},"Short Code"),r.a.createElement(Ve.a,null,"Module"),r.a.createElement(Ve.a,null,"Label"),r.a.createElement(Ve.a,null,"Step Name"),r.a.createElement(Ve.a,null,"Step Kind"),r.a.createElement(Ve.a,{className:l.miniCell},"Flow End"),r.a.createElement(Ve.a,null,"Date"))),r.a.createElement(Ge.a,null,s.slice(c*o,c*o+o).map(function(e){return r.a.createElement(et.a,{key:"".concat(e.id,"-").concat(e.sessionid)},r.a.createElement(Ve.a,null,e.sessionid),r.a.createElement(Ve.a,{className:l.narrowCell},e.cellid),r.a.createElement(Ve.a,{className:l.narrowCell},e.shortcode),r.a.createElement(Ve.a,null,e.moduleName),r.a.createElement(Ve.a,null,e.moduleLabel),r.a.createElement(Ve.a,null,e.stepName),r.a.createElement(Ve.a,null,e.stepKind),r.a.createElement(Ve.a,{className:l.miniCell},e.flowend?"Cont.":"End"),r.a.createElement(Ve.a,null,ut()(e.createdAt).format("YYYY-MM-DD HH:mm:ss")))}))),r.a.createElement(Gt.a,{rowsPerPageOptions:[5,10,25],component:"div",count:u,rowsPerPage:o,page:c,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onChangePage:e.handleChangePage,onChangeRowsPerPage:e.handleChangeRowsPerPage}))})}}]),t}(n.Component),Vt=Object(y.withStyles)({narrowCell:{width:"100px"},miniCell:{width:"65px"}})(Jt);function Xt(){var e=Object(de.a)(["\n  clear: both;\n"]);return Xt=function(){return e},e}function Zt(){var e=Object(de.a)(["\n  clear: both;\n"]);return Zt=function(){return e},e}function _t(){var e=Object(de.a)(["\n  float: right;\n"]);return _t=function(){return e},e}function ea(){var e=Object(de.a)(["\n  float: left;\n"]);return ea=function(){return e},e}var ta=Et.a.div(ea()),aa=Et.a.div(_t()),na=Et.a.div(Zt()),ra=Et.a.div(Xt()),la=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={msisdn:"",feedcount:0,open:!1,beforesearch:""},a.handleClickOpen=function(){a.setState({open:!0})},a.handleClose=function(){a.setState({open:!1})},a.pagetitle=function(){return a.state.msisdn?r.a.createElement(D.a,{variant:"h4",gutterBottom:!0,component:"h2"},"Result for ",a.state.msisdn):r.a.createElement(D.a,{variant:"h4",gutterBottom:!0,component:"h2"},"Search By MSISDN")},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(na,null,r.a.createElement(ta,null,this.pagetitle()),r.a.createElement(aa,null,r.a.createElement(ht.a,{variant:"outlined",color:"primary",onClick:this.handleClickOpen},"Search MSISDN"))),r.a.createElement(ra,null,this.state.msisdn?r.a.createElement(Vt,{msisdn:this.state.msisdn,feedcount:this.state.feedcount}):null),r.a.createElement(it.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"form-dialog-title"},r.a.createElement(Yt.a,{id:"form-dialog-title"},"Search MSISDN Transactions"),r.a.createElement(ct.a,null,r.a.createElement(Ut.a,null,"Seach for all transaction for a particular MSISDN. This result will return only the top 100 response."),r.a.createElement(gt.a,{autoFocus:!0,margin:"dense",id:"beforesearch",label:"Search By MSISDN",type:"text",name:"beforesearch",value:this.state.beforesearch,onChange:function(t){return e.setState(Object(g.a)({},t.target.name,t.target.value))},fullWidth:!0})),r.a.createElement(Kt.a,null,r.a.createElement(ht.a,{onClick:this.handleClose,color:"primary"},"Cancel"),r.a.createElement(ht.a,{onClick:function(){e.setState({msisdn:e.state.beforesearch}),e.handleClose()},color:"primary"},"Search"))))}}]),t}(n.Component),ia=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={open:!1},a.handleDrawerOpen=function(){a.setState({open:!0})},a.handleDrawerClose=function(){a.setState({open:!1})},a.onNavigate=function(e){return a.props.history.push(e)},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(w.a,null),r.a.createElement(N.a,{position:"absolute",className:b()(t.appBar,this.state.open&&t.appBarShift)},r.a.createElement(x.a,{disableGutters:!this.state.open,className:t.toolbar},r.a.createElement($.a,{color:"inherit","aria-label":"Open drawer",onClick:this.handleDrawerOpen,className:b()(t.menuButton,this.state.open&&t.menuButtonHidden)},r.a.createElement(q.a,null)),r.a.createElement(D.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:t.title},"RVD Node"),r.a.createElement($.a,{color:"inherit",onClick:function(){return e.props.history.push("/login")}},r.a.createElement(W.a,null)))),r.a.createElement(O.a,{variant:"permanent",classes:{paper:b()(t.drawerPaper,!this.state.open&&t.drawerPaperClose)},open:this.state.open},r.a.createElement("div",{className:t.toolbarIcon},r.a.createElement($.a,{onClick:this.handleDrawerClose},r.a.createElement(M.a,null))),r.a.createElement(I.a,null),r.a.createElement(se,{onNavigate:this.onNavigate})),r.a.createElement("main",{className:t.content},r.a.createElement("div",{className:t.appBarSpacer}),r.a.createElement(p.a,null,r.a.createElement(h.a,{path:"/data",component:Wt}),r.a.createElement(h.a,{path:"/msisdn",component:la}),r.a.createElement(h.a,{path:"/",component:Wt}))))}}]),t}(r.a.Component),oa=Object(y.withStyles)(function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(E.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginLeft:12,marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(g.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:7*e.spacing.unit},e.breakpoints.up("sm"),{width:9*e.spacing.unit}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,padding:3*e.spacing.unit,height:"100vh",overflow:"auto"},chartContainer:{marginLeft:-22},tableContainer:{height:320},h5:{marginBottom:2*e.spacing.unit}}})(ia),ca=a(262),sa=a(111),ua=a(644),ma=new ca.a({link:new sa.a({uri:"/graphql",credentials:"same-origin"}),cache:new ua.a}),da=a(294),pa=a.n(da),ha=a(140),fa=a.n(ha),ga=a(103),Ea=a.n(ga),va=a(139),ba=a.n(va),ya=a(295),ja=a.n(ya),wa=a(7),Ca=a.n(wa);function Oa(){var e=Object(de.a)(["\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      sid\n      organizationSid\n      status\n      emailAddress\n      friendlyName\n      role\n      type\n      dateCreated\n      dateUpdated\n    }\n  }\n"]);return Oa=function(){return e},e}var Sa=Object(pe.a)(Oa()),Na=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:""},a.handleLogin=function(){var e=Object(Me.a)(Ae.a.mark(function e(t,n,r){var l,i,o,c;return Ae.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),e.prev=1,a.state.email&&a.state.password){e.next=5;break}return alert("Information provide is invalid."),e.abrupt("return");case 5:return e.next=7,n({variables:{username:a.state.email,password:a.state.password}});case 7:l=e.sent,i=l.data.login,o=i.sid,c=i.token,r({id:o,token:c}),a.props.history.push("/dashboard"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(1),alert(e.t0.message);case 16:case"end":return e.stop()}},e,this,[[1,13]])}));return function(t,a,n){return e.apply(this,arguments)}}(),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement("main",{className:t.main},r.a.createElement(w.a,null),r.a.createElement(at.a,{className:t.paper},r.a.createElement(pa.a,{className:t.avatar},r.a.createElement(ja.a,null)),r.a.createElement(D.a,{component:"h1",variant:"h5"},"Sign in"),r.a.createElement(f.Mutation,{mutation:Sa},function(a){return r.a.createElement(qt,null,function(n){var l=n.onloginChange;return r.a.createElement("form",{method:"POST",className:t.form,onSubmit:function(t){return e.handleLogin(t,a,l)}},r.a.createElement(fa.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(ba.a,{htmlFor:"email"},"Email Address"),r.a.createElement(Ea.a,{required:!0,id:"email",name:"email",autoComplete:"email",autoFocus:!0,onChange:function(t){return e.setState(Object(g.a)({},t.target.name,t.target.value))},value:e.state.email})),r.a.createElement(fa.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(ba.a,{htmlFor:"password"},"Password"),r.a.createElement(Ea.a,{required:!0,name:"password",type:"password",id:"password",autoComplete:"current-password",value:e.state.password,onChange:function(t){return e.setState(Object(g.a)({},t.target.name,t.target.value))}})),r.a.createElement(ht.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit},"Sign in"))})})))}}]),t}(r.a.Component),ka=Ca()(function(e){return{main:Object(g.a)({width:"auto",display:"block",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(400+3*e.spacing.unit*2),{width:400,marginLeft:"auto",marginRight:"auto"}),paper:{marginTop:8*e.spacing.unit,display:"flex",flexDirection:"column",alignItems:"center",padding:"".concat(2*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px")},avatar:{margin:e.spacing.unit,backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing.unit},submit:{marginTop:3*e.spacing.unit}}})(Na),xa=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(f.ApolloProvider,{client:ma},r.a.createElement(Lt,null,r.a.createElement(d.a,null,r.a.createElement(p.a,null,r.a.createElement(h.a,{exact:!0,path:"/login",component:ka}),r.a.createElement(h.a,{path:"/",component:oa})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(xa,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[299,2,1]]]);
//# sourceMappingURL=main.5a18c30d.chunk.js.map