import{a as Q,b as U}from"./chunk-S5MWYYLC.js";import{Bb as N,Ea as s,Eb as V,Ia as I,Ja as F,Jb as W,K as B,Ka as L,Ma as o,Na as q,O as D,Oa as x,Ob as H,Qa as A,Ra as w,Sa as k,Ta as z,Tb as j,Ua as E,W as b,Wa as _,Yb as R,ja as T,la as r,ma as y,q as S,ra as d,sa as P,xa as n,ya as t,za as u}from"./chunk-JOPKYVPV.js";var G=(()=>{let l=class l{constructor(){this.type="button",this.active=!1,this.onChange=i=>{},this.onTouch=()=>{}}writeValue(i){this.active=i}onClick(){this.type==="button"&&(this.active=!this.active,this.onChange(this.active))}registerOnChange(i){this.onChange=i}registerOnTouched(i){this.onTouch=i}setDisabledState(i){}};l.\u0275fac=function(p){return new(p||l)},l.\u0275cmp=b({type:l,selectors:[["app-acco-trigger"]],inputs:{options:"options",type:"type"},standalone:!0,features:[z([{provide:N,useExisting:D(()=>l),multi:!0}]),E],decls:7,vars:3,consts:[[1,"accoTrigger",3,"click"],[1,"accoTrigger__caption"],[1,"accoTrigger__icon"],[1,"arrowInBtn"],[1,"arrowInBtn__triangle"],[1,"arrowInBtn__stick"]],template:function(p,e){p&1&&(n(0,"button",0),s("click",function(){return e.onClick()}),n(1,"div",1),o(2),t(),n(3,"div",2)(4,"div",3),u(5,"div",4)(6,"div",5),t()()()),p&2&&(P("accoTrigger--active",e.active),r(2),x(" ",(e.options==null?null:e.options.caption)||"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"," "))},styles:["[_ngcontent-%COMP%]:root{--color-blue: #5532EB;--color-blue1: #4A4AC6;--color-pink: #FF99EC;--color-black: #000;--color-black1: #333;--color-black2: #111;--color-white: #fff;--color-gray: #807d7d;--color-gray1: #f2f3f4;--color-red: #e40038;--color-green: green;--color-text-gray: #a8a8a8;--color-light-gray: #eee}.accoTrigger[_ngcontent-%COMP%]{color:var(--color-black1);border:none;text-align:start;width:100%;background-color:var(--color-gray1);border-radius:32px;padding:30px;font-size:24px;line-height:32px;font-weight:700;display:flex;justify-content:space-between;align-items:center;cursor:pointer}.accoTrigger[_ngcontent-%COMP%]   .accoTrigger__icon[_ngcontent-%COMP%]{margin-left:10px}.accoTrigger--active[_ngcontent-%COMP%]   .arrowInBtn[_ngcontent-%COMP%]{transform:rotate(-90deg)}.accoTrigger[_ngcontent-%COMP%]:hover{color:var(--color-blue1)}.accoTrigger[_ngcontent-%COMP%]:hover   .arrowInBtn[_ngcontent-%COMP%]   .arrowInBtn__triangle[_ngcontent-%COMP%]{border-color:var(--color-blue1)}.accoTrigger[_ngcontent-%COMP%]:hover   .arrowInBtn[_ngcontent-%COMP%]   .arrowInBtn__stick[_ngcontent-%COMP%]{background-color:var(--color-blue1)}@media (min-width: 768px){.accoTrigger[_ngcontent-%COMP%]{padding:48px}.accoTrigger[_ngcontent-%COMP%]   .accoTrigger__caption[_ngcontent-%COMP%]{text-overflow:ellipsis;text-wrap:nowrap;overflow:hidden}}.arrowInBtn[_ngcontent-%COMP%]{position:relative;width:28px;height:24px;transform:rotate(-180deg);transition:.2s}.arrowInBtn[_ngcontent-%COMP%]   .arrowInBtn__triangle[_ngcontent-%COMP%]{position:absolute;width:14px;height:14px;border-width:2px 2px 0 0;border-style:solid;border-radius:0 2px 0 0;border-color:var(--color-black1);box-sizing:border-box;top:50%;right:28px;transform:rotate(-135deg);transform-origin:right top;transition:.2s}.arrowInBtn[_ngcontent-%COMP%]   .arrowInBtn__stick[_ngcontent-%COMP%]{width:22px;height:2px;border-radius:2px;background-color:var(--color-black1);position:absolute;top:50%;right:4px;transform:translateY(-50%);transition:.2s}"],changeDetection:0});let m=l;return m})();var Y=["advertisingVideo"],C=m=>({caption:m}),se=(()=>{let l=class l{constructor(i,p,e){this.pagesService=i,this.mobileDetectService=p,this.router=e,this.appOpportunityMenu={media:{type:"link",caption:"\u041C\u0435\u0434\u0438\u0430 \u043F\u0440\u043E \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u044E \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0439"},locations:{active:!1,type:"button",caption:"\u041F\u043E\u0434\u0431\u043E\u0440\u043A\u0430 \u043B\u043E\u043A\u0430\u0446\u0438\u0439 \u0434\u043B\u044F \u0441\u0432\u0438\u0434\u0430\u043D\u0438\u0439"},company:{type:"link",caption:"\u0411\u043B\u043E\u0433 \u043E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u0438 \u043F\u0440\u0430\u0432\u043E\u0432\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"},conditions:{active:!1,type:"button",caption:"\u0422\u0430\u0440\u0438\u0444\u044B \u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F"},questions:{active:!1,type:"button",caption:"\u041F\u043E\u043C\u043E\u0449\u044C \u0438 \u0447\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B"},tariff:{type:"link",caption:"\u0422\u0430\u0440\u0438\u0444\u044B"},linkToQuestions:{type:"link",caption:"\u041F\u043E\u043C\u043E\u0449\u044C \u0438 \u0447\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B"},legalInf:{type:"link",caption:"\u041F\u0440\u0430\u0432\u043E\u0432\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"},linkToCompany:{type:"link",caption:"\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438"}}}ngOnInit(){this.lSub=this.pagesService.currentLanguage.pipe(B(i=>this.curLang=i)).subscribe(i=>{})}ngAfterViewInit(){}aboutProgressiveImage(){window.addEventListener&&window.requestAnimationFrame&&document.getElementsByClassName&&(document.readyState==="complete"?this.onWindowLoaded():window.addEventListener("load",this.onWindowLoaded.bind(this),!1))}onWindowLoaded(){let i=document.getElementsByClassName("progressive replace"),p,e=document.getElementById("pageWrap");window.addEventListener("resize",a,!1),this.pageWrapScrollSub=S(e,"scroll").subscribe(c=>{a(c)}),g();function a(c){p=p||setTimeout(function(){p=null,requestAnimationFrame(g)},300)}function g(){let c=e.scrollTop,v=c+window.innerHeight,M,f,O,h=0;for(;h<i.length;)M=i[h].getBoundingClientRect(),f=c+M.top,O=f+M.height,c<O&&v>f?(X(i[h]),i[h].classList.remove("replace")):h++}function X(c){if(!c||!c.href)return;let v=new Image;c.dataset&&(v.srcset=c.dataset.srcset||"",v.sizes=c.dataset.sizes||""),v.src=c.href,v.className="reveal",v.complete?M():v.onload=M;function M(){c.addEventListener("click",function(f){f.preventDefault()},!1),c.appendChild(v).addEventListener("animationend",function(f){let O=c.querySelector&&c.querySelector("img.preview");O&&(f.target.alt=O.alt||"",c.removeChild(O),f.target.classList.remove("reveal"))})}}}onAccoTriggerClick(i){this.router.navigate(i)}getContent(i){return Q[i][this.curLang]}ngOnDestroy(){this.pageWrapScrollSub?.unsubscribe(),this.lSub?.unsubscribe()}};l.\u0275fac=function(p){return new(p||l)(y(R),y(U,8),y(j))},l.\u0275cmp=b({type:l,selectors:[["app-home-page"]],viewQuery:function(p,e){if(p&1&&I(Y,5),p&2){let a;F(a=L())&&(e.advertisingVideo=a.first)}},standalone:!0,features:[E],decls:128,vars:40,consts:[[1,"page"],[1,"container","page__container"],[1,"mainPicture"],["media","(max-width: 767px)","srcset","assets/images/home-page/mainPicForMobile.png"],["src","assets/images/home-page/mainPic.png","alt","mainPicture",1,"mainPicture__img"],[1,"aboutAppInfo"],[1,"aboutAppInfo__text"],[1,"moduleTitle"],[1,"aboutAppInfo__cont"],[1,"aboutAppInfo__infoLinks","aboutAppInfo__infoLinks--forDesktop"],[1,"linkToApp"],["href","https://www.apple.com/app-store","target","_blank",1,"linkToApp__item"],["src","assets/images/store/linkIOSShort.svg","alt","linkIOS",1,"linkToApp__img"],["href","https://play.google.com","target","_blank",1,"linkToApp__item"],["src","assets/images/store/linkAndroidLite.svg","alt","linkAndroid",1,"linkToApp__img"],["href","https://appgallery.huawei.com","target","_blank",1,"linkToApp__item"],["src","assets/images/store/linkAppGallery.svg","alt","linkAppGallery",1,"linkToApp__img"],[1,"aboutAppInfo__infoLinks","aboutAppInfo__infoLinks--forMobile"],[1,"downloadApp",3,"click"],[1,"downloadApp__title"],[1,"downloadApp__icon"],["alt","storeIcon",3,"src"],[1,"navigationMenu"],[1,"navigationMenu__item"],[1,"squareNavBtn",3,"click"],[1,"squareNavBtn__image"],["src","assets/images/home-page/linkToArticlesX2.jpg","alt","linkToArticles"],[1,"squareNavBtn__title"],["src","assets/images/home-page/linkToLocationX2.jpg","alt","linkToLocation"],[1,"squareNavBtn"],["src","assets/images/home-page/linkToPsychologyX2.jpg","alt","linkToPsychology"],[1,"appOpportunity"],[1,"appOpportunity__menu"],[1,"menuAcco","appOpportunity__item"],[1,"menuAcco__trigger"],["type","link",3,"click","options"],[3,"ngModelChange","options","ngModel"],[1,"menuAcco__content"],[1,"appAdv"],[1,"appAdv__image"],["src","assets/images/appAdv1.png","alt","appAdvantage"],[1,"appAdv__content"],[1,"appAdv__text"],["src","assets/images/appAdv2.png","alt","appAdvantage"],[1,"appAdv","appAdv--forDesktop"],["src","assets/images/appAdv3.png","alt","appAdvantage"],[1,"linkToApp","appAdv__links"],[1,"appAdv","appAdv--forMobile"],[1,"downloadApp","appAdv__download",3,"click"],[1,"aboutCompany"],[1,"navTetris"],[1,"navTetris__row","navTetris__row--wrap"],[1,"navTetris__block"],[1,"navTetris__block","navTetris__block--size--wide"],[1,"navTetris__row","navTetris__row--nowrap"]],template:function(p,e){p&1&&(n(0,"main",0)(1,"div",1)(2,"picture",2),u(3,"source",3)(4,"img",4),t(),n(5,"div",5)(6,"div",6)(7,"h1",7),o(8),t(),n(9,"div",8),o(10),t()(),n(11,"div",9)(12,"div",10)(13,"a",11),u(14,"img",12),t(),n(15,"a",13),u(16,"img",14),t(),n(17,"a",15),u(18,"img",16),t()()(),n(19,"div",17)(20,"div",18),s("click",function(){return e.mobileDetectService==null?null:e.mobileDetectService.goToDeviceStore()}),n(21,"div",19),o(22,"\u0421\u043A\u0430\u0447\u0430\u0439\u0442\u0435"),u(23,"br"),o(24,"\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435"),t(),n(25,"div",20),u(26,"img",21),t()()()(),n(27,"nav",22)(28,"div",23)(29,"div",24),s("click",function(){return e.onAccoTriggerClick(["/media"])}),n(30,"div",25),u(31,"img",26),t(),n(32,"div",27),o(33," \u041C\u0435\u0434\u0438\u0430 \u043F\u0440\u043E \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F "),t()()(),n(34,"div",23)(35,"div",24),s("click",function(){return e.onAccoTriggerClick(["/locations"])}),n(36,"div",25),u(37,"img",28),t(),n(38,"div",27),o(39," \u041B\u043E\u043A\u0430\u0446\u0438\u0438 \u0434\u043B\u044F \u0441\u0432\u0438\u0434\u0430\u043D\u0438\u0439 "),t()()(),n(40,"div",23)(41,"div",29)(42,"div",25),u(43,"img",30),t(),n(44,"div",27),o(45," \u041F\u0441\u0438\u0445\u043E\u043B\u043E\xAD\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0442\u0435\u0441\u0442\u044B "),t()()()(),n(46,"section",31)(47,"ul",32)(48,"li",33)(49,"div",34)(50,"app-acco-trigger",35),s("click",function(){return e.onAccoTriggerClick(["/media"])}),t()()(),n(51,"li",33)(52,"div",34)(53,"app-acco-trigger",36),k("ngModelChange",function(g){return w(e.appOpportunityMenu.locations.active,g)||(e.appOpportunityMenu.locations.active=g),g}),t()(),n(54,"div",37)(55,"div",38)(56,"div",39),u(57,"img",40),t(),n(58,"div",41)(59,"h2",7),o(60," \u0417\u043D\u0430\u043A\u043E\u043C\u044C\u0441\u044F \u043E\u043D\u043B\u0430\u0439\u043D "),t(),n(61,"div",42),o(62," \u0415\u0441\u043B\u0438 \u0442\u044B \u0441\u0442\u0440\u0435\u043C\u0438\u0448\u044C\u0441\u044F \u0432\u0441\u0442\u0440\u0435\u0442\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0445 \u043B\u044E\u0434\u0435\u0439, \u0432 Dazzlink \u0442\u044B \u043D\u0430\u0439\u0434\u0435\u0448\u044C \u0432\u0441\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438, \u043F\u0440\u0438\u0437\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0435 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u043C. \u0417\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u043E\u043D\u043B\u0430\u0439\u043D \u2014 \u044D\u0442\u043E \u043F\u0440\u043E\u0441\u0442\u043E. "),t()()(),n(63,"div",38)(64,"div",39),u(65,"img",43),t(),n(66,"div",41)(67,"h2",7),o(68," \u0412\u044B\u0445\u043E\u0434\u0438 \u0432 \u043E\u0444\u0444\u043B\u0430\u0439\u043D "),t(),n(69,"div",42),o(70," \u0415\u0441\u043B\u0438 \u0442\u044B \u0441\u0442\u0440\u0435\u043C\u0438\u0448\u044C\u0441\u044F \u0432\u0441\u0442\u0440\u0435\u0442\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0445 \u043B\u044E\u0434\u0435\u0439, \u0442\u043E Dazzlink \u043F\u043E\u043C\u043E\u0436\u0435\u0442 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u0431\u0435 \u0441\u0432\u0438\u0434\u0430\u043D\u0438\u0435. \u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0438\u0442 \u043C\u0435\u0441\u0442\u0430 \u0434\u043B\u044F \u0432\u0441\u0442\u0440\u0435\u0447\u0438, \u0437\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u0443\u0435\u0442 \u0441\u0442\u043E\u043B\u0438\u043A \u0438 \u043E\u0444\u043E\u0440\u043C\u0438\u0442 \u0441\u043A\u0438\u0434\u043A\u0443. "),t()()(),n(71,"div",38)(72,"div",39),u(73,"img",40),t(),n(74,"div",41)(75,"h2",7),o(76," \u041E\u0431\u0449\u0430\u0439\u0441\u044F \u0441 \u0443\u043C\u043E\u043C "),t(),n(77,"div",42),o(78," \u0415\u0441\u043B\u0438 \u0442\u044B \u0441\u0442\u0440\u0435\u043C\u0438\u0448\u044C\u0441\u044F \u0432\u0441\u0442\u0440\u0435\u0442\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0445 \u043B\u044E\u0434\u0435\u0439, \u0432 Dazzlink \u0442\u044B \u043D\u0430\u0439\u0434\u0435\u0448\u044C \u043F\u043E\u043C\u043E\u0449\u044C \u0432 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0438 \u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438 \u0438 \u043E\u0441\u043E\u0437\u043D\u0430\u043D\u043D\u043E\u043C \u0432\u044B\u0431\u043E\u0440\u0435 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430. "),t()()(),n(79,"div",44)(80,"div",39),u(81,"img",45),t(),n(82,"div",41)(83,"h2",7),o(84," \u0421\u043A\u0430\u0447\u0430\u0439\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 "),t(),n(85,"div",42),o(86," \u0422\u044B\u0441\u044F\u0447\u0438 \u043B\u044E\u0434\u0435\u0439 \u0443\u0436\u0435 \u0434\u043E\u0432\u0435\u0440\u0438\u043B\u0438 \u043D\u0430\u043C \u0441\u0432\u043E\u044E \u0441\u0443\u0434\u044C\u0431\u0443, \u043F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u0438 \u043D\u0430\u0439\u0434\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0432\u044C \u043D\u0430 \u0432\u0441\u044E \u0436\u0438\u0437\u043D\u044C "),t(),n(87,"div",46)(88,"a",11),u(89,"img",12),t(),n(90,"a",13),u(91,"img",14),t(),n(92,"a",15),u(93,"img",16),t()()()(),n(94,"div",47)(95,"div",48),s("click",function(){return e.mobileDetectService==null?null:e.mobileDetectService.goToDeviceStore()}),n(96,"div",19),o(97,"\u0421\u043A\u0430\u0447\u0430\u0439\u0442\u0435"),u(98,"br"),o(99,"\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435"),t(),n(100,"div",20),u(101,"img",21),t()()()()(),n(102,"li",33)(103,"div",34)(104,"app-acco-trigger",35),s("click",function(){return e.onAccoTriggerClick(["/agreements"])}),t()()(),n(105,"li",33)(106,"div",34)(107,"app-acco-trigger",36),k("ngModelChange",function(g){return w(e.appOpportunityMenu.conditions.active,g)||(e.appOpportunityMenu.conditions.active=g),g}),t()(),n(108,"div",37)(109,"div",49),o(110," \u0422\u0430\u0440\u0438\u0444\u044B \u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F "),t()()(),n(111,"li",33)(112,"div",34)(113,"app-acco-trigger",36),k("ngModelChange",function(g){return w(e.appOpportunityMenu.questions.active,g)||(e.appOpportunityMenu.questions.active=g),g}),t()(),n(114,"div",37)(115,"div",49),o(116," \u041F\u043E\u043C\u043E\u0449\u044C \u0438 \u0447\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B "),t()()()()(),n(117,"section",50)(118,"div",51)(119,"div",52)(120,"app-acco-trigger",35),s("click",function(){return e.onAccoTriggerClick(["/agreements"])}),t()(),n(121,"div",53)(122,"app-acco-trigger",35),s("click",function(){return e.onAccoTriggerClick(["/agreements"])}),t()()(),n(123,"div",54)(124,"div",53)(125,"app-acco-trigger",35),s("click",function(){return e.onAccoTriggerClick(["/agreements"])}),t()(),n(126,"div",52)(127,"app-acco-trigger",35),s("click",function(){return e.onAccoTriggerClick(["/agreements"])}),t()()()()()()),p&2&&(r(8),q(e.getContent("home-aboutAppInfo-title")),r(2),x(" ",e.getContent("home-aboutAppInfo-cont")," "),r(16),d("src",e.mobileDetectService==null?null:e.mobileDetectService.mobileStoreIconSrc(),T),r(24),d("options",_(22,C,e.appOpportunityMenu.media.caption)),r(3),d("options",_(24,C,e.appOpportunityMenu.locations.caption)),A("ngModel",e.appOpportunityMenu.locations.active),r(),P("menuAcco__content--hidden",!e.appOpportunityMenu.locations.active),r(47),d("src",e.mobileDetectService==null?null:e.mobileDetectService.mobileStoreIconSrc(),T),r(3),d("options",_(26,C,e.appOpportunityMenu.company.caption)),r(3),d("options",_(28,C,e.appOpportunityMenu.conditions.caption)),A("ngModel",e.appOpportunityMenu.conditions.active),r(),P("menuAcco__content--hidden",!e.appOpportunityMenu.conditions.active),r(5),d("options",_(30,C,e.appOpportunityMenu.questions.caption)),A("ngModel",e.appOpportunityMenu.questions.active),r(),P("menuAcco__content--hidden",!e.appOpportunityMenu.questions.active),r(6),d("options",_(32,C,e.appOpportunityMenu.tariff.caption)),r(2),d("options",_(34,C,e.appOpportunityMenu.linkToQuestions.caption)),r(3),d("options",_(36,C,e.appOpportunityMenu.legalInf.caption)),r(2),d("options",_(38,C,e.appOpportunityMenu.linkToCompany.caption)))},dependencies:[G,H,V,W],styles:['[_ngcontent-%COMP%]:root{--color-blue: #5532EB;--color-blue1: #4A4AC6;--color-pink: #FF99EC;--color-black: #000;--color-black1: #333;--color-black2: #111;--color-white: #fff;--color-gray: #807d7d;--color-gray1: #f2f3f4;--color-red: #e40038;--color-green: green;--color-text-gray: #a8a8a8;--color-light-gray: #eee}.page[_ngcontent-%COMP%]   .page__container[_ngcontent-%COMP%]{margin-top:24px;margin-bottom:32px}@media (min-width: 768px){.page[_ngcontent-%COMP%]   .page__container[_ngcontent-%COMP%]{margin-top:48px;margin-bottom:48px}}.example[_ngcontent-%COMP%]{width:600px;height:600px;background:url("./media/mainPic-K7IPUKJB.png") center center no-repeat;background-size:cover;margin-bottom:30px;border-radius:72px;box-shadow:inset 0 0 15px 15px #fff}.mainVideo[_ngcontent-%COMP%]{overflow:hidden;position:relative;margin-bottom:24px;border-radius:16px}.mainVideo[_ngcontent-%COMP%]   .mainVideo__video[_ngcontent-%COMP%]{display:block;width:100%;height:min(56.2vw - 22px,675px);object-position:center center;object-fit:cover}.mainVideo[_ngcontent-%COMP%]   .mainVideo__customPoster[_ngcontent-%COMP%]{cursor:pointer;opacity:1;width:100%;height:100%;background:url("./media/bannerForVideo-UYVNMNUN.png") center center no-repeat;background-size:cover;position:absolute;top:0;left:0;z-index:10;border-radius:16px;transition:.5s}.mainVideo[_ngcontent-%COMP%]   .mainVideo__customPoster--hidden[_ngcontent-%COMP%]{pointer-events:none;transition:.5s;opacity:0}@media (min-width: 768px){.mainVideo[_ngcontent-%COMP%]{border-radius:32px;margin-bottom:48px}.mainVideo[_ngcontent-%COMP%]   .mainVideo__customPoster[_ngcontent-%COMP%]{border-radius:32px}}.playIcon[_ngcontent-%COMP%]{position:absolute;bottom:14px;left:14px;width:32px;height:32px;background:url("./media/playIcon-BS6ABFE2.svg") center center no-repeat;background-size:cover}@media (min-width: 768px){.playIcon[_ngcontent-%COMP%]{width:72px;height:72px;bottom:48px;left:48px}}.aboutApp[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.aboutApp[_ngcontent-%COMP%]   .aboutApp__slogan[_ngcontent-%COMP%]{margin-top:16px;max-width:310px;text-align:center}.aboutApp[_ngcontent-%COMP%]   .aboutApp__links[_ngcontent-%COMP%]{margin-top:16px}.aboutApp[_ngcontent-%COMP%]   .aboutApp__mockup[_ngcontent-%COMP%]{margin-top:64px;width:100%}.aboutApp[_ngcontent-%COMP%]   .aboutApp__mockup[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}@media (min-width: 768px){.aboutApp[_ngcontent-%COMP%]   .aboutApp__slogan[_ngcontent-%COMP%]{max-width:580px;font-size:18px}}.appOpportunity[_ngcontent-%COMP%]   .appOpportunity__head[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.appOpportunity[_ngcontent-%COMP%]   .appOpportunity__head[_ngcontent-%COMP%]   .appOpportunity__desc[_ngcontent-%COMP%]{max-width:586px;text-align:center;margin-top:16px}.appOpportunity[_ngcontent-%COMP%]   .appOpportunity__head[_ngcontent-%COMP%]   .appOpportunity__join[_ngcontent-%COMP%]{width:100%;max-width:328px;margin-top:16px}.appOpportunity[_ngcontent-%COMP%]   .appOpportunity__menu[_ngcontent-%COMP%]   .appOpportunity__item[_ngcontent-%COMP%]{margin-bottom:24px}.appOpportunity[_ngcontent-%COMP%]   .appOpportunity__menu[_ngcontent-%COMP%]   .appOpportunity__item[_ngcontent-%COMP%]:last-child{margin:0}@media (min-width: 768px){.appOpportunity[_ngcontent-%COMP%]   .appOpportunity__head[_ngcontent-%COMP%]   .appOpportunity__desc[_ngcontent-%COMP%]{font-size:18px}}.menuAcco[_ngcontent-%COMP%]   .menuAcco__content[_ngcontent-%COMP%]{margin:64px 0}.menuAcco[_ngcontent-%COMP%]   .menuAcco__content--hidden[_ngcontent-%COMP%]{display:none}.menuAcco[_ngcontent-%COMP%]:last-child   .menuAcco__content[_ngcontent-%COMP%]{margin-bottom:0}@media (min-width: 768px){.menuAcco[_ngcontent-%COMP%]   .menuAcco__content[_ngcontent-%COMP%]{margin:120px 0}}.appAdv[_ngcontent-%COMP%]{font-size:24px;margin-top:72px;display:flex;flex-direction:column;column-gap:11.7%}.appAdv[_ngcontent-%COMP%]   .appAdv__image[_ngcontent-%COMP%]{flex:1;max-width:500px}.appAdv[_ngcontent-%COMP%]   .appAdv__image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%}.appAdv[_ngcontent-%COMP%]   .appAdv__content[_ngcontent-%COMP%]{margin-top:24px;flex:1}.appAdv[_ngcontent-%COMP%]   .appAdv__content[_ngcontent-%COMP%]   .appAdv__text[_ngcontent-%COMP%]{margin-top:12px}.appAdv[_ngcontent-%COMP%]   .appAdv__content[_ngcontent-%COMP%]   .appAdv__links[_ngcontent-%COMP%]{margin-top:24px}.appAdv[_ngcontent-%COMP%]:first-child{margin-top:0}.appAdv--forDesktop[_ngcontent-%COMP%]{display:none}@media (min-width: 768px){.appAdv[_ngcontent-%COMP%]{margin-top:160px;flex-direction:row;align-items:center}.appAdv[_ngcontent-%COMP%]   .appAdv__content[_ngcontent-%COMP%]{margin-top:0}.appAdv[_ngcontent-%COMP%]:nth-child(2n){flex-direction:row-reverse}.appAdv--forDesktop[_ngcontent-%COMP%]{display:flex}.appAdv--forMobile[_ngcontent-%COMP%]{display:none}}.mainPicture[_ngcontent-%COMP%]{display:block;overflow:hidden;border-radius:32px}.mainPicture[_ngcontent-%COMP%]   .mainPicture__img[_ngcontent-%COMP%]{width:100%}@media (min-width: 768px){.mainPicture[_ngcontent-%COMP%]{border-radius:48px}}a.progressive[_ngcontent-%COMP%]{position:relative;display:block;overflow:hidden;outline:none}a.progressive[_ngcontent-%COMP%]:not(.replace){cursor:default}a.progressive[_ngcontent-%COMP%]   img.preview[_ngcontent-%COMP%]{filter:blur(2vw);transform:scale(1.05)}  a.progressive img{display:block;width:100%;max-width:none;height:auto;border:0 none}  a.progressive img.reveal{position:absolute;left:0;top:0;will-change:transform,opacity;animation:_ngcontent-%COMP%_reveal 1s ease-out}@keyframes _ngcontent-%COMP%_reveal{0%{transform:scale(1.05);opacity:0}to{transform:scale(1);opacity:1}}.aboutAppInfo[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin:24px 0 72px;font-size:24px}.aboutAppInfo[_ngcontent-%COMP%]   .aboutAppInfo__text[_ngcontent-%COMP%]{max-width:586px}.aboutAppInfo[_ngcontent-%COMP%]   .aboutAppInfo__text[_ngcontent-%COMP%]   .aboutAppInfo__cont[_ngcontent-%COMP%]{margin-top:12px}.aboutAppInfo[_ngcontent-%COMP%]   .aboutAppInfo__infoLinks[_ngcontent-%COMP%]{margin-top:24px}.aboutAppInfo[_ngcontent-%COMP%]   .aboutAppInfo__infoLinks--forDesktop[_ngcontent-%COMP%]{display:none}.aboutAppInfo[_ngcontent-%COMP%]   .aboutAppInfo__infoLinks--forMobile[_ngcontent-%COMP%]{display:block}@media (min-width: 768px){.aboutAppInfo[_ngcontent-%COMP%]{flex-direction:row;justify-content:space-between;column-gap:40px;margin:48px 0 120px}.aboutAppInfo[_ngcontent-%COMP%]   .aboutAppInfo__infoLinks[_ngcontent-%COMP%]{margin-top:14px}.aboutAppInfo[_ngcontent-%COMP%]   .aboutAppInfo__infoLinks--forDesktop[_ngcontent-%COMP%]{display:block}.aboutAppInfo[_ngcontent-%COMP%]   .aboutAppInfo__infoLinks--forMobile[_ngcontent-%COMP%]{display:none}}.navigationMenu[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;column-gap:48px;row-gap:48px;margin-bottom:72px;justify-content:center}.navigationMenu[_ngcontent-%COMP%]   .navigationMenu__item[_ngcontent-%COMP%]{display:flex}@media (min-width: 768px){.navigationMenu[_ngcontent-%COMP%]{align-items:flex-start;flex-direction:row;margin-bottom:120px}}.squareNavBtn[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;background-color:var(--color-gray1);border-radius:32px;overflow:hidden;cursor:pointer}.squareNavBtn[_ngcontent-%COMP%]   .squareNavBtn__image[_ngcontent-%COMP%]{min-height:180px;border-radius:32px;overflow:hidden;position:relative;z-index:10}.squareNavBtn[_ngcontent-%COMP%]   .squareNavBtn__image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%}.squareNavBtn[_ngcontent-%COMP%]   .squareNavBtn__title[_ngcontent-%COMP%]{font-size:24px;line-height:32px;padding:12px 24px 24px;text-align:center}@media (min-width: 768px){.squareNavBtn[_ngcontent-%COMP%], .squareNavBtn[_ngcontent-%COMP%]   .squareNavBtn__image[_ngcontent-%COMP%]{border-radius:48px}}.squareNavBtn[_ngcontent-%COMP%]:hover   .squareNavBtn__title[_ngcontent-%COMP%]{color:var(--color-blue1)}.navTetris[_ngcontent-%COMP%]{display:flex;flex-direction:column;row-gap:24px;margin-top:120px}.navTetris[_ngcontent-%COMP%]   .navTetris__row[_ngcontent-%COMP%]{display:flex;column-gap:24px;row-gap:24px}.navTetris[_ngcontent-%COMP%]   .navTetris__row[_ngcontent-%COMP%]   .navTetris__block[_ngcontent-%COMP%]{flex:1}.navTetris[_ngcontent-%COMP%]   .navTetris__row[_ngcontent-%COMP%]   .navTetris__block--size--wide[_ngcontent-%COMP%]{flex:2}.navTetris[_ngcontent-%COMP%]   .navTetris__row--wrap[_ngcontent-%COMP%]{flex-wrap:wrap}.navTetris[_ngcontent-%COMP%]   .navTetris__row--nowrap[_ngcontent-%COMP%]   .navTetris__block[_ngcontent-%COMP%]{overflow:hidden}@media (max-width: 767px){.navTetris[_ngcontent-%COMP%]{margin-top:72px;row-gap:24px}.navTetris[_ngcontent-%COMP%]   .navTetris__row[_ngcontent-%COMP%]{flex-direction:column}}'],changeDetection:0});let m=l;return m})();export{se as HomePageComponent};