import{a as $}from"./chunk-3YLRU6KE.js";import{$a as z,Aa as p,Ba as L,Ca as x,Ga as n,Ha as o,Ia as m,Ma as f,Na as c,Oa as d,V as O,Xa as a,Xb as P,Y as I,Ya as V,Yb as Y,Z as A,Za as j,aa as h,ab as H,bb as W,db as C,eb as v,ha as s,i as E,ia as g,k as F,ka as T,oa as N,qa as B,sa as u,ta as S,vb as Q,wa as q,xb as R,ya as D,za as M}from"./chunk-NVZOHAZI.js";var b=class{constructor(){this.name="Ivan",this.radius=12}getName(e){return e||this.name}hideScroll(){document.documentElement.classList.add("noScroll")}showScroll(){document.documentElement.classList.remove("noScroll")}};var U=()=>({exact:!0}),G=()=>({category:null});function X(i,e){if(i&1){let l=f();n(0,"div",18)(1,"div",19)(2,"div",20)(3,"div",21)(4,"a",22),c("click",function(){s(l);let t=d();return g(t.goToAnotherPage())}),m(5,"img",4),o()(),n(6,"div",21)(7,"div",23),c("click",function(){s(l);let t=d();return g(t.closeNavPopup())}),m(8,"div",24),o()()()(),n(9,"div",25)(10,"div",26)(11,"nav",27)(12,"ul",28)(13,"li",29)(14,"a",30),c("click",function(){s(l);let t=d();return g(t.goToAnotherPage("/"))}),a(15,"\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435"),o()(),n(16,"li",31)(17,"a",32),c("click",function(){s(l);let t=d();return g(t.goToAnotherPage("/media"))}),a(18,"\u041C\u0435\u0434\u0438\u0430"),o()(),n(19,"li",29)(20,"a",33),c("click",function(){s(l);let t=d();return g(t.goToAnotherPage())}),a(21,"\u041B\u043E\u043A\u0430\u0446\u0438\u0438"),o()(),n(22,"li",31)(23,"a",34),c("click",function(){s(l);let t=d();return g(t.goToAnotherPage())}),a(24,"\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F"),o()()()()()()(),n(25,"div",35),c("click",function(){s(l);let t=d();return g(t.closeNavPopup())}),o()}if(i&2){let l=d();u(13),p("routerLinkActiveOptions",v(2,U)),u(6),p("routerLinkActiveOptions",l.routerLinkActiveOptions)}}var ce=(()=>{let e=class e extends b{constructor(){super(...arguments),this.routerLinkActiveOptions={matrixParams:"ignored",queryParams:"ignored",fragment:"ignored",paths:"subset"},this.showNavModal=!1}requiredMethod(){return Math.PI*Math.pow(this.radius,2)}goToAnotherPage(r){this.closeNavPopup()}openNavPopup(){this.showNavModal=!0,this.hideScroll()}closeNavPopup(){this.showNavModal=!1,this.showScroll()}};e.\u0275fac=(()=>{let r;return function(_){return(r||(r=T(e)))(_||e)}})(),e.\u0275cmp=h({type:e,selectors:[["app-header"]],standalone:!0,features:[D,C],decls:25,vars:6,consts:[[1,"header"],[1,"container","header__container"],[1,"header__col"],["routerLink","/",1,"logo"],["src","assets/images/fullLogo.svg","alt","logotip",1,"logo__image"],[1,"header__col","header__col--alignRight"],[1,"header__menu"],[1,"menu"],[1,"menu__list"],["routerLinkActive","menu__item--active",1,"menu__item",3,"routerLinkActiveOptions"],["routerLink","/",1,"menu__link"],["routerLinkActive","menu__item--active",1,"menu__item"],["routerLink","/media",1,"menu__link"],["routerLink","/locations",1,"menu__link",3,"queryParams"],["routerLink","/company",1,"menu__link"],[1,"hamburger2",3,"click"],[1,"hamburger2__line"],[1,"shadow"],[1,"navigationModal"],[1,"navigationModal__header"],[1,"headerInModal"],[1,"headerInModal__col"],["routerLink","/",1,"logo",3,"click"],[1,"closeButtonInWindow",3,"click"],[1,"iconForCloseInModal"],[1,"navigationModal__contentWrap"],[1,"navigationModal__content"],[1,"menuInNavModal","navigationModal__menu"],[1,"menuInNavModal__list"],["routerLinkActive","menuInNavModal__item--active",1,"menuInNavModal__item",3,"routerLinkActiveOptions"],["routerLink","/",1,"menuInNavModal__link",3,"click"],["routerLinkActive","menuInNavModal__item--active",1,"menuInNavModal__item"],["routerLink","/media",1,"menuInNavModal__link",3,"click"],["routerLink","/locations",1,"menuInNavModal__link",3,"click"],["routerLink","/company",1,"menuInNavModal__link",3,"click"],[1,"backgroundForNavModal",3,"click"]],template:function(t,_){t&1&&(n(0,"header",0)(1,"div",1)(2,"div",2)(3,"a",3),m(4,"img",4),o()(),n(5,"div",5)(6,"div",6)(7,"nav",7)(8,"ul",8)(9,"li",9)(10,"a",10),a(11,"\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435"),o()(),n(12,"li",11)(13,"a",12),a(14,"\u041C\u0435\u0434\u0438\u0430"),o()(),n(15,"li",9)(16,"a",13),a(17,"\u041B\u043E\u043A\u0430\u0446\u0438\u0438"),o()(),n(18,"li",11)(19,"a",14),a(20,"\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F"),o()()()()(),n(21,"button",15),c("click",function(){return _.openNavPopup()}),m(22,"div",16),o()()(),m(23,"div",17),o(),M(24,X,26,3)),t&2&&(u(9),p("routerLinkActiveOptions",v(4,U)),u(6),p("routerLinkActiveOptions",_.routerLinkActiveOptions),u(),p("queryParams",v(5,G)),u(8),x(24,_.showNavModal?24:-1))},dependencies:[P,Y],styles:['[_ngcontent-%COMP%]:root{--color-blue: #5532EB;--color-blue1: #4A4AC6;--color-pink: #FF99EC;--color-black: #000;--color-black1: #333;--color-black2: #111;--color-white: #fff;--color-gray: #807d7d;--color-gray1: #f2f3f4;--color-red: #e40038;--color-green: green;--color-text-gray: #a8a8a8;--color-light-gray: #eee}.header[_ngcontent-%COMP%]{background-color:#fff}.header[_ngcontent-%COMP%]   .header__container[_ngcontent-%COMP%]{padding:20px;display:flex;column-gap:20px}.header[_ngcontent-%COMP%]   .header__container[_ngcontent-%COMP%]   .header__col[_ngcontent-%COMP%]{display:flex;align-items:center;flex:1}.header[_ngcontent-%COMP%]   .header__container[_ngcontent-%COMP%]   .header__col--alignRight[_ngcontent-%COMP%]{justify-content:flex-end}.header[_ngcontent-%COMP%]   .header__container[_ngcontent-%COMP%]   .header__col[_ngcontent-%COMP%]   .header__menu[_ngcontent-%COMP%]{font-size:16px;display:none}@media (min-width: 768px){.header[_ngcontent-%COMP%]   .header__container[_ngcontent-%COMP%]   .header__col[_ngcontent-%COMP%]   .header__menu[_ngcontent-%COMP%]{display:block}}@media (min-width: 768px){.header[_ngcontent-%COMP%]   .header__container[_ngcontent-%COMP%]{padding:24px 20px}}.logo[_ngcontent-%COMP%]{height:24px;display:flex;max-height:100%;overflow:hidden}.logo[_ngcontent-%COMP%]   .logo__image[_ngcontent-%COMP%]{display:block;max-width:100%;max-height:100%}@media (min-width: 768px){.logo[_ngcontent-%COMP%]{height:32px}}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]{display:flex}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]{background-color:transparent;border-radius:12px}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]   .menu__link[_ngcontent-%COMP%]{cursor:default;display:block;text-decoration:none;padding:4px 8px;color:var(--color-black1)}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item--active[_ngcontent-%COMP%]   .menu__link[_ngcontent-%COMP%]{color:var(--color-text-gray)}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]:not(.menu__item--active):hover{background-color:var(--color-black1)}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]:not(.menu__item--active):hover   .menu__link[_ngcontent-%COMP%]{cursor:pointer;color:var(--color-white)}.shadow[_ngcontent-%COMP%]{display:none;position:absolute;height:20px;width:100%;background:linear-gradient(0deg,#fff0,#fff)}@media (min-width: 768px){.shadow[_ngcontent-%COMP%]{height:34px}}.languageInHeader[_ngcontent-%COMP%]{display:none;margin-left:16px;width:80px}@media (min-width: 768px){.languageInHeader[_ngcontent-%COMP%]{display:block}}.hamburger[_ngcontent-%COMP%]{padding:0;cursor:pointer;border:none;margin-left:20px;background-color:transparent;position:relative}.hamburger[_ngcontent-%COMP%]:before{content:"";display:block;height:50px;width:50px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.hamburger[_ngcontent-%COMP%]   .hamburger__line[_ngcontent-%COMP%]{margin:8px 0;width:22px;background-color:var(--color-black1);height:2px;border-radius:2px;position:relative}.hamburger[_ngcontent-%COMP%]   .hamburger__line[_ngcontent-%COMP%]:before{content:"";width:22px;background-color:var(--color-black1);height:2px;border-radius:2px;display:block;position:absolute;bottom:8px}.hamburger[_ngcontent-%COMP%]   .hamburger__line[_ngcontent-%COMP%]:after{content:"";width:22px;background-color:var(--color-black1);height:2px;border-radius:2px;display:block;position:absolute;top:8px}@media (min-width: 768px){.hamburger[_ngcontent-%COMP%]{display:none}}.hamburger2[_ngcontent-%COMP%]{background-color:transparent;width:22px;height:9px;padding:0;cursor:pointer;border:none;position:relative}.hamburger2[_ngcontent-%COMP%]   .hamburger2__line[_ngcontent-%COMP%]{top:0;width:100%;background-color:var(--color-black1);height:2px;border-radius:2px;position:absolute}.hamburger2[_ngcontent-%COMP%]:before{content:"";width:100%;background-color:var(--color-black1);height:2px;border-radius:2px;display:block;position:absolute;bottom:0}.hamburger2[_ngcontent-%COMP%]:after{content:"";display:block;height:50px;width:50px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}@media (min-width: 768px){.hamburger2[_ngcontent-%COMP%]{display:none}}.navigationModal[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:fixed;background-color:#f2f3f4;z-index:110;top:50%;left:50%;transform:translate(-50%,-50%);padding:80px;width:100%;min-width:300px;max-width:800px;max-height:90%;box-sizing:border-box;border-radius:10px}.navigationModal[_ngcontent-%COMP%]   .navigationModal__header[_ngcontent-%COMP%]{margin-bottom:20px}.navigationModal[_ngcontent-%COMP%]   .navigationModal__header[_ngcontent-%COMP%]   .headerInModal[_ngcontent-%COMP%]{display:flex;column-gap:20px;align-items:center;justify-content:space-between}.navigationModal[_ngcontent-%COMP%]   .navigationModal__contentWrap[_ngcontent-%COMP%]{flex:1;overflow-y:auto}.navigationModal[_ngcontent-%COMP%]   .navigationModal__contentWrap[_ngcontent-%COMP%]   .navigationModal__content[_ngcontent-%COMP%]   .navigationModal__menu[_ngcontent-%COMP%]{font-size:24px;line-height:32px;font-weight:700;margin-top:24px}.navigationModal[_ngcontent-%COMP%]   .navigationModal__footer[_ngcontent-%COMP%]{margin-top:30px}.navigationModal[_ngcontent-%COMP%]   .navigationModal__footer[_ngcontent-%COMP%]   .footerInModal[_ngcontent-%COMP%]{display:flex;column-gap:20px;align-items:center;justify-content:space-between}.navigationModal[_ngcontent-%COMP%]   .navigationModal__footer[_ngcontent-%COMP%]   .footerInModal__lang[_ngcontent-%COMP%]{margin-left:-16px}@media (max-width: 767px){.navigationModal[_ngcontent-%COMP%]{padding:20px;height:100%;max-height:unset;border-radius:0;justify-content:center;background-color:#fff}}@media (min-width: 768px){.navigationModal[_ngcontent-%COMP%]{border:2px solid;padding:30px}}.backgroundForNavModal[_ngcontent-%COMP%]{position:fixed;top:0;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);width:100%;height:100%;z-index:105}.menuInNavModal[_ngcontent-%COMP%]   .menuInNavModal__list[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}.menuInNavModal[_ngcontent-%COMP%]   .menuInNavModal__list[_ngcontent-%COMP%]   .menuInNavModal__item[_ngcontent-%COMP%]   .menuInNavModal__link[_ngcontent-%COMP%]{cursor:pointer;display:block;text-decoration:none;padding:12px 12px 12px 0;color:var(--color-black1)}.menuInNavModal[_ngcontent-%COMP%]   .menuInNavModal__list[_ngcontent-%COMP%]   .menuInNavModal__item--active[_ngcontent-%COMP%]   .menuInNavModal__link[_ngcontent-%COMP%]{cursor:default;color:var(--color-text-gray)}'],changeDetection:0});let i=e;return i})();var Z=(()=>{let e=class e{constructor(r){this._document=r,this.myWindow=this._document.defaultView,this.tg=this.myWindow.Telegram?.WebApp}get mainTgButton(){return this.tg?.MainButton}get backTgButton(){return this.tg?.BackButton}sendData(r){this.tg?.sendData(JSON.stringify(r))}ready(){this.tg?.ready()}};e.\u0275fac=function(t){return new(t||e)(I(R))},e.\u0275prov=O({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var J=(()=>{let e=class e{constructor(){this.modalData$=new F(null),this.messToAnotherComp$=new E}open(r){this.modalData$.next(r),this.hideScroll()}close(){this.modalData$.next(null),this.showScroll()}sendMessage(r){this.messToAnotherComp$.next(r)}hideScroll(){document.documentElement.classList.add("noScroll")}showScroll(){document.documentElement.classList.remove("noScroll")}};e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=O({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var K=(()=>{let e=class e{constructor(){this.show=!1,this.showChange=new N}get productName(){return"\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435"}closeModal(){this.show=!1,this.showChange.emit(!1)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=h({type:e,selectors:[["app-qr-code-modal"]],inputs:{show:"show"},outputs:{showChange:"showChange"},standalone:!0,features:[C],decls:6,vars:2,consts:[[1,"qrModalOld"],[1,"qrModalOld__content"],["type","button",1,"qrModalOld__close",3,"click"],[1,"qrModalOld__qrBlock"],["src","assets/images/qrCode.png","alt","qr",1,"qrModalOld__qrImage"]],template:function(t,_){t&1&&(n(0,"div",0)(1,"div",1)(2,"button",2),c("click",function(){return _.closeModal()}),a(3,"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"),o(),n(4,"div",3),m(5,"img",4),o()()()),t&2&&L("qrModalOld--show",_.show)},styles:["[_ngcontent-%COMP%]:root{--color-blue: #5532EB;--color-blue1: #4A4AC6;--color-pink: #FF99EC;--color-black: #000;--color-black1: #333;--color-black2: #111;--color-white: #fff;--color-gray: #807d7d;--color-gray1: #f2f3f4;--color-red: #e40038;--color-green: green;--color-text-gray: #a8a8a8;--color-light-gray: #eee}.qrModalOld[_ngcontent-%COMP%]{display:none;position:fixed;background-color:#ffffffe6;top:0;height:100%;width:100%;z-index:110}.qrModalOld[_ngcontent-%COMP%]   .qrModalOld__content[_ngcontent-%COMP%]{display:flex;flex-direction:column;max-width:300px;padding:20px}.qrModalOld[_ngcontent-%COMP%]   .qrModalOld__content[_ngcontent-%COMP%]   .qrModalOld__close[_ngcontent-%COMP%]{align-self:flex-end;cursor:pointer;margin-bottom:20px}.qrModalOld[_ngcontent-%COMP%]   .qrModalOld__content[_ngcontent-%COMP%]   .qrModalOld__qrBlock[_ngcontent-%COMP%]{overflow:hidden}.qrModalOld[_ngcontent-%COMP%]   .qrModalOld__content[_ngcontent-%COMP%]   .qrModalOld__qrBlock[_ngcontent-%COMP%]   .qrModalOld__qrImage[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain}.qrModalOld--show[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}"]});let i=e;return i})();function te(i,e){if(i&1){let l=f();n(0,"button",18),c("click",function(){s(l);let t=d();return g(t.qrModalOrTelegram())}),m(1,"img",19),a(2," \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u043E\u0434\u0430\u0440\u043E\u043A "),o()}}function ne(i,e){if(i&1){let l=f();n(0,"div",20),c("click",function(){s(l);let t=d();return g(t.mobileDetectService==null?null:t.mobileDetectService.goToDeviceStore())}),n(1,"div",21),a(2,"\u0421\u043A\u0430\u0447\u0430\u0439\u0442\u0435"),m(3,"br"),a(4,"\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435"),o(),n(5,"div",22),m(6,"img",23),o()()}if(i&2){let l=d();u(6),p("src",l.mobileDetectService==null?null:l.mobileDetectService.mobileStoreIconSrc(),B)}}function oe(i,e){if(i&1){let l=f();n(0,"button",24),c("click",function(){s(l);let t=d();return g(t.qrModalOrTelegram())}),a(1," \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u043E\u0434\u0430\u0440\u043E\u043A "),o()}}function ie(i,e){if(i&1){let l=f();n(0,"button",24),c("click",function(){s(l);let t=d();return g(t.openQRModal())}),a(1," \u0421\u043A\u0430\u0447\u0430\u0442\u044C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 "),o()}}var we=(()=>{let e=class e{get curYear(){return new Date().getFullYear()}get helpBtnName(){return"\u041F\u043E\u043C\u043E\u0449\u044C"}constructor(r,t){this.modalService=r,this.mobileDetectService=t,this.showQrCodeModal=q(!1),this.qrModalChangeEffect=Q(()=>{this.showQrCodeModal()?this.modalService.hideScroll():this.modalService.showScroll()}),this.tgService=A(Z)}clickByCompanyBlock(){this.tgService.mainTgButton&&(this.tgService.mainTgButton.setText("MainButton"),this.tgService.mainTgButton.show())}openQRModal(){this.modalService.open({component:"appComponent",modalName:"qrModal"})}qrModalOrTelegram(){this.mobileDetectService?.osDevice?this.mobileDetectService.goToTelegramChannel():this.modalService.open({component:"appComponent",modalName:"qrForTelegram"})}};e.\u0275fac=function(t){return new(t||e)(S(J),S($,8))},e.\u0275cmp=h({type:e,selectors:[["app-footer"]],standalone:!0,features:[C],decls:33,vars:5,consts:[[1,"footer"],[1,"container","footer__container"],[1,"footer__content"],[1,"footer__col","footer__col--forMobile"],[1,"blueBtn","blueBtn--white","blueBtn--withPresentIcon"],[1,"footer__links"],[1,"footer__nav"],["routerLink","/help",1,"btnInFooter"],["routerLink","/legal-info",1,"btnInFooter"],[1,"footer__socialNetworks"],["href","https://instagram.com/dazzlink.asia","target","_blank",1,"btnInFooter"],["href","https://t.me/dazzlink","target","_blank",1,"btnInFooter"],[1,"footer__col","footer__col--forDesktop"],[1,"footer__btns"],["type","button",1,"btnInFooter"],[1,"footer__col"],[1,"company",3,"click"],[3,"showChange","show"],[1,"blueBtn","blueBtn--white","blueBtn--withPresentIcon",3,"click"],["src","assets/icons/presentBlue.svg","alt","p"],[1,"footer__download","downloadApp",3,"click"],[1,"downloadApp__title"],[1,"downloadApp__icon"],["alt","storeIcon",3,"src"],["type","button",1,"btnInFooter",3,"click"]],template:function(t,_){t&1&&(n(0,"footer",0)(1,"div",1)(2,"div",2)(3,"div",3),M(4,te,3,0,"button",4)(5,ne,7,1),n(6,"div",5)(7,"div",6)(8,"a",7),a(9),o(),n(10,"a",8),a(11,"\u041F\u0440\u0430\u0432\u043E\u0432\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"),o()(),n(12,"div",9)(13,"a",10),a(14,"Instagram"),o(),n(15,"a",11),a(16,"Telegram"),o()()()(),n(17,"div",12)(18,"div",13),M(19,oe,2,0,"button",14)(20,ie,2,0),n(21,"a",7),a(22,"\u041F\u043E\u043C\u043E\u0449\u044C"),o(),n(23,"a",8),a(24,"\u041F\u0440\u0430\u0432\u043E\u0432\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"),o(),n(25,"a",10),a(26,"Instagram"),o(),n(27,"a",11),a(28,"Telegram"),o()()(),n(29,"div",15)(30,"div",16),c("click",function(){return _.clickByCompanyBlock()}),a(31),o()()()()(),n(32,"app-qr-code-modal",17),W("showChange",function(y){return H(_.showQrCodeModal,y)||(_.showQrCodeModal=y),y}),o()),t&2&&(u(4),x(4,4),u(5),V(_.helpBtnName),u(10),x(19,19),u(12),j("",_.curYear," \xA9\xA0DAZZLINK\xA0CO,\xA0LLC. \u0412\u0441\u0435\xA0\u043F\u0440\u0430\u0432\u0430\xA0\u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B"),u(),z("show",_.showQrCodeModal))},dependencies:[K,P],styles:["[_ngcontent-%COMP%]:root{--color-blue: #5532EB;--color-blue1: #4A4AC6;--color-pink: #FF99EC;--color-black: #000;--color-black1: #333;--color-black2: #111;--color-white: #fff;--color-gray: #807d7d;--color-gray1: #f2f3f4;--color-red: #e40038;--color-green: green;--color-text-gray: #a8a8a8;--color-light-gray: #eee}.footer[_ngcontent-%COMP%]{font-weight:700}.footer[_ngcontent-%COMP%]   .footer__container[_ngcontent-%COMP%]{padding-bottom:20px}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]{display:flex;min-height:104px;justify-content:space-between;align-items:center;padding:24px 40px 24px 32px;border-radius:24px;background-color:var(--color-black2);color:var(--color-white);row-gap:16px;column-gap:24px}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]   .footer__col[_ngcontent-%COMP%]   .footer__btns[_ngcontent-%COMP%]{display:flex;align-items:center;column-gap:16px}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]   .footer__col[_ngcontent-%COMP%]   .footer__socialNetworksBlock[_ngcontent-%COMP%]{margin-right:16px;display:flex;flex-direction:column;align-items:flex-end;row-gap:8px}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]   .footer__col--forMobile[_ngcontent-%COMP%]{display:none}@media (max-width: 767px){.footer[_ngcontent-%COMP%]   .footer__container[_ngcontent-%COMP%]{padding:0}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]{align-items:stretch;border-radius:24px 24px 0 0;padding:20px;flex-direction:column}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]   .footer__col[_ngcontent-%COMP%]{display:block}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]   .footer__col[_ngcontent-%COMP%]   .footer__socialNetworksBlock[_ngcontent-%COMP%]{margin:0;row-gap:12px;align-items:center}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]   .footer__col[_ngcontent-%COMP%]   .footer__links[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin:16px -8px 0}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]   .footer__col[_ngcontent-%COMP%]   .footer__links[_ngcontent-%COMP%]   .footer__nav[_ngcontent-%COMP%], .footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]   .footer__col[_ngcontent-%COMP%]   .footer__links[_ngcontent-%COMP%]   .footer__socialNetworks[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;row-gap:8px}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]   .footer__col[_ngcontent-%COMP%]   .footer__links[_ngcontent-%COMP%]   .footer__socialNetworks[_ngcontent-%COMP%]{align-items:flex-end}.footer[_ngcontent-%COMP%]   .footer__content[_ngcontent-%COMP%]   .footer__col--forDesktop[_ngcontent-%COMP%]{display:none}}.company[_ngcontent-%COMP%]{color:var(--color-text-gray);font-size:14px}@media (min-width: 768px){.company[_ngcontent-%COMP%]{text-align:right}}.btnInFooter[_ngcontent-%COMP%]{cursor:pointer;display:block;border:none;background-color:transparent;color:var(--color-white);font-size:14px;line-height:20px;padding:8px;text-align:center;font-weight:700}"],changeDetection:0});let i=e;return i})();export{b as a,ce as b,Z as c,J as d,we as e};
