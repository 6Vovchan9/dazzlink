import{$a as Tt,$b as _t,B as H,Ba as wt,Ca as Mt,Da as Ot,F,Fa as at,G as yt,Ga as lt,Hb as Qt,I as _,Ia as Dt,Ib as mt,Jb as ct,K as Et,Ka as L,Kb as Ht,L as f,La as st,Lb as Kt,M as It,Ma as Lt,Mb as tt,Nb as Xt,Oa as kt,Ob as pt,P as y,Pa as B,Pb as Yt,Q as E,Qb as dt,Rb as Jt,Ta as K,Tb as et,Ua as At,Ub as Zt,Va as b,Vb as h,Wb as te,Xb as ee,Z as u,Zb as gt,_ as p,_b as it,a as q,ab as Nt,b as z,ba as g,bc as w,c as Ct,ca as m,d as rt,db as jt,eb as Vt,ec as ie,f as Q,fc as ne,gc as oe,i as xt,ia as l,ib as X,j as Ft,ja as a,jb as R,k as bt,ka as T,kb as Y,lb as Bt,mb as Rt,n as St,oa as N,ob as ut,pa as v,pb as $t,qa as d,qb as Wt,r as D,sb as Gt,tb as Ut,ub as qt,vb as zt,wa as j,xa as s,xb as J,ya as V,yb as Z,z as Pt,za as I}from"./chunk-577XKLLU.js";var S=(()=>{var t,ft;let i=class i{constructor(o){Ct(this,t);this.http=o,this.error$=new Q}get token(){let o=new Date(localStorage.getItem("fb-token-exp")||0);return new Date>o?(this.logout(),null):localStorage.getItem("fb-token")}login(o){return o.returnSecureToken=!0,this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${_t.apiKey}`,o).pipe(H(rt(this,t,ft)),D(this.handleError.bind(this)))}loginForNgrx(o){return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${_t.apiKey}`,o)}logout(){rt(this,t,ft).call(this,null)}handleError(o){if(o.statusText==="OK"){let{message:c}=o.error.error;switch(c){case"INVALID_EMAIL":this.error$.next("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 email");break;case"INVALID_PASSWORD":this.error$.next("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C");break;case"EMAIL_NOT_FOUND":this.error$.next("\u0422\u0430\u043A\u043E\u0433\u043E email \u043D\u0435\u0442");break}}else this.error$.next("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430");return bt(o)}isAuthenticated(){return!!this.token}};t=new WeakSet,ft=function(o){if(o){let c=new Date(new Date().getTime()+ +o.expiresIn*1e3);localStorage.setItem("fb-token",o.idToken),localStorage.setItem("fb-token-exp",c.toString())}else localStorage.clear()},i.\u0275fac=function(c){return new(c||i)(_(Vt))},i.\u0275prov=F({token:i,factory:i.\u0275fac,providedIn:"root"});let e=i;return e})();var M=(()=>{let t=class t{constructor(){this.alert$=new Q}success(i){this.alert$.next({type:"success",text:i})}warning(i){this.alert$.next({type:"warning",text:i})}danger(i){this.alert$.next({type:"danger",text:i})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=F({token:t,factory:t.\u0275fac});let e=t;return e})();var he=(e,t,r)=>({"alert__wrap--success":e,"alert__wrap--warning":t,"alert__wrap--danger":r});function Ce(e,t){if(e&1&&(l(0,"div",1)(1,"div",2),s(2),a()()),e&2){let r=d();u(),m("ngClass",Dt(2,he,(r.alertData==null?null:r.alertData.type)==="success",(r.alertData==null?null:r.alertData.type)==="warning",(r.alertData==null?null:r.alertData.type)==="danger")),u(),I(" ",r.alertData==null?null:r.alertData.text," ")}}var re=(()=>{let t=class t{constructor(i){this.alertService=i,this.delayProps=5e3}ngOnInit(){this.aSub=this.alertService.alert$.subscribe(i=>{this.alertData=i;let n=setTimeout(()=>{clearTimeout(n),this.alertData=null},this.delayProps)})}ngOnDestroy(){this.aSub?.unsubscribe()}};t.\u0275fac=function(n){return new(n||t)(p(M))},t.\u0275cmp=f({type:t,selectors:[["app-alert"]],inputs:{delayProps:[Et.None,"delay","delayProps"]},decls:1,vars:1,consts:[["class","alert",4,"ngIf"],[1,"alert"],[1,"alert__wrap",3,"ngClass"]],template:function(n,o){n&1&&g(0,Ce,3,6,"div",0),n&2&&m("ngIf",o.alertData)},dependencies:[K,b],styles:[".alert[_ngcontent-%COMP%]{position:fixed;top:20px;width:100%;padding:0 20px;box-sizing:border-box;display:flex;justify-content:flex-end}.alert[_ngcontent-%COMP%]   .alert__wrap[_ngcontent-%COMP%]{background:gray;color:#fff;padding:20px;border-radius:6px;max-width:300px}.alert[_ngcontent-%COMP%]   .alert__wrap--success[_ngcontent-%COMP%]{background-color:green}.alert[_ngcontent-%COMP%]   .alert__wrap--danger[_ngcontent-%COMP%]{background-color:orange}.alert[_ngcontent-%COMP%]   .alert__wrap--warning[_ngcontent-%COMP%]{background-color:red}"]});let e=t;return e})();var Fe=()=>["/admin","dashboard"],be=()=>["/admin","create"];function Se(e,t){if(e&1){let r=N();l(0,"nav",2)(1,"ul",3)(2,"li",4)(3,"a",5),s(4,"UI"),a()(),l(5,"li",6)(6,"a",7),v("click",function(){y(r);let n=d();return E(n.goToAnotherPage(["/admin","dashboard"]))}),s(7,"\u0413\u043B\u0430\u0432\u043D\u0430\u044F"),a()(),l(8,"li",6)(9,"a",7),v("click",function(){y(r);let n=d();return E(n.goToAnotherPage(["/admin","create"]))}),s(10,"\u0421\u043E\u0437\u0434\u0430\u0442\u044C"),a()(),l(11,"li",4)(12,"a",8),v("click",function(n){y(r);let o=d();return E(o.logout(n))}),s(13,"\u0412\u044B\u0439\u0442\u0438"),a()()()()}e&2&&(u(6),m("routerLink",at(2,Fe)),u(3),m("routerLink",at(3,be)))}var ae=(()=>{let t=class t{constructor(i,n){this.router=i,this.auth=n}ngOnInit(){}goToAnotherPage(i){this.router.navigate(i)}logout(i){i.preventDefault(),this.auth.logout(),this.router.navigate(["/admin","login"])}};t.\u0275fac=function(n){return new(n||t)(p(h),p(S))},t.\u0275cmp=f({type:t,selectors:[["app-admin-layout"]],decls:5,vars:2,consts:[["class","menu",4,"ngIf"],[3,"delay"],[1,"menu"],[1,"menu__list"],[1,"menu__item"],["routerLink","/"],["routerLinkActive","menu__item--active",1,"menu__item"],[3,"click","routerLink"],["href","#",3,"click"]],template:function(n,o){n&1&&(l(0,"p"),s(1,"admin-layout works!"),a(),g(2,Se,14,4,"nav",0),T(3,"app-alert",1)(4,"router-outlet")),n&2&&(u(2),m("ngIf",o.auth.isAuthenticated()),u(),m("delay",3e3))},dependencies:[b,Zt,te,ee,re],styles:[".menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]{display:flex}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]{margin-left:10px}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:underline;cursor:pointer;color:#000}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item--active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:red}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]:first-child{margin:0}"]});let e=t;return e})();var le=(()=>{let t=class t{constructor(i,n,o){this.postsService=i,this.alertService=n,this.locationsService=o}ngOnInit(){}create(){let i={title:"5 \u043F\u0440\u0438\u0447\u0438\u043D \u043F\u043E\u0447\u0435\u043C\u0443 \u0444\u043B\u0438\u0440\u0442\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0435 \u043D\u0435\u043D\u0430\u0434\u0435\u0436\u043D\u043E",html:`
        <p class="articleParagraph">\u0424\u043B\u0438\u0440\u0442 \u2013 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u043D\u0430\u044F \u0444\u043E\u0440\u043C\u0430 \u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043C\u0435\u0436\u0434\u0443 \u043C\u0443\u0436\u0447\u0438\u043D\u043E\u0439 \u0438 \u0436\u0435\u043D\u0449\u0438\u043D\u043E\u0439. \u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u0438 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u043E\u043B\u043E\u0436\u043D\u043E\u0433\u043E \u043F\u043E\u043B\u0430 \u0437\u0430\u0438\u0433\u0440\u044B\u0432\u0430\u044E\u0442 \u0434\u0440\u0443\u0433 \u0441 \u0434\u0440\u0443\u0433\u043E\u043C, \u043A\u0430\u043A \u043D\u0430 \u0434\u043E\u0441\u0443\u0433\u0435, \u0442\u0430\u043A \u0438 \u0432 \u0434\u0435\u043B\u043E\u0432\u043E\u0439 \u043E\u0431\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435.</p>
        <p class="articleParagraph">\u041D\u0435\u043F\u0440\u0438\u043D\u0443\u0436\u0434\u0435\u043D\u043D\u044B\u0435 \u0443\u0445\u0430\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0435 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u044E\u0442 \u0438\u0433\u0440\u0443, \u043A\u0430\u0436\u0443\u0442\u0441\u044F \u0431\u0435\u0437\u043E\u0431\u0438\u0434\u043D\u044B\u043C \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435\u043C. \u0422\u0430\u043A \u043B\u0438 \u044D\u0442\u043E \u043D\u0430 \u0441\u0430\u043C\u043E\u043C \u0434\u0435\u043B\u0435? \u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438 \u043D\u0430\u0445\u043E\u0434\u044F\u0442 \u043F\u043B\u044E\u0441\u044B \u0432 \u0437\u0430\u0438\u0433\u0440\u044B\u0432\u0430\u043D\u0438\u044F\u0445 \u043C\u0435\u0436\u0434\u0443 \u043A\u043E\u043B\u043B\u0435\u0433\u0430\u043C\u0438, \u043D\u043E \u0432\u0441\u0435 \u0436\u0435 \u0441\u0447\u0438\u0442\u0430\u044E\u0442 \u0442\u0430\u043A\u043E\u0439 \u0444\u043B\u0438\u0440\u0442 \u043E\u043F\u0430\u0441\u043D\u044B\u043C.</p>
        <span class="articleHeader">\u041F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u043D\u0435\u043F\u0440\u0438\u043D\u0443\u0436\u0434\u0435\u043D\u043D\u044B\u0445 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0439.</span>
        <p class="articleParagraph">
          \u0427\u0435\u043B\u043E\u0432\u0435\u043A \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442 \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435 \u043C\u0438\u043D\u0438\u043C\u0443\u043C 8 \u0447\u0430\u0441\u043E\u0432 \u0432 \u0441\u0443\u0442\u043A\u0438 5 \u0434\u043D\u0435\u0439 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E. \u0415\u0441\u043B\u0438 \u043D\u0430 \u043F\u0440\u043E\u0442\u044F\u0436\u0435\u043D\u0438\u0438 \u044D\u0442\u043E\u0433\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u0441\u0435\u0440\u044C\u0435\u0437\u043D\u044B\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439 \u0438 \u0434\u0443\u043C\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043E \u0434\u0435\u043B\u043E\u0432\u044B\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u0445, \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u043E\u0438\u0437\u043E\u0439\u0442\u0438 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0435\u0435 \u0432\u044B\u0433\u043E\u0440\u0430\u043D\u0438\u0435.
        </p>
        <div class="articleParagraph">
          \u0424\u043B\u0438\u0440\u0442 \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442:
          <ul class="articleList">
            <li class="articleListItem">\u041F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0442\u0438\u0442\u044C \u0441\u0442\u0440\u0435\u0441\u0441. \u041A\u043E\u043C\u043F\u043B\u0438\u043C\u0435\u043D\u0442, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u044B\u0439 \u043E\u0442 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044F \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u043F\u043E\u043B\u043E\u0436\u043D\u043E\u0433\u043E \u043F\u043E\u043B\u0430, \u0443\u043B\u0443\u0447\u0448\u0430\u0435\u0442 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u0435, \u0437\u0430\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0440\u0430\u0441\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u043B\u0435\u0447\u0438.</li>
            <li class="articleListItem">\u041F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u0441\u0430\u043C\u043E\u043E\u0446\u0435\u043D\u043A\u0443. \u041E\u0442\u0432\u0435\u0442\u043D\u0430\u044F \u0440\u0435\u0430\u043A\u0446\u0438\u044F \u043D\u0430 \u043F\u043E\u0434\u043C\u0438\u0433\u0438\u0432\u0430\u043D\u0438\u0435 \u0438\u043B\u0438 \u0443\u043B\u044B\u0431\u043A\u0443 \u043F\u0440\u0438\u044F\u0442\u043D\u0430, \u0442\u0430\u043A \u043A\u0430\u043A \u0443\u0431\u0435\u0436\u0434\u0430\u0435\u0442 \u0432 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u043F\u0440\u0438\u0432\u043B\u0435\u043A\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438.</li>
            <li class="articleListItem">\u0423\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043E\u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0441\u0442\u044C. \u041D\u0430\u043B\u0438\u0447\u0438\u0435 \u043F\u043E\u043A\u043B\u043E\u043D\u043D\u0438\u043A\u0430 \u0438\u043B\u0438 \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u0441\u0438\u043C\u043F\u0430\u0442\u0438\u0438 \u043C\u043E\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0430 \u043C\u0435\u0441\u0442\u043E \u0441\u043B\u0443\u0436\u0431\u044B \u0432\u043E\u0432\u0440\u0435\u043C\u044F, \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0438, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0435\u0431\u044F \u0441 \u043B\u0443\u0447\u0448\u0435\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u044B.</li>
          </ul>
        </div>
        <span class="articleHeader">\u041F\u043E\u0447\u0435\u043C\u0443 \u0444\u043B\u0438\u0440\u0442\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0435 \u043D\u0435\u043D\u0430\u0434\u0435\u0436\u043D\u043E?</span>
        <div class="articleParagraph">
          \u041E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043C\u043E\u043C\u0435\u043D\u0442\u043E\u0432 \u0444\u043B\u0438\u0440\u0442\u0430 \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445:
          <ul class="articleList">
            <li class="articleListItem">\u0423\u043B\u044B\u0431\u043A\u0438 \u0438 \u043D\u0435\u0432\u0438\u043D\u043D\u044B\u0435 \u043D\u0430\u043C\u0435\u043A\u0438 \u043C\u043E\u0433\u0443\u0442 \u0432\u044B\u0437\u0432\u0430\u0442\u044C \u0432\u043B\u044E\u0431\u043B\u0435\u043D\u043D\u043E\u0441\u0442\u044C. \u0415\u0441\u043B\u0438 \u043E\u0434\u0438\u043D \u0438\u0437 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u0438\u0433\u0440\u044B \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u043D\u0430 \u0441\u0435\u0440\u044C\u0435\u0437\u043D\u044B\u0435 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F, \u0430 \u0434\u0440\u0443\u0433\u043E\u0439 \u2013 \u043D\u0435\u0442, \u043D\u0435\u043C\u0438\u043D\u0443\u0435\u043C \u0441\u043A\u043E\u0440\u044B\u0439 \u0440\u0430\u0437\u0440\u044B\u0432. \u0412 \u043D\u0435\u0441\u043E\u0441\u0442\u043E\u044F\u0432\u0448\u0435\u0439\u0441\u044F \u043F\u0430\u0440\u0435 \u0432\u043E\u0437\u043D\u0438\u043A\u0430\u0435\u0442 \u043D\u0430\u043F\u0440\u044F\u0436\u0435\u043D\u0438\u0435, \u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0435 \u043F\u0435\u0440\u0435\u0440\u0430\u0441\u0442\u0438 \u0432 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0439 \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442.</li>
            <li class="articleListItem">\u0417\u0430\u0438\u0433\u0440\u044B\u0432\u0430\u043D\u0438\u044F \u0434\u0430\u044E\u0442 \u043F\u043E\u0432\u043E\u0434 \u0434\u043B\u044F \u0441\u043F\u043B\u0435\u0442\u0435\u043D. \u041F\u0435\u0440\u0435\u0441\u0443\u0434\u044B \u0437\u0430 \u0441\u043F\u0438\u043D\u043E\u0439 \u2013 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u043D\u043E\u0435 \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0435 \u043E\u0444\u0438\u0441\u043D\u044B\u0445 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432. \u0420\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u044B \u043E \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u043C \u0441\u043B\u0443\u0436\u0435\u0431\u043D\u043E\u043C \u0440\u043E\u043C\u0430\u043D\u0435 \u043C\u043E\u0433\u0443\u0442 \u0432\u044B\u0439\u0442\u0438 \u0437\u0430 \u043F\u0440\u0435\u0434\u0435\u043B\u044B \u0444\u0438\u0440\u043C\u044B \u0438 \u043F\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043A \u0441\u0435\u043C\u0435\u0439\u043D\u044B\u043C \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0430\u043C, \u0435\u0441\u043B\u0438 \u043E\u0434\u0438\u043D \u0438\u0437 \u043E\u0431\u044A\u0435\u043A\u0442\u043E\u0432 \u043D\u0435\u0441\u0432\u043E\u0431\u043E\u0434\u0435\u043D.</li>
            <li class="articleListItem">\u0423\u0432\u043B\u0435\u0447\u0435\u043D\u043D\u044B\u0439 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u0441\u043F\u043E\u0441\u043E\u0431\u0435\u043D \u0432\u044B\u0434\u0430\u0442\u044C \u0442\u0430\u0439\u043D\u044B \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438. \u0418\u043D\u043E\u0433\u0434\u0430 \u0444\u043B\u0438\u0440\u0442\u043E\u0432\u0430\u0442\u044C \u043D\u0430\u0447\u0438\u043D\u0430\u044E\u0442 \u0434\u043B\u044F \u0442\u043E\u0433\u043E, \u0447\u0442\u043E\u0431\u044B \u0440\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C \u0438 \xAB\u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C\xBB \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430 \u0444\u0438\u0440\u043C\u044B. \u0412 \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u043B\u0443\u0447\u0430\u044F\u0445 \u0440\u0430\u0437\u043E\u0447\u0430\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0431\u0435\u0437\u043E\u0442\u0432\u0435\u0442\u043D\u044B\u043C\u0438 \u0447\u0443\u0432\u0441\u0442\u0432\u0430\u043C\u0438 \u043E\u0431\u044A\u0435\u043A\u0442 \u0438\u0434\u0435\u0442 \u043D\u0430 \u0441\u043B\u0443\u0436\u0435\u0431\u043D\u043E\u0435 \u043F\u0440\u0435\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0435 \u0438\u0437 \u043C\u0435\u0441\u0442\u0438.</li>
            <li class="articleListItem">\u0424\u043B\u0438\u0440\u0442 \u043C\u043E\u0436\u0435\u0442 \u0432\u044B\u0437\u0432\u0430\u0442\u044C \u0440\u0435\u0432\u043D\u043E\u0441\u0442\u044C. \u0415\u0441\u043B\u0438 \u0441\u0438\u043C\u043F\u0430\u0442\u0438\u0447\u043D\u044B\u0439 \u043A\u043E\u043B\u043B\u0435\u0433\u0430 \u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0441\u0442\u044C\u044E, \u0442\u043E\u0442, \u0441 \u043A\u0435\u043C \u043E\u043D \u0437\u0430\u0438\u0433\u0440\u044B\u0432\u0430\u0435\u0442, \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043E\u043F\u0430\u043B\u0443.</li>
            <li class="articleListItem">\u041A\u043E\u043C\u043F\u043B\u0438\u043C\u0435\u043D\u0442\u044B \u0438 \u0443\u043B\u044B\u0431\u043A\u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u043D\u044B \u043F\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043A \u043F\u043E\u0442\u0435\u0440\u0435 \u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u0438. \u041E\u043F\u0430\u0441\u043D\u0435\u0435 \u0432\u0441\u0435\u0433\u043E \u0444\u043B\u0438\u0440\u0442 \u0441 \u043D\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u043E\u043C. \u0415\u0441\u043B\u0438 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u0443\u0432\u043B\u0435\u0447\u0435\u0442\u0441\u044F, \u043F\u0440\u0438\u0434\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442\u044C \u043E\u0442 \u0441\u043B\u043E\u0432 \u043A \u0434\u0435\u043B\u0443 \u0438\u043B\u0438 \u0438\u0441\u043A\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0440\u0430\u0431\u043E\u0442\u0443.</li>
          </ul>
        </div>
        <div class="articleParagraph">
          \u0421\u0442\u043E\u0438\u0442 \u043B\u0438 \u043F\u0440\u0438\u0431\u0435\u0433\u0430\u0442\u044C \u043A \u0437\u0430\u0438\u0433\u0440\u044B\u0432\u0430\u043D\u0438\u044F\u043C \u2013 \u043B\u0438\u0447\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430. \u041E\u043D\u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u043D\u044B \u0432\u044B\u0437\u0432\u0430\u0442\u044C \u043D\u0435\u043F\u0440\u0438\u044F\u0442\u043D\u043E\u0441\u0442\u0438, \u043D\u043E \u0438\u043D\u043E\u0433\u0434\u0430 \u0444\u043B\u0438\u0440\u0442 \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u0443\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043B\u0438\u0447\u043D\u0443\u044E \u0436\u0438\u0437\u043D\u044C.
        </div>
      `,authorList:[{link:"grg/gvsv/bsdfv/bdfv3",name:"\u0418\u0433\u043E\u0440\u044C",occupation:"\u0412\u043E\u0434\u0438\u0442\u0435\u043B\u044C",imageUrl:"assets/images/home-page/linkToArticlesX2.jpg"}],published:new Date,viewCount:147,likeCount:20,dislikeCount:11};this.postsService.create(i).subscribe(()=>{console.log("\u0421\u043E\u0437\u0434\u0430\u043B\u0438 \u043F\u043E\u0441\u0442"),this.alertService.success("\u041F\u043E\u0441\u0442 \u0431\u044B\u043B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D")})}createLocation(){let i={address:"\u0443\u043B. \u0418\u0441\u043B\u0430\u043C\u0430 \u041A\u0430\u0440\u0438\u043C\u043E\u0432\u0430, 17",categoryCode:"\u0420\u0435\u0441\u0442\u043E\u0440\u0430\u043D",subcategory:"\u0411\u0430\u0440",subtitle:"\u0423\u0437\u0431\u0435\u043A\u0441\u043A\u0430\u044F",title:"\u0427\u0430\u0439\u0445\u0430\u043D\u0430",priceRange:2,rating:4.8};this.locationsService.create(i).subscribe(()=>{this.alertService.success("\u041B\u043E\u043A\u0430\u0446\u0438\u044F \u0431\u044B\u043B\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0430")})}};t.\u0275fac=function(n){return new(n||t)(p(w),p(M),p(ie))},t.\u0275cmp=f({type:t,selectors:[["app-create-page"]],decls:6,vars:0,consts:[["type","submit",1,"btn",3,"click"]],template:function(n,o){n&1&&(l(0,"p"),s(1,"create-page works!"),a(),l(2,"button",0),v("click",function(){return o.create()}),s(3,"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u043E\u0441\u0442"),a(),l(4,"button",0),v("click",function(){return o.createLocation()}),s(5,"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043B\u043E\u043A\u0430\u0446\u0438\u044E"),a())}});let e=t;return e})();function ye(e,t){if(e&1){let r=N();l(0,"tr")(1,"td"),s(2),a(),l(3,"td"),s(4),a(),l(5,"td"),s(6),a(),l(7,"td"),s(8),L(9,"date"),a(),l(10,"td")(11,"button",7),v("click",function(){let n=y(r).$implicit,o=d(3);return E(o.goToEditPage(n.id))}),s(12," \u041E\u0442\u043A\u0440\u044B\u0442\u044C "),a(),l(13,"a",8),v("click",function(){let n=y(r).$implicit,o=d(3);return E(o.remove(n.id))}),s(14,"\u0423\u0434\u0430\u043B\u0438\u0442\u044C"),a()()()}if(e&2){let r=t.$implicit,i=t.index;u(2),V(i+1),u(2),V(r.author),u(2),V(r.title),u(2),V(kt(9,4,r.published,"medium","","ru"))}}function Ee(e,t){if(e&1){let r=N();l(0,"div",4)(1,"div")(2,"input",5),Ot("ngModelChange",function(n){y(r);let o=d(2);return Mt(o.searchStr,n)||(o.searchStr=n),E(n)}),a()(),l(3,"table")(4,"thead")(5,"tr")(6,"th"),s(7,"#"),a(),l(8,"th"),s(9,"\u0410\u0432\u0442\u043E\u0440"),a(),l(10,"th"),s(11,"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435"),a(),l(12,"th"),s(13,"\u0414\u0430\u0442\u0430"),a(),l(14,"th"),s(15,"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435"),a()()(),l(16,"tbody"),g(17,ye,15,9,"tr",6),L(18,"search"),a()()()}if(e&2){let r=d(2);u(2),wt("ngModel",r.searchStr),u(15),m("ngForOf",Lt(18,2,r.posts,r.searchStr))}}function Ie(e,t){e&1&&(l(0,"p"),s(1,"\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0443\u0441\u0442"),a())}function we(e,t){if(e&1&&(l(0,"div"),g(1,Ee,19,5,"div",3)(2,Ie,2,0,"ng-template",null,1,B),a()),e&2){let r=j(3),i=d();u(),m("ngIf",i.posts.length)("ngIfElse",r)}}function Me(e,t){e&1&&(l(0,"p"),s(1,"\u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."),a())}var se=(()=>{let t=class t{constructor(i,n,o){this.postsService=i,this.alertService=n,this.router=o,this.posts=[],this.loading=!0,this.searchStr=""}ngOnInit(){this.postsService.getAll().subscribe(i=>{this.posts=i,this.loading=!1})}remove(i){i&&(this.loading=!0,this.dSub=this.postsService.remove(i).subscribe(()=>{this.loading=!1,this.posts=this.posts.filter(n=>n.id!==i),this.alertService.danger("\u041F\u043E\u0441\u0442 \u0431\u044B\u043B \u0443\u0434\u0430\u043B\u0435\u043D")}))}goToEditPage(i){this.loading=!0,this.router.navigate(["/admin","post",i,"edit"]).then(n=>{n||(this.loading=!1,this.alertService.warning("\u0423\u043F\u0441, \u0447\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A("))})}ngOnDestroy(){this.pSub?.unsubscribe(),this.dSub?.unsubscribe()}};t.\u0275fac=function(n){return new(n||t)(p(w),p(M),p(h))},t.\u0275cmp=f({type:t,selectors:[["app-dashboard-page"]],decls:3,vars:2,consts:[["loadingTemplate",""],["empty",""],[4,"ngIf","ngIfElse"],["style","margin-top: 30px;",4,"ngIf","ngIfElse"],[2,"margin-top","30px"],["type","text","placeholder","\u041D\u0430\u0439\u0442\u0438 \u043F\u043E\u0441\u0442...",3,"ngModelChange","ngModel"],[4,"ngFor","ngForOf"],[1,"btn",3,"click"],[3,"click"]],template:function(n,o){if(n&1&&g(0,we,4,2,"div",2)(1,Me,2,0,"ng-template",null,0,B),n&2){let c=j(2);m("ngIf",!o.loading)("ngIfElse",c)}},dependencies:[At,b,X,Y,$t,Nt,ne]});let e=t;return e})();function Oe(e,t){if(e&1&&(l(0,"div")(1,"p"),s(2,"edit-page works!"),a(),l(3,"div"),s(4),a()()),e&2){let r=d();u(4),I("\u041F\u043E\u0441\u0442 ",r.post.id," \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D")}}function De(e,t){e&1&&s(0,` \u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430...
`)}var ue=(()=>{let t=class t{constructor(i,n){this.route=i,this.postsServise=n}ngOnInit(){this.route.data.subscribe(i=>{this.post=i.data})}ngOnDestroy(){this.pSub&&this.pSub.unsubscribe()}};t.\u0275fac=function(n){return new(n||t)(p(et),p(w))},t.\u0275cmp=f({type:t,selectors:[["app-edit-page"]],decls:3,vars:2,consts:[["loading",""],[4,"ngIf","ngIfElse"]],template:function(n,o){if(n&1&&g(0,Oe,5,1,"div",1)(1,De,1,0,"ng-template",null,0,B),n&2){let c=j(2);m("ngIf",o.post)("ngIfElse",c)}},dependencies:[b]});let e=t;return e})();var W=(()=>{let t=class t{constructor(i,n){this.auth=i,this.router=n}canActivate(i,n){return this.auth.isAuthenticated()?!0:(this.auth.logout(),this.router.navigate(["/admin","login"],{queryParams:{loginFailed:!0}}),!1)}};t.\u0275fac=function(n){return new(n||t)(_(S),_(h))},t.\u0275prov=F({token:t,factory:t.\u0275fac});let e=t;return e})();var me=(()=>{let t=class t{constructor(i,n){this.postsService=i,this.router=n}resolve(i,n){return this.postsService.getById(i.params?.id).pipe(D(()=>(console.log("catchError in PostResolver"),this.router.navigate(["/admin","dashboard"]),xt)))}};t.\u0275fac=function(n){return new(n||t)(_(w),_(h))},t.\u0275prov=F({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var G=function(e){return e.LOGIN="[Login Page] Login",e.LOGIN_SUCCESS="[Login Page] Login success",e.LOGIN_FAILURE="[Login Page] Login failure",e}(G||{});var A=J(G.LOGIN,Z()),U=J(G.LOGIN_SUCCESS,Z()),ot=J(G.LOGIN_FAILURE,Z());var Le={isSubmitting:!1,currentAdmin:null,isLoggedIn:null,validationErrors:null},ke=Xt(Le,tt(A,e=>z(q({},e),{isSubmitting:!0,validationErrors:null})),tt(U,(e,t)=>z(q({},e),{isSubmitting:!1,isLoggedIn:!0,currentAdmin:t})),tt(ot,(e,t)=>z(q({},e),{isSubmitting:!1,validationErrors:t})));function ce(e,t){return ke(e,t)}var pe=(()=>{let t=class t{constructor(i,n,o,c){this.actions$=i,this.authService=n,this.persistanceService=o,this.router=c,this.login$=pt(()=>this.actions$.pipe(dt(A),Pt(O=>this.authService.loginForNgrx(O).pipe(St(x=>{let P=new Date(new Date().getTime()+ +x.expiresIn*1e3);return this.persistanceService.set("fb-token",x.idToken),this.persistanceService.set("fb-token-exp",P.toString()),U(x)}),D(x=>{let P=x.error.error||{code:0,message:"Unknown Error",errors:[]};return Ft(ot(P))}))))),this.redirectAfterSubmit$=pt(()=>this.actions$.pipe(dt(U),H(()=>{this.router.navigate(["/admin","dashboard"])})),{dispatch:!1})}};t.\u0275fac=function(n){return new(n||t)(_(Yt),_(S),_(it),_(h))},t.\u0275prov=F({token:t,factory:t.\u0275fac});let e=t;return e})();var de=Ht("login"),ge=ct(de,e=>e.isSubmitting),_e=ct(de,e=>e.validationErrors);var fe=e=>({"inputControl--invalid":e});function Ae(e,t){if(e&1&&(l(0,"div",14),s(1),a()),e&2){let r=t.ngIf,i=d();u(),I(" ",i.operateErrorMessage(r)," ")}}function Te(e,t){if(e&1&&(l(0,"div",15),s(1),a()),e&2){let r=d();u(),I(" ",r.messageFromQueryParams," ")}}function Ne(e,t){e&1&&(l(0,"div",18),s(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email"),a())}function je(e,t){e&1&&(l(0,"div",18),s(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email"),a())}function Ve(e,t){if(e&1&&(l(0,"div",16),g(1,Ne,2,0,"div",17)(2,je,2,0,"div",17),a()),e&2){let r=d();u(),m("ngIf",r.loginForm.get("email").hasError("required")),u(),m("ngIf",r.loginForm.controls.email==null||r.loginForm.controls.email.errors==null?null:r.loginForm.controls.email.errors.email)}}function Be(e,t){e&1&&(l(0,"div",18),s(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C"),a())}function Re(e,t){if(e&1&&(l(0,"div",18),s(1),a()),e&2){let r,i=d(2);u(),I(" \u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 ",(r=i.loginForm.get("password"))==null||r.errors==null?null:r.errors.minlength.requiredLength," \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 ")}}function $e(e,t){if(e&1&&(l(0,"div",16),g(1,Be,2,0,"div",17)(2,Re,2,1,"div",17),a()),e&2){let r,i,n=d();u(),m("ngIf",(r=n.loginForm.get("password"))==null||r.errors==null?null:r.errors.required),u(),m("ngIf",(i=n.loginForm.get("password"))==null||i.errors==null?null:i.errors.minlength)}}var ve=(()=>{let t=class t{constructor(i,n,o,c){this.auth=i,this.router=n,this.route=o,this.store=c}ngOnInit(){this.route.queryParams.subscribe(i=>{i.loginFailed?this.messageFromQueryParams="\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435":i.authFailed&&(this.messageFromQueryParams="\u0421\u0435\u0441\u0441\u0438\u044F \u0438\u0441\u0442\u0435\u043A\u043B\u0430. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043D\u043E\u0432\u043E")}),this.initializeForm(),this.initializeValues()}initializeForm(){this.loginForm=new Rt({email:new ut(null,[R.email,R.required]),password:new ut(null,[R.required,R.minLength(6)])})}initializeValues(){this.isSubmitting$=this.store.pipe(mt(ge)),this.backendErrors$=this.store.pipe(mt(_e))}operateErrorMessage(i){switch(i.message?.toUpperCase()){case"INVALID_EMAIL":return"\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 email";case"INVALID_PASSWORD":return"\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C";case"EMAIL_NOT_FOUND":return"\u0422\u0430\u043A\u043E\u0433\u043E email \u043D\u0435\u0442";default:return"\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"}}submit(){if(this.loginForm?.valid){let i={email:this.loginForm.value.email,password:this.loginForm.value.password,returnSecureToken:!0};this.store.dispatch(A(i))}}};t.\u0275fac=function(n){return new(n||t)(p(S),p(h),p(et),p(Qt))},t.\u0275cmp=f({type:t,selectors:[["app-login-page-with-ngrx"]],decls:23,vars:16,consts:[[1,"loginForm",3,"ngSubmit","formGroup"],[1,"loginForm__header"],["class","loginForm__message loginForm__message--error",4,"ngIf"],["class","loginForm__message",4,"ngIf"],[1,"loginForm__form"],[1,"loginForm__control"],[1,"inputControl",3,"ngClass"],["for","adminEmail",1,"inputControl__label"],["id","adminEmail","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email","formControlName","email","type","text",1,"inputControl__input"],["class","controlError",4,"ngIf"],["for","adminPassword",1,"inputControl__label"],["id","adminPassword","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C","formControlName","password","type","password",1,"inputControl__input"],[1,"loginForm__btns"],["type","submit",1,"btn",3,"disabled"],[1,"loginForm__message","loginForm__message--error"],[1,"loginForm__message"],[1,"controlError"],["class","controlError__item",4,"ngIf"],[1,"controlError__item"]],template:function(n,o){if(n&1&&(l(0,"form",0),v("ngSubmit",function(){return o.submit()}),l(1,"div",1),s(2," \u0412\u043E\u0439\u0442\u0438 \u0432 \u043F\u0430\u043D\u0435\u043B\u044C \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430 (\u0447\u0435\u0440\u0435\u0437 ngrx) "),a(),g(3,Ae,2,1,"div",2),L(4,"async"),g(5,Te,2,1,"div",3),l(6,"div",4)(7,"div",5)(8,"div",6)(9,"label",7),s(10,"Email:"),a(),T(11,"input",8),g(12,Ve,3,2,"div",9),a()(),l(13,"div",5)(14,"div",6)(15,"label",10),s(16,"Password:"),a(),T(17,"input",11),g(18,$e,3,2,"div",9),a()(),l(19,"div",12)(20,"button",13),L(21,"async"),s(22,"\u0412\u043E\u0439\u0442\u0438"),a()()()()),n&2){let c,O,x,P;m("formGroup",o.loginForm),u(3),m("ngIf",st(4,8,o.backendErrors$)),u(2),m("ngIf",o.messageFromQueryParams),u(3),m("ngClass",lt(12,fe,((c=o.loginForm.get("email"))==null?null:c.touched)&&((c=o.loginForm.get("email"))==null?null:c.invalid))),u(4),m("ngIf",((O=o.loginForm.get("email"))==null?null:O.touched)&&((O=o.loginForm.get("email"))==null?null:O.invalid)),u(2),m("ngClass",lt(14,fe,((x=o.loginForm.get("password"))==null?null:x.touched)&&((x=o.loginForm.get("password"))==null?null:x.invalid))),u(4),m("ngIf",((P=o.loginForm.get("password"))==null?null:P.touched)&&((P=o.loginForm.get("password"))==null?null:P.invalid)),u(2),m("disabled",(o.loginForm==null?null:o.loginForm.invalid)||st(21,10,o.isSubmitting$))}},dependencies:[K,b,Wt,X,Y,Bt,Gt,Ut,Tt],styles:[".loginForm[_ngcontent-%COMP%]{margin-top:30px;border:1px solid black;border-radius:6px;max-width:600px;padding:30px}.loginForm[_ngcontent-%COMP%]   .loginForm__header[_ngcontent-%COMP%]{margin-bottom:20px;font-size:24px}.loginForm[_ngcontent-%COMP%]   .loginForm__message[_ngcontent-%COMP%]{margin-bottom:20px;padding:10px;background-color:gray;color:#fff;font-size:16px}.loginForm[_ngcontent-%COMP%]   .loginForm__message--error[_ngcontent-%COMP%]{background-color:brown}.loginForm[_ngcontent-%COMP%]   .loginForm__form[_ngcontent-%COMP%]   .loginForm__control[_ngcontent-%COMP%]{margin-bottom:20px}.loginForm[_ngcontent-%COMP%]   .loginForm__form[_ngcontent-%COMP%]   .loginForm__control[_ngcontent-%COMP%]:last-child{margin:0}.inputControl[_ngcontent-%COMP%]{display:flex;flex-direction:column}.inputControl[_ngcontent-%COMP%]   .inputControl__label[_ngcontent-%COMP%]{margin-bottom:10px}.inputControl--invalid[_ngcontent-%COMP%], .inputControl--invalid[_ngcontent-%COMP%]   .inputControl__input[_ngcontent-%COMP%], .controlError[_ngcontent-%COMP%]{color:red}button[_ngcontent-%COMP%]:disabled{cursor:not-allowed;opacity:.3;color:var(--color-white)}"]});let e=t;return e})();var Ki=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=It({type:t}),t.\u0275inj=yt({providers:[W,M,it],imports:[jt,qt,zt,oe,gt.forChild([{path:"",component:ae,children:[{path:"",redirectTo:"/admin/login",pathMatch:"full"},{path:"login",component:ve},{path:"dashboard",component:se,canActivate:[W]},{path:"create",component:le,canActivate:[W]},{path:"post/:id/edit",component:ue,canActivate:[W],resolve:{data:me}}]}]),Kt.forFeature("login",ce),Jt.forFeature([pe]),gt]});let e=t;return e})();export{Ki as AdminModule};