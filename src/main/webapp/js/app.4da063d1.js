(function(t){function e(e){for(var i,o,s=e[0],l=e[1],c=e[2],p=0,d=[];p<s.length;p++)o=s[p],n[o]&&d.push(n[o][0]),n[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(d.length)d.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],i=!0,s=1;s<a.length;s++){var l=a[s];0!==n[l]&&(i=!1)}i&&(r.splice(e--,1),t=o(o.s=a[0]))}return t}var i={},n={app:0},r=[];function o(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=i,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(a,i,function(e){return t[e]}.bind(null,i));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);var i=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-app-bar",{attrs:{app:"",dense:"",floating:"","clipped-left":""}},[a("v-app-bar-nav-icon"),a("v-toolbar-title",[t._v("Welcome to TinyPet'")]),a("v-spacer"),t.user?a("v-btn",{attrs:{icon:""},on:{click:t.logout}},[a("v-icon",[t._v("mdi-logout")])],1):a("v-btn",{attrs:{icon:""},on:{click:t.login}},[a("v-icon",[t._v("mdi-login")])],1)],1),t.user?a("v-navigation-drawer",{attrs:{"expand-on-hover":"",app:"",clipped:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("v-list",[a("v-list-item",[a("v-list-item-avatar",[a("v-img",{attrs:{src:t.user.image}})],1)],1),a("v-list-item",{attrs:{"two-line":""}},[a("v-list-item-content",[a("v-list-item-title",{staticClass:"title"},[t._v(t._s(t.user.fullName))]),a("v-list-item-subtitle",[t._v(t._s(t.user.email))])],1)],1)],1)]},proxy:!0}],null,!1,2010158060)},[a("v-divider"),a("v-list",{attrs:{nav:"",dense:""}},[a("v-list-item",{attrs:{link:"",to:"/newPetition"}},[a("v-list-item-icon",[a("v-icon",[t._v("mdi-file-plus")])],1),a("v-list-item-title",[t._v("Ajouter une nouvelle pétition")])],1),a("v-list-item",{attrs:{link:"",to:"/myPetitions"}},[a("v-list-item-icon",[a("v-icon",[t._v("mdi-file")])],1),a("v-list-item-title",[t._v("Mes pétitions")])],1)],1)],1):t._e(),a("v-content",[a("router-view")],1),a("v-footer",{attrs:{dark:"",padless:""}},[a("v-card",{staticClass:"indigo lighten-1 white--text text-center",attrs:{flat:"",tile:"",width:"100%"}},[a("v-card-text",t._l(t.icons,function(e){return a("v-btn",{key:e,staticClass:"mx-4 white--text",attrs:{icon:""}},[a("v-icon",{attrs:{size:"24px"}},[t._v(t._s(e))])],1)}),1),a("v-card-text",{staticClass:"white--text",attrs:{"pr-5":""}},[t._v("\n        Projet de développement application cloud native utilisant GAE et Vue.js réalisé pendant mon M1 Miage\n\n      ")]),a("v-divider"),a("v-card-text",{staticClass:"white--text"},[t._v("\n        "+t._s((new Date).getFullYear())+" — "),a("strong",[t._v("MG")])])],1)],1)],1)},r=[],o=a("2f62"),s={name:"App",data:()=>({icons:["mdi-facebook","mdi-twitter","mdi-google-plus","mdi-linkedin","mdi-instagram"]}),methods:{...Object(o["b"])(["assignUser","assignToken"]),login(){gapi.auth2.getAuthInstance().signIn().then(()=>{const t=gapi.auth2.getAuthInstance().currentUser.get(),e=t.getBasicProfile(),a={id:e.getId(),fullName:e.getName(),givenName:e.getGivenName(),familyName:e.getFamilyName(),image:e.getImageUrl(),email:e.getEmail()};this.assignUser(a),this.assignToken(t.getAuthResponse().id_token)}).catch(t=>console.log(t))},logout(){this.assignToken(null),this.assignUser(null),this.$router.push("/")}},computed:{...Object(o["c"])({user:"getUser"})}},l=s,c=a("2877"),u=a("6544"),p=a.n(u),d=a("7496"),m=a("40dc"),v=a("5bc1"),f=a("8336"),g=a("b0af"),b=a("99d9"),h=a("a75b"),_=a("ce7e"),V=a("553a"),y=a("132d"),k=a("adda"),x=a("8860"),w=a("da13"),C=a("8270"),P=a("5d23"),T=a("34c3"),j=a("f774"),I=a("2fa4"),O=a("2a7f"),U=Object(c["a"])(l,n,r,!1,null,null,null),L=U.exports;p()(U,{VApp:d["a"],VAppBar:m["a"],VAppBarNavIcon:v["a"],VBtn:f["a"],VCard:g["a"],VCardText:b["b"],VContent:h["a"],VDivider:_["a"],VFooter:V["a"],VIcon:y["a"],VImg:k["a"],VList:x["a"],VListItem:w["a"],VListItemAvatar:C["a"],VListItemContent:P["a"],VListItemIcon:T["a"],VListItemSubtitle:P["b"],VListItemTitle:P["c"],VNavigationDrawer:j["a"],VSpacer:I["a"],VToolbarTitle:O["a"]});var A=a("8c4f"),$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-tabs",{attrs:{centered:"","slider-color":"yellow","background-color":"transparent"},model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[a("v-tab",{attrs:{href:"#AlaUne"}},[t._v("\n      A la une\n    ")]),a("v-tab",{attrs:{href:"#Top100"}},[t._v("\n      Top 100\n    ")])],1),a("v-tabs-items",{model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[a("v-tab-item",{attrs:{value:"AlaUne"}},[a("my-petition-ala-une")],1),a("v-tab-item",{attrs:{value:"Top100"}},[a("my-top100")],1)],1)],1)},M=[],S=a("bc3a"),N=a.n(S),E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"fill-height":""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"6"}},[a("v-carousel",{attrs:{"show-arrows":!1,height:"300"}},t._l(t.petitions,function(e,i){return a("v-carousel-item",{key:i,attrs:{"reverse-transition":"fade-transition",transition:"fade-transition"}},[a("v-layout",{attrs:{column:"","align-content-center":""}},[a("v-flex",{attrs:{xs6:""}},[a("v-card",[a("v-card-title",{attrs:{"primary-title":"","mb-5":""}},[t._v("\n                  Petitions à la une\n                ")]),a("my-petition",{attrs:{petition:e,color:t.color(),signable:""}}),a("v-card-actions",[a("v-layout",{attrs:{row:"",wrap:"","align-center":"","justify-center":""}},[a("v-btn",{attrs:{icon:""},on:{click:t.refresh}},[a("v-icon",[t._v("mdi-refresh")])],1)],1)],1)],1)],1)],1)],1)}),1)],1)],1)],1)},q=[],B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{attrs:{color:t.color,dark:"",hover:"",width:"100%","mb-3":""}},[a("v-alert",{attrs:{type:"success",value:t.success}},[t._v("\n    "+t._s(t.successMsg)+"\n\n  ")]),a("v-alert",{attrs:{type:"error",value:t.error}}),a("v-card-text",{staticClass:"white--text"},[a("div",{staticClass:"headline mb-2"},[t._v(t._s(t.petition.name))]),t._v("\n    "+t._s(t.petition.description)+"\n  ")]),a("v-list-item",{staticClass:"grow"},[a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(t.petition.owner))])],1),a("v-row",{attrs:{align:"center",justify:"end"}},[a("v-icon",{staticClass:"mr-1"},[t._v("mdi-heart")]),a("span",{staticClass:"subheading mr-2"},[t._v(t._s(t.petition.total))])],1),t.signable?a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-btn",{attrs:{icon:"",dark:""},on:{click:t.sign}},[a("v-icon",[t._v("mdi-marker")])],1)],1):t._e()],1)],1)},D=[],F={props:{petition:Object,color:String,signable:Boolean},data:()=>({success:!1,error:!1,successMsg:"",errorMsg:""}),methods:{sign(){N.a.post(`sign/?access_token=${this.token}`,{petitionName:this.petition.name,userName:this.user.email}).then(t=>{this.successMsg="Petition ajoutée ! Merci pour votre contribution",this.success=!0}).catch(t=>{this.errorMsg=t,this.error=!0})}},computed:{...Object(o["c"])({user:"getUser",token:"getToken"})}},R=F,G=a("0798"),J=a("0fd9"),Y=Object(c["a"])(R,B,D,!1,null,null,null),z=Y.exports;p()(Y,{VAlert:G["a"],VBtn:f["a"],VCard:g["a"],VCardText:b["b"],VIcon:y["a"],VListItem:w["a"],VListItemContent:P["a"],VListItemTitle:P["c"],VRow:J["a"]});var K={components:{"my-petition":z},mounted(){N.a.post("all/").then(t=>{this.petitions=t.data.petitions.map(t=>t.properties)})},data:()=>({petitions:[]}),methods:{color(){return randomColor()},refresh(){const t=this.$_.last(this.petitions).name;N.a.post("all/",{lastKey:t}).then(t=>{this.petitions=t.data.petitions.map(t=>t.properties)})}}},W=K,H=a("5e66"),Q=a("3e35"),X=a("62ad"),Z=a("a523"),tt=a("0e8f"),et=a("a722"),at=Object(c["a"])(W,E,q,!1,null,null,null),it=at.exports;p()(at,{VBtn:f["a"],VCard:g["a"],VCardActions:b["a"],VCardTitle:b["c"],VCarousel:H["a"],VCarouselItem:Q["a"],VCol:X["a"],VContainer:Z["a"],VFlex:tt["a"],VIcon:y["a"],VLayout:et["a"],VRow:J["a"]});var nt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"fill-height":""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"6"}},[a("v-carousel",{attrs:{"show-arrows":!0,"show-arrows-on-hover":"",height:"350","hide-delimiters":!0}},t._l(t.petitions,function(e,i){return a("v-carousel-item",{key:i,attrs:{"reverse-transition":"fade-transition",transition:"fade-transition"}},[a("v-layout",{attrs:{column:"","align-content-center":""}},[a("v-flex",{attrs:{xs6:""}},[a("v-card",[a("v-card-title",{attrs:{"primary-title":"","mb-5":""}},[t._v("\n                  Top 100\n                ")]),a("my-petition",{attrs:{petition:e,color:t.color(),signable:""}})],1)],1)],1)],1)}),1)],1)],1)],1)},rt=[],ot={components:{"my-petition":z},mounted(){N.a.get("top100").then(t=>{this.petitions=t.data.items.map(t=>t.properties)})},data:()=>({petitions:[]}),methods:{color(){return randomColor()}}},st=ot,lt=Object(c["a"])(st,nt,rt,!1,null,null,null),ct=lt.exports;p()(lt,{VCard:g["a"],VCardTitle:b["c"],VCarousel:H["a"],VCarouselItem:Q["a"],VCol:X["a"],VContainer:Z["a"],VFlex:tt["a"],VLayout:et["a"],VRow:J["a"]});var ut={components:{"my-petition-ala-une":it,"my-top100":ct},data(){return{tabs:"AlaUne"}}},pt=ut,dt=a("71a3"),mt=a("c671"),vt=a("fe57"),ft=a("aac8"),gt=Object(c["a"])(pt,$,M,!1,null,null,null),bt=gt.exports;p()(gt,{VTab:dt["a"],VTabItem:mt["a"],VTabs:vt["a"],VTabsItems:ft["a"]});var ht=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",{attrs:{row:"",wrap:"","justify-center":""}},[a("v-data-iterator",{attrs:{items:t.myPetitions,"items-per-page":t.itemsPerPage,"footer-props":{itemsPerPageOptions:t.itemsPerPageOptions}},on:{"update:itemsPerPage":function(e){t.itemsPerPage=e},"update:items-per-page":function(e){t.itemsPerPage=e}},scopedSlots:t._u([{key:"header",fn:function(){return[a("v-toolbar",{staticClass:"mb-2",attrs:{color:"indigo darken-5",dark:"",flat:""}},[a("v-toolbar-title",[t._v("Mes pétitions signées et crées")])],1)]},proxy:!0},{key:"default",fn:function(e){return t._l(e.items,function(e){return a("v-layout",{key:e.name,attrs:{"mb-2":""}},[a("my-petition",{attrs:{petition:e,color:t.color()}})],1)})}}])})],1)],1)},_t=[],Vt={components:{"my-petition":z},mounted(){N.a.post("ListByUserName/",{userName:this.user.email}).then(t=>{this.myPetitions=t.data.items.map(t=>t.properties)})},data(){return{itemsPerPageOptions:[2,4,8,12],itemsPerPage:2,myPetitions:[]}},methods:{color(){return randomColor()}},computed:{...Object(o["c"])({user:"getUser"})}},yt=Vt,kt=a("c377"),xt=a("71d9"),wt=Object(c["a"])(yt,ht,_t,!1,null,null,null),Ct=wt.exports;p()(wt,{VContainer:Z["a"],VDataIterator:kt["a"],VLayout:et["a"],VToolbar:xt["a"],VToolbarTitle:O["a"]});var Pt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-card",{staticClass:"mx-auto",staticStyle:{"max-width":"600px"}},[a("v-system-bar",{attrs:{color:"deep-purple darken-4",dark:""}},[a("v-spacer"),a("v-icon",{attrs:{small:""}},[t._v("mdi-square")]),a("v-icon",{staticClass:"ml-1",attrs:{small:""}},[t._v("mdi-circle")]),a("v-icon",{staticClass:"ml-1",attrs:{small:""}},[t._v("mdi-triangle")])],1),a("v-toolbar",{attrs:{color:"deep-purple accent-4",cards:"",dark:"",flat:""}},[a("v-card-title",{staticClass:"title font-weight-regular"},[t._v("Renseigner les informations suivantes pour votre nouvelle pétition")]),a("v-spacer")],1),a("v-form",{ref:"form",staticClass:"pa-4 pt-6",model:{value:t.form,callback:function(e){t.form=e},expression:"form"}},[a("v-text-field",{attrs:{rules:[t.required],filled:"",color:"deep-purple",label:"Titre de la pétition"},model:{value:t.petition.name,callback:function(e){t.$set(t.petition,"name",e)},expression:"petition.name"}}),a("v-textarea",{attrs:{"auto-grow":"",filled:"",rules:[t.required],color:"deep-purple",label:"Description",rows:"2"},model:{value:t.petition.description,callback:function(e){t.$set(t.petition,"description",e)},expression:"petition.description"}}),a("v-checkbox",{attrs:{rules:[t.required],color:"deep-purple"},scopedSlots:t._u([{key:"label",fn:function(){return[t._v("\n          J'accepte les \n          "),a("a",{attrs:{href:"#"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.dialog=!0}}},[t._v("conditions d'utilisation")]),t._v("\n           et \n          "),a("a",{attrs:{href:"#"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.dialog=!0}}},[t._v("du traitement de mes données")]),t._v("*\n        ")]},proxy:!0}]),model:{value:t.agreement,callback:function(e){t.agreement=e},expression:"agreement"}})],1),a("v-divider"),a("v-card-actions",[a("v-btn",{attrs:{text:""},on:{click:function(e){return t.$refs.form.reset()}}},[t._v("\n        Effacer\n      ")]),a("v-spacer"),a("v-btn",{staticClass:"white--text",attrs:{disabled:!t.form,loading:t.isLoading,color:"deep-purple accent-4",depressed:""},on:{click:t.submit}},[t._v("Valider")])],1),a("v-dialog",{attrs:{absolute:"","max-width":"400",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline grey lighten-3"},[t._v("Informations légale")]),a("v-card-text",[t._v("\n          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        ")]),a("v-divider"),a("v-card-actions",[a("v-btn",{attrs:{text:""},on:{click:function(e){t.agreement=!1,t.dialog=!1}}},[t._v("\n            No\n          ")]),a("v-spacer"),a("v-btn",{staticClass:"white--text",attrs:{color:"deep-purple accent-4"},on:{click:function(e){t.agreement=!0,t.dialog=!1}}},[t._v("\n            Yes\n          ")])],1)],1)],1)],1)],1)},Tt=[],jt={data(){return{required:t=>!!t||"ce champs est obligatoire",petition:{name:"",description:""},form:!1,agreement:!1,isLoading:!1,dialog:!1}},methods:{submit(){this.$refs.form.validate()&&(this.petition.owner=this.user.email,N.a.post(`add/?access_token=${this.token}`,this.petition))}},computed:{...Object(o["c"])({user:"getUser",token:"getToken"})}},It=jt,Ot=a("ac7c"),Ut=a("169a"),Lt=a("4bd4"),At=a("afd9"),$t=a("8654"),Mt=a("a844"),St=Object(c["a"])(It,Pt,Tt,!1,null,null,null),Nt=St.exports;p()(St,{VBtn:f["a"],VCard:g["a"],VCardActions:b["a"],VCardText:b["b"],VCardTitle:b["c"],VCheckbox:Ot["a"],VContainer:Z["a"],VDialog:Ut["a"],VDivider:_["a"],VForm:Lt["a"],VIcon:y["a"],VSpacer:I["a"],VSystemBar:At["a"],VTextField:$t["a"],VTextarea:Mt["a"],VToolbar:xt["a"]}),i["a"].use(o["a"]);var Et=new o["a"].Store({state:{user:null,token:null},getters:{getUser:t=>{return t.user},getToken:t=>{return t.token}},mutations:{setUser(t,e){this.state.user=e},setToken(t,e){this.state.token=e}},actions:{assignUser({commit:t},e){t("setUser",e)},assignToken({commit:t},e){t("setToken",e)}}});i["a"].use(A["a"]);var qt=new A["a"]({routes:[{path:"/",name:"home",component:bt},{path:"/about",name:"about"},{path:"/myPetitions",name:"myPetitions",component:Ct,beforeEnter(t,e,a){Et.state.user?a():a("/")}},{path:"/newPetition",name:"newPetition",component:Nt,beforeEnter(t,e,a){Et.state.user?a():a("/")}}]}),Bt=a("f309");i["a"].use(Bt["a"]);var Dt=new Bt["a"]({icons:{iconfont:"mdi"}}),Ft=a("2ef0"),Rt=a.n(Ft);N.a.defaults.baseURL="https://tinypetition-dot-devcloud.appspot.com/_ah/api/petapi/v1/",Object.defineProperty(i["a"].prototype,"$_",{value:Rt.a}),i["a"].config.productionTip=!1,new i["a"]({router:qt,store:Et,vuetify:Dt,render:t=>t(L)}).$mount("#app")}});
//# sourceMappingURL=app.4da063d1.js.map