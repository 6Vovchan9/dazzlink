"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[253],{1253:(W,f,a)=>{a.r(f),a.d(f,{AdminModule:()=>K});var s=a(8583),l=a(7396),u=a(665),t=a(639),h=a(113),C=a(7709);let m=(()=>{class n{constructor(){this.alert$=new C.xQ}success(e){this.alert$.next({type:"success",text:e})}warning(e){this.alert$.next({type:"warning",text:e})}danger(e){this.alert$.next({type:"danger",text:e})}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();const Z=function(n,i,e){return{"alert__wrap--success":n,"alert__wrap--warning":i,"alert__wrap--danger":e}};function P(n,i){if(1&n&&(t.TgZ(0,"div",1),t.TgZ(1,"div",2),t._uU(2),t.qZA(),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngClass",t.kEZ(2,Z,"success"===(null==e.alertData?null:e.alertData.type),"warning"===(null==e.alertData?null:e.alertData.type),"danger"===(null==e.alertData?null:e.alertData.type))),t.xp6(1),t.hij(" ",null==e.alertData?null:e.alertData.text," ")}}let A=(()=>{class n{constructor(e){this.alertService=e,this.delay=5e3}ngOnInit(){this.aSub=this.alertService.alert$.subscribe(e=>{this.alertData=e;const o=setTimeout(()=>{clearTimeout(o),this.alertData=null},this.delay)})}ngOnDestroy(){var e;null===(e=this.aSub)||void 0===e||e.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(m))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-alert"]],inputs:{delay:"delay"},decls:1,vars:1,consts:[["class","alert",4,"ngIf"],[1,"alert"],[1,"alert__wrap",3,"ngClass"]],template:function(e,o){1&e&&t.YNc(0,P,3,6,"div",0),2&e&&t.Q6J("ngIf",o.alertData)},directives:[s.O5,s.mk],styles:[".alert[_ngcontent-%COMP%]{position:fixed;top:20px;width:100%;padding:0 20px;box-sizing:border-box;display:flex;justify-content:flex-end}.alert[_ngcontent-%COMP%]   .alert__wrap[_ngcontent-%COMP%]{background:gray;color:#fff;padding:20px;border-radius:6px;max-width:300px}.alert[_ngcontent-%COMP%]   .alert__wrap--success[_ngcontent-%COMP%]{background-color:green}.alert[_ngcontent-%COMP%]   .alert__wrap--danger[_ngcontent-%COMP%]{background-color:orange}.alert[_ngcontent-%COMP%]   .alert__wrap--warning[_ngcontent-%COMP%]{background-color:red}"]}),n})();const x=function(){return["/admin","dashboard"]},T=function(){return["/admin","create"]};function b(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"nav",2),t.TgZ(1,"ul",3),t.TgZ(2,"li",4),t.TgZ(3,"a",5),t._uU(4,"UI"),t.qZA(),t.qZA(),t.TgZ(5,"li",6),t.TgZ(6,"a",7),t.NdJ("click",function(){return t.CHM(e),t.oxw().goToAnotherPage(["/admin","dashboard"])}),t._uU(7,"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"),t.qZA(),t.qZA(),t.TgZ(8,"li",6),t.TgZ(9,"a",7),t.NdJ("click",function(){return t.CHM(e),t.oxw().goToAnotherPage(["/admin","create"])}),t._uU(10,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"),t.qZA(),t.qZA(),t.TgZ(11,"li",4),t.TgZ(12,"a",8),t.NdJ("click",function(r){return t.CHM(e),t.oxw().logout(r)}),t._uU(13,"\u0412\u044b\u0439\u0442\u0438"),t.qZA(),t.qZA(),t.qZA(),t.qZA()}2&n&&(t.xp6(6),t.Q6J("routerLink",t.DdM(2,x)),t.xp6(3),t.Q6J("routerLink",t.DdM(3,T)))}let F=(()=>{class n{constructor(e,o){this.router=e,this.auth=o}ngOnInit(){}goToAnotherPage(e){this.router.navigate(e)}logout(e){e.preventDefault(),this.auth.logout(),this.router.navigate(["/admin","login"])}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(l.F0),t.Y36(h.e))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-admin-layout"]],decls:5,vars:2,consts:[["class","menu",4,"ngIf"],[3,"delay"],[1,"menu"],[1,"menu__list"],[1,"menu__item"],["routerLink","/"],["routerLinkActive","menu__item--active",1,"menu__item"],[3,"routerLink","click"],["href","#",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"p"),t._uU(1,"admin-layout works!"),t.qZA(),t.YNc(2,b,14,4,"nav",0),t._UZ(3,"app-alert",1),t._UZ(4,"router-outlet")),2&e&&(t.xp6(2),t.Q6J("ngIf",o.auth.isAuthenticated()),t.xp6(1),t.Q6J("delay",3e3))},directives:[s.O5,A,l.lC,l.yS,l.Od],styles:[".menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]{display:flex}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]{margin-left:10px}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:underline;cursor:pointer;color:#000}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item--active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:red}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]:first-child{margin:0}"]}),n})();function y(n,i){if(1&n&&(t.TgZ(0,"div",14),t._uU(1),t.qZA()),2&n){const e=i.ngIf;t.xp6(1),t.hij(" ",e," ")}}function O(n,i){if(1&n&&(t.TgZ(0,"div",15),t._uU(1),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.hij(" ",e.messageFromQueryParams," ")}}function M(n,i){1&n&&(t.TgZ(0,"div",18),t._uU(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email"),t.qZA())}function q(n,i){1&n&&(t.TgZ(0,"div",18),t._uU(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 email"),t.qZA())}function w(n,i){if(1&n&&(t.TgZ(0,"div",16),t.YNc(1,M,2,0,"div",17),t.YNc(2,q,2,0,"div",17),t.qZA()),2&n){const e=t.oxw();let o,r;t.xp6(1),t.Q6J("ngIf",null==(o=e.loginForm.get("email"))||null==o.errors?null:o.errors.required),t.xp6(1),t.Q6J("ngIf",null==(r=e.loginForm.get("email"))||null==r.errors?null:r.errors.email)}}function I(n,i){1&n&&(t.TgZ(0,"div",18),t._uU(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"),t.qZA())}function L(n,i){if(1&n&&(t.TgZ(0,"div",18),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);let o;t.xp6(1),t.hij(" \u041f\u0430\u0440\u043e\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u043d\u0435 \u043c\u0435\u043d\u0435\u0435 ",null==(o=e.loginForm.get("password"))||null==o.errors?null:o.errors.minlength.requiredLength," \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 ")}}function E(n,i){if(1&n&&(t.TgZ(0,"div",16),t.YNc(1,I,2,0,"div",17),t.YNc(2,L,2,1,"div",17),t.qZA()),2&n){const e=t.oxw();let o,r;t.xp6(1),t.Q6J("ngIf",null==(o=e.loginForm.get("password"))||null==o.errors?null:o.errors.required),t.xp6(1),t.Q6J("ngIf",null==(r=e.loginForm.get("password"))||null==r.errors?null:r.errors.minlength)}}const v=function(n){return{"inputControl--invalid":n}};let U=(()=>{class n{constructor(e,o,r){this.auth=e,this.router=o,this.route=r,this.submitted=!1}ngOnInit(){this.route.queryParams.subscribe(e=>{e.loginFailed?this.messageFromQueryParams="\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435":e.authFailed&&(this.messageFromQueryParams="\u0421\u0435\u0441\u0441\u0438\u044f \u0438\u0441\u0442\u0435\u043a\u043b\u0430. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0437\u0430\u043d\u043e\u0432\u043e")}),this.loginForm=new u.cw({email:new u.NI(null,[u.kI.email,u.kI.required]),password:new u.NI(null,[u.kI.required,u.kI.minLength(6)])})}submit(){var e;(null===(e=this.loginForm)||void 0===e?void 0:e.valid)&&(this.submitted=!0,this.auth.login({email:this.loginForm.value.email,password:this.loginForm.value.password}).subscribe(()=>{this.submitted=!1,this.loginForm.reset(),this.router.navigate(["/admin","dashboard"])},()=>this.submitted=!1))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(h.e),t.Y36(l.F0),t.Y36(l.gz))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login-page"]],decls:22,vars:14,consts:[[1,"loginForm",3,"formGroup","ngSubmit"],[1,"loginForm__header"],["class","loginForm__message loginForm__message--error",4,"ngIf"],["class","loginForm__message",4,"ngIf"],[1,"loginForm__form"],[1,"loginForm__control"],[1,"inputControl",3,"ngClass"],["for","adminEmail",1,"inputControl__label"],["id","adminEmail","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email","formControlName","email","type","text",1,"inputControl__input"],["class","controlError",4,"ngIf"],["for","adminPassword",1,"inputControl__label"],["id","adminPassword","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c","formControlName","password","type","password",1,"inputControl__input"],[1,"loginForm__btns"],["type","submit",1,"btn",3,"disabled"],[1,"loginForm__message","loginForm__message--error"],[1,"loginForm__message"],[1,"controlError"],["class","controlError__item",4,"ngIf"],[1,"controlError__item"]],template:function(e,o){if(1&e&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return o.submit()}),t.TgZ(1,"div",1),t._uU(2," \u0412\u043e\u0439\u0442\u0438 \u0432 \u043f\u0430\u043d\u0435\u043b\u044c \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430 "),t.qZA(),t.YNc(3,y,2,1,"div",2),t.ALo(4,"async"),t.YNc(5,O,2,1,"div",3),t.TgZ(6,"div",4),t.TgZ(7,"div",5),t.TgZ(8,"div",6),t.TgZ(9,"label",7),t._uU(10,"Email:"),t.qZA(),t._UZ(11,"input",8),t.YNc(12,w,3,2,"div",9),t.qZA(),t.qZA(),t.TgZ(13,"div",5),t.TgZ(14,"div",6),t.TgZ(15,"label",10),t._uU(16,"Password:"),t.qZA(),t._UZ(17,"input",11),t.YNc(18,E,3,2,"div",9),t.qZA(),t.qZA(),t.TgZ(19,"div",12),t.TgZ(20,"button",13),t._uU(21,"\u0412\u043e\u0439\u0442\u0438"),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&e){let r,c,g,d;t.Q6J("formGroup",o.loginForm),t.xp6(3),t.Q6J("ngIf",t.lcZ(4,8,o.auth.error$)),t.xp6(2),t.Q6J("ngIf",o.messageFromQueryParams),t.xp6(3),t.Q6J("ngClass",t.VKq(10,v,(null==(r=o.loginForm.get("email"))?null:r.touched)&&(null==(r=o.loginForm.get("email"))?null:r.invalid))),t.xp6(4),t.Q6J("ngIf",(null==(c=o.loginForm.get("email"))?null:c.touched)&&(null==(c=o.loginForm.get("email"))?null:c.invalid)),t.xp6(2),t.Q6J("ngClass",t.VKq(12,v,(null==(g=o.loginForm.get("password"))?null:g.touched)&&(null==(g=o.loginForm.get("password"))?null:g.invalid))),t.xp6(4),t.Q6J("ngIf",(null==(d=o.loginForm.get("password"))?null:d.touched)&&(null==(d=o.loginForm.get("password"))?null:d.invalid)),t.xp6(2),t.Q6J("disabled",(null==o.loginForm?null:o.loginForm.invalid)||o.submitted)}},directives:[u._Y,u.JL,u.sg,s.O5,s.mk,u.Fj,u.JJ,u.u],pipes:[s.Ov],styles:[".loginForm[_ngcontent-%COMP%]{margin-top:30px;border:1px solid black;border-radius:6px;max-width:600px;padding:30px}.loginForm[_ngcontent-%COMP%]   .loginForm__header[_ngcontent-%COMP%]{margin-bottom:20px;font-size:24px}.loginForm[_ngcontent-%COMP%]   .loginForm__message[_ngcontent-%COMP%]{margin-bottom:20px;padding:10px;background-color:gray;color:#fff;font-size:16px}.loginForm[_ngcontent-%COMP%]   .loginForm__message--error[_ngcontent-%COMP%]{background-color:brown}.loginForm[_ngcontent-%COMP%]   .loginForm__form[_ngcontent-%COMP%]   .loginForm__control[_ngcontent-%COMP%]{margin-bottom:20px}.loginForm[_ngcontent-%COMP%]   .loginForm__form[_ngcontent-%COMP%]   .loginForm__control[_ngcontent-%COMP%]:last-child{margin:0}.inputControl[_ngcontent-%COMP%]{display:flex;flex-direction:column}.inputControl[_ngcontent-%COMP%]   .inputControl__label[_ngcontent-%COMP%]{margin-bottom:10px}.inputControl--invalid[_ngcontent-%COMP%]{color:red}.inputControl--invalid[_ngcontent-%COMP%]   .inputControl__input[_ngcontent-%COMP%]{color:red}.controlError[_ngcontent-%COMP%]{color:red}"]}),n})();var p=a(5153);let D=(()=>{class n{constructor(e,o){this.postsService=e,this.alertService=o}ngOnInit(){}create(){const e={title:"5 \u043f\u0440\u0438\u0447\u0438\u043d \u043f\u043e\u0447\u0435\u043c\u0443 \u0444\u043b\u0438\u0440\u0442\u043e\u0432\u0430\u0442\u044c \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u043d\u0435\u043d\u0430\u0434\u0435\u0436\u043d\u043e",html:'\n        <p class="articleParagraph">\u0424\u043b\u0438\u0440\u0442 \u2013 \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0435\u043d\u043d\u0430\u044f \u0444\u043e\u0440\u043c\u0430 \u043e\u0431\u0449\u0435\u043d\u0438\u044f \u043c\u0435\u0436\u0434\u0443 \u043c\u0443\u0436\u0447\u0438\u043d\u043e\u0439 \u0438 \u0436\u0435\u043d\u0449\u0438\u043d\u043e\u0439. \u041f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u0438 \u043f\u0440\u043e\u0442\u0438\u0432\u043e\u043f\u043e\u043b\u043e\u0436\u043d\u043e\u0433\u043e \u043f\u043e\u043b\u0430 \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u044e\u0442 \u0434\u0440\u0443\u0433 \u0441 \u0434\u0440\u0443\u0433\u043e\u043c, \u043a\u0430\u043a \u043d\u0430 \u0434\u043e\u0441\u0443\u0433\u0435, \u0442\u0430\u043a \u0438 \u0432 \u0434\u0435\u043b\u043e\u0432\u043e\u0439 \u043e\u0431\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0435.</p>\n        <p class="articleParagraph">\u041d\u0435\u043f\u0440\u0438\u043d\u0443\u0436\u0434\u0435\u043d\u043d\u044b\u0435 \u0443\u0445\u0430\u0436\u0438\u0432\u0430\u043d\u0438\u044f \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u043d\u0430\u043f\u043e\u043c\u0438\u043d\u0430\u044e\u0442 \u0438\u0433\u0440\u0443, \u043a\u0430\u0436\u0443\u0442\u0441\u044f \u0431\u0435\u0437\u043e\u0431\u0438\u0434\u043d\u044b\u043c \u0440\u0430\u0437\u0432\u043b\u0435\u0447\u0435\u043d\u0438\u0435\u043c. \u0422\u0430\u043a \u043b\u0438 \u044d\u0442\u043e \u043d\u0430 \u0441\u0430\u043c\u043e\u043c \u0434\u0435\u043b\u0435? \u041f\u0441\u0438\u0445\u043e\u043b\u043e\u0433\u0438 \u043d\u0430\u0445\u043e\u0434\u044f\u0442 \u043f\u043b\u044e\u0441\u044b \u0432 \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u043d\u0438\u044f\u0445 \u043c\u0435\u0436\u0434\u0443 \u043a\u043e\u043b\u043b\u0435\u0433\u0430\u043c\u0438, \u043d\u043e \u0432\u0441\u0435 \u0436\u0435 \u0441\u0447\u0438\u0442\u0430\u044e\u0442 \u0442\u0430\u043a\u043e\u0439 \u0444\u043b\u0438\u0440\u0442 \u043e\u043f\u0430\u0441\u043d\u044b\u043c.</p>\n        <span class="articleHeader">\u041f\u043e\u043b\u043e\u0436\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0441\u0442\u043e\u0440\u043e\u043d\u044b \u043d\u0435\u043f\u0440\u0438\u043d\u0443\u0436\u0434\u0435\u043d\u043d\u044b\u0445 \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u0439.</span>\n        <p class="articleParagraph">\n          \u0427\u0435\u043b\u043e\u0432\u0435\u043a \u043f\u0440\u043e\u0432\u043e\u0434\u0438\u0442 \u043d\u0430 \u0440\u0430\u0431\u043e\u0447\u0435\u043c \u043c\u0435\u0441\u0442\u0435 \u043c\u0438\u043d\u0438\u043c\u0443\u043c 8 \u0447\u0430\u0441\u043e\u0432 \u0432 \u0441\u0443\u0442\u043a\u0438 5 \u0434\u043d\u0435\u0439 \u0432 \u043d\u0435\u0434\u0435\u043b\u044e. \u0415\u0441\u043b\u0438 \u043d\u0430 \u043f\u0440\u043e\u0442\u044f\u0436\u0435\u043d\u0438\u0438 \u044d\u0442\u043e\u0433\u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u0442\u044c \u0441\u0435\u0440\u044c\u0435\u0437\u043d\u044b\u0439 \u043d\u0430\u0441\u0442\u0440\u043e\u0439 \u0438 \u0434\u0443\u043c\u0430\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u043e \u0434\u0435\u043b\u043e\u0432\u044b\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u0445, \u043c\u043e\u0436\u0435\u0442 \u043f\u0440\u043e\u0438\u0437\u043e\u0439\u0442\u0438 \u0432\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0435\u0435 \u0432\u044b\u0433\u043e\u0440\u0430\u043d\u0438\u0435.\n        </p>\n        <div class="articleParagraph">\n          \u0424\u043b\u0438\u0440\u0442 \u043f\u043e\u043c\u043e\u0433\u0430\u0435\u0442:\n          <ul class="articleList">\n            <li class="articleListItem">\u041f\u0440\u0435\u0434\u043e\u0442\u0432\u0440\u0430\u0442\u0438\u0442\u044c \u0441\u0442\u0440\u0435\u0441\u0441. \u041a\u043e\u043c\u043f\u043b\u0438\u043c\u0435\u043d\u0442, \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u043d\u044b\u0439 \u043e\u0442 \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u044f \u043f\u0440\u043e\u0442\u0438\u0432\u043e\u043f\u043e\u043b\u043e\u0436\u043d\u043e\u0433\u043e \u043f\u043e\u043b\u0430, \u0443\u043b\u0443\u0447\u0448\u0430\u0435\u0442 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d\u0438\u0435, \u0437\u0430\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0440\u0430\u0441\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u043b\u0435\u0447\u0438.</li>\n            <li class="articleListItem">\u041f\u043e\u0432\u044b\u0441\u0438\u0442\u044c \u0441\u0430\u043c\u043e\u043e\u0446\u0435\u043d\u043a\u0443. \u041e\u0442\u0432\u0435\u0442\u043d\u0430\u044f \u0440\u0435\u0430\u043a\u0446\u0438\u044f \u043d\u0430 \u043f\u043e\u0434\u043c\u0438\u0433\u0438\u0432\u0430\u043d\u0438\u0435 \u0438\u043b\u0438 \u0443\u043b\u044b\u0431\u043a\u0443 \u043f\u0440\u0438\u044f\u0442\u043d\u0430, \u0442\u0430\u043a \u043a\u0430\u043a \u0443\u0431\u0435\u0436\u0434\u0430\u0435\u0442 \u0432 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0439 \u043f\u0440\u0438\u0432\u043b\u0435\u043a\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438.</li>\n            <li class="articleListItem">\u0423\u043b\u0443\u0447\u0448\u0438\u0442\u044c \u0440\u0430\u0431\u043e\u0442\u043e\u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u044c. \u041d\u0430\u043b\u0438\u0447\u0438\u0435 \u043f\u043e\u043a\u043b\u043e\u043d\u043d\u0438\u043a\u0430 \u0438\u043b\u0438 \u043e\u0431\u044a\u0435\u043a\u0442\u0430 \u0441\u0438\u043c\u043f\u0430\u0442\u0438\u0438 \u043c\u043e\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442 \u043f\u0440\u0438\u0445\u043e\u0434\u0438\u0442\u044c \u043d\u0430 \u043c\u0435\u0441\u0442\u043e \u0441\u043b\u0443\u0436\u0431\u044b \u0432\u043e\u0432\u0440\u0435\u043c\u044f, \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u043e \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0438, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0441\u0435\u0431\u044f \u0441 \u043b\u0443\u0447\u0448\u0435\u0439 \u0441\u0442\u043e\u0440\u043e\u043d\u044b.</li>\n          </ul>\n        </div>\n        <span class="articleHeader">\u041f\u043e\u0447\u0435\u043c\u0443 \u0444\u043b\u0438\u0440\u0442\u043e\u0432\u0430\u0442\u044c \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u043d\u0435\u043d\u0430\u0434\u0435\u0436\u043d\u043e?</span>\n        <div class="articleParagraph">\n          \u041e\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u043c\u043e\u043c\u0435\u043d\u0442\u043e\u0432 \u0444\u043b\u0438\u0440\u0442\u0430 \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u0431\u043e\u043b\u044c\u0448\u0435, \u0447\u0435\u043c \u043f\u043e\u043b\u043e\u0436\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0445:\n          <ul class="articleList">\n            <li class="articleListItem">\u0423\u043b\u044b\u0431\u043a\u0438 \u0438 \u043d\u0435\u0432\u0438\u043d\u043d\u044b\u0435 \u043d\u0430\u043c\u0435\u043a\u0438 \u043c\u043e\u0433\u0443\u0442 \u0432\u044b\u0437\u0432\u0430\u0442\u044c \u0432\u043b\u044e\u0431\u043b\u0435\u043d\u043d\u043e\u0441\u0442\u044c. \u0415\u0441\u043b\u0438 \u043e\u0434\u0438\u043d \u0438\u0437 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432 \u0438\u0433\u0440\u044b \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d \u043d\u0430 \u0441\u0435\u0440\u044c\u0435\u0437\u043d\u044b\u0435 \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u044f, \u0430 \u0434\u0440\u0443\u0433\u043e\u0439 \u2013 \u043d\u0435\u0442, \u043d\u0435\u043c\u0438\u043d\u0443\u0435\u043c \u0441\u043a\u043e\u0440\u044b\u0439 \u0440\u0430\u0437\u0440\u044b\u0432. \u0412 \u043d\u0435\u0441\u043e\u0441\u0442\u043e\u044f\u0432\u0448\u0435\u0439\u0441\u044f \u043f\u0430\u0440\u0435 \u0432\u043e\u0437\u043d\u0438\u043a\u0430\u0435\u0442 \u043d\u0430\u043f\u0440\u044f\u0436\u0435\u043d\u0438\u0435, \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0435 \u043f\u0435\u0440\u0435\u0440\u0430\u0441\u0442\u0438 \u0432 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0439 \u043a\u043e\u043d\u0444\u043b\u0438\u043a\u0442.</li>\n            <li class="articleListItem">\u0417\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u043d\u0438\u044f \u0434\u0430\u044e\u0442 \u043f\u043e\u0432\u043e\u0434 \u0434\u043b\u044f \u0441\u043f\u043b\u0435\u0442\u0435\u043d. \u041f\u0435\u0440\u0435\u0441\u0443\u0434\u044b \u0437\u0430 \u0441\u043f\u0438\u043d\u043e\u0439 \u2013 \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0435\u043d\u043d\u043e\u0435 \u0440\u0430\u0437\u0432\u043b\u0435\u0447\u0435\u043d\u0438\u0435 \u043e\u0444\u0438\u0441\u043d\u044b\u0445 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u043e\u0432. \u0420\u0430\u0437\u0433\u043e\u0432\u043e\u0440\u044b \u043e \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u043c \u0441\u043b\u0443\u0436\u0435\u0431\u043d\u043e\u043c \u0440\u043e\u043c\u0430\u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0432\u044b\u0439\u0442\u0438 \u0437\u0430 \u043f\u0440\u0435\u0434\u0435\u043b\u044b \u0444\u0438\u0440\u043c\u044b \u0438 \u043f\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043a \u0441\u0435\u043c\u0435\u0439\u043d\u044b\u043c \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430\u043c, \u0435\u0441\u043b\u0438 \u043e\u0434\u0438\u043d \u0438\u0437 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 \u043d\u0435\u0441\u0432\u043e\u0431\u043e\u0434\u0435\u043d.</li>\n            <li class="articleListItem">\u0423\u0432\u043b\u0435\u0447\u0435\u043d\u043d\u044b\u0439 \u0447\u0435\u043b\u043e\u0432\u0435\u043a \u0441\u043f\u043e\u0441\u043e\u0431\u0435\u043d \u0432\u044b\u0434\u0430\u0442\u044c \u0442\u0430\u0439\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438. \u0418\u043d\u043e\u0433\u0434\u0430 \u0444\u043b\u0438\u0440\u0442\u043e\u0432\u0430\u0442\u044c \u043d\u0430\u0447\u0438\u043d\u0430\u044e\u0442 \u0434\u043b\u044f \u0442\u043e\u0433\u043e, \u0447\u0442\u043e\u0431\u044b \u0440\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0438\u0442\u044c \u0438 \xab\u0440\u0430\u0437\u0433\u043e\u0432\u043e\u0440\u0438\u0442\u044c\xbb \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430 \u0444\u0438\u0440\u043c\u044b. \u0412 \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u0441\u043b\u0443\u0447\u0430\u044f\u0445 \u0440\u0430\u0437\u043e\u0447\u0430\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0431\u0435\u0437\u043e\u0442\u0432\u0435\u0442\u043d\u044b\u043c\u0438 \u0447\u0443\u0432\u0441\u0442\u0432\u0430\u043c\u0438 \u043e\u0431\u044a\u0435\u043a\u0442 \u0438\u0434\u0435\u0442 \u043d\u0430 \u0441\u043b\u0443\u0436\u0435\u0431\u043d\u043e\u0435 \u043f\u0440\u0435\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435 \u0438\u0437 \u043c\u0435\u0441\u0442\u0438.</li>\n            <li class="articleListItem">\u0424\u043b\u0438\u0440\u0442 \u043c\u043e\u0436\u0435\u0442 \u0432\u044b\u0437\u0432\u0430\u0442\u044c \u0440\u0435\u0432\u043d\u043e\u0441\u0442\u044c. \u0415\u0441\u043b\u0438 \u0441\u0438\u043c\u043f\u0430\u0442\u0438\u0447\u043d\u044b\u0439 \u043a\u043e\u043b\u043b\u0435\u0433\u0430 \u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u043e\u0441\u0442\u044c\u044e, \u0442\u043e\u0442, \u0441 \u043a\u0435\u043c \u043e\u043d \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u0435\u0442, \u043f\u043e\u043f\u0430\u0434\u0430\u0435\u0442 \u0432 \u043e\u043f\u0430\u043b\u0443.</li>\n            <li class="articleListItem">\u041a\u043e\u043c\u043f\u043b\u0438\u043c\u0435\u043d\u0442\u044b \u0438 \u0443\u043b\u044b\u0431\u043a\u0438 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u044b \u043f\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043a \u043f\u043e\u0442\u0435\u0440\u0435 \u0434\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u0438. \u041e\u043f\u0430\u0441\u043d\u0435\u0435 \u0432\u0441\u0435\u0433\u043e \u0444\u043b\u0438\u0440\u0442 \u0441 \u043d\u0430\u0447\u0430\u043b\u044c\u043d\u0438\u043a\u043e\u043c. \u0415\u0441\u043b\u0438 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c \u0443\u0432\u043b\u0435\u0447\u0435\u0442\u0441\u044f, \u043f\u0440\u0438\u0434\u0435\u0442\u0441\u044f \u043f\u0435\u0440\u0435\u0445\u043e\u0434\u0438\u0442\u044c \u043e\u0442 \u0441\u043b\u043e\u0432 \u043a \u0434\u0435\u043b\u0443 \u0438\u043b\u0438 \u0438\u0441\u043a\u0430\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u0440\u0430\u0431\u043e\u0442\u0443.</li>\n          </ul>\n        </div>\n        <div class="articleParagraph">\n          \u0421\u0442\u043e\u0438\u0442 \u043b\u0438 \u043f\u0440\u0438\u0431\u0435\u0433\u0430\u0442\u044c \u043a \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u043d\u0438\u044f\u043c \u2013 \u043b\u0438\u0447\u043d\u044b\u0439 \u0432\u044b\u0431\u043e\u0440 \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0430. \u041e\u043d\u0438 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u044b \u0432\u044b\u0437\u0432\u0430\u0442\u044c \u043d\u0435\u043f\u0440\u0438\u044f\u0442\u043d\u043e\u0441\u0442\u0438, \u043d\u043e \u0438\u043d\u043e\u0433\u0434\u0430 \u0444\u043b\u0438\u0440\u0442 \u043f\u043e\u043c\u043e\u0433\u0430\u0435\u0442 \u0443\u0441\u0442\u0440\u043e\u0438\u0442\u044c \u043b\u0438\u0447\u043d\u0443\u044e \u0436\u0438\u0437\u043d\u044c.\n        </div>\n      ',authorList:[{link:"grg/gvsv/bsdfv/bdfv3",name:"\u0418\u0433\u043e\u0440\u044c",occupation:"\u0412\u043e\u0434\u0438\u0442\u0435\u043b\u044c",imageUrl:"assets/images/linkToArticlesX2.png"}],published:new Date,viewCount:147,likeCount:20,dislikeCount:11};this.postsService.create(e).subscribe(()=>{console.log("\u0421\u043e\u0437\u0434\u0430\u043b\u0438 \u043f\u043e\u0441\u0442"),this.alertService.success("\u041f\u043e\u0441\u0442 \u0431\u044b\u043b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043e\u0437\u0434\u0430\u043d")})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.P),t.Y36(m))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-create-page"]],decls:4,vars:0,consts:[["type","submit",1,"btn",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"p"),t._uU(1,"create-page works!"),t.qZA(),t.TgZ(2,"button",0),t.NdJ("click",function(){return o.create()}),t._uU(3,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u043e\u0441\u0442"),t.qZA())},styles:[""]}),n})(),k=(()=>{class n{transform(e,o){return o.trim()?e.filter(r=>r.title.toLowerCase().includes(o.toLowerCase())):e}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275pipe=t.Yjl({name:"search",type:n,pure:!0}),n})();function S(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"tr"),t.TgZ(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.ALo(9,"date"),t.qZA(),t.TgZ(10,"td"),t.TgZ(11,"button",7),t.NdJ("click",function(){const c=t.CHM(e).$implicit;return t.oxw(3).goToEditPage(c.id)}),t._uU(12," \u041e\u0442\u043a\u0440\u044b\u0442\u044c "),t.qZA(),t.TgZ(13,"a",8),t.NdJ("click",function(){const c=t.CHM(e).$implicit;return t.oxw(3).remove(c.id)}),t._uU(14,"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"),t.qZA(),t.qZA(),t.qZA()}if(2&n){const e=i.$implicit,o=i.index;t.xp6(2),t.Oqu(o+1),t.xp6(2),t.Oqu(e.author),t.xp6(2),t.Oqu(e.title),t.xp6(2),t.Oqu(t.gM2(9,4,e.published,"medium","","ru"))}}function J(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"div",4),t.TgZ(1,"div"),t.TgZ(2,"input",5),t.NdJ("ngModelChange",function(r){return t.CHM(e),t.oxw(2).searchStr=r}),t.qZA(),t.qZA(),t.TgZ(3,"table"),t.TgZ(4,"thead"),t.TgZ(5,"tr"),t.TgZ(6,"th"),t._uU(7,"#"),t.qZA(),t.TgZ(8,"th"),t._uU(9,"\u0410\u0432\u0442\u043e\u0440"),t.qZA(),t.TgZ(10,"th"),t._uU(11,"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"),t.qZA(),t.TgZ(12,"th"),t._uU(13,"\u0414\u0430\u0442\u0430"),t.qZA(),t.TgZ(14,"th"),t._uU(15,"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(16,"tbody"),t.YNc(17,S,15,9,"tr",6),t.ALo(18,"search"),t.qZA(),t.qZA(),t.qZA()}if(2&n){const e=t.oxw(2);t.xp6(2),t.Q6J("ngModel",e.searchStr),t.xp6(15),t.Q6J("ngForOf",t.xi3(18,2,e.posts,e.searchStr))}}function Y(n,i){1&n&&(t.TgZ(0,"p"),t._uU(1,"\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u0443\u0441\u0442"),t.qZA())}function N(n,i){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,J,19,5,"div",2),t.YNc(2,Y,2,0,"ng-template",null,3,t.W1O),t.qZA()),2&n){const e=t.MAs(3),o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.posts.length)("ngIfElse",e)}}function Q(n,i){1&n&&(t.TgZ(0,"p"),t._uU(1,"\u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."),t.qZA())}let B=(()=>{class n{constructor(e,o,r){this.postsService=e,this.alertService=o,this.router=r,this.posts=[],this.loading=!0,this.searchStr=""}ngOnInit(){this.postsService.getAll().subscribe(e=>{this.posts=e,this.loading=!1})}remove(e){e&&(this.loading=!0,this.dSub=this.postsService.remove(e).subscribe(()=>{this.loading=!1,this.posts=this.posts.filter(o=>o.id!==e),this.alertService.danger("\u041f\u043e\u0441\u0442 \u0431\u044b\u043b \u0443\u0434\u0430\u043b\u0435\u043d")}))}goToEditPage(e){this.loading=!0,this.router.navigate(["/admin","post",e,"edit"]).then(o=>{o||(this.loading=!1,this.alertService.warning("\u0423\u043f\u0441, \u0447\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a("))})}ngOnDestroy(){var e,o;null===(e=this.pSub)||void 0===e||e.unsubscribe(),null===(o=this.dSub)||void 0===o||o.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.P),t.Y36(m),t.Y36(l.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-dashboard-page"]],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["loadingTemplate",""],["style","margin-top: 30px;",4,"ngIf","ngIfElse"],["empty",""],[2,"margin-top","30px"],["type","text","placeholder","\u041d\u0430\u0439\u0442\u0438 \u043f\u043e\u0441\u0442...",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],[1,"btn",3,"click"],[3,"click"]],template:function(e,o){if(1&e&&(t.YNc(0,N,4,2,"div",0),t.YNc(1,Q,2,0,"ng-template",null,1,t.W1O)),2&e){const r=t.MAs(2);t.Q6J("ngIf",!o.loading)("ngIfElse",r)}},directives:[s.O5,u.Fj,u.JJ,u.On,s.sg],pipes:[k,s.uU],styles:[""]}),n})();function j(n,i){if(1&n&&(t.TgZ(0,"div"),t.TgZ(1,"p"),t._uU(2,"edit-page works!"),t.qZA(),t.TgZ(3,"div"),t._uU(4),t.qZA(),t.qZA()),2&n){const e=t.oxw();t.xp6(4),t.hij("\u041f\u043e\u0441\u0442 ",e.post.id," \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d")}}function z(n,i){1&n&&t._uU(0," \u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430...\n")}let G=(()=>{class n{constructor(e,o){this.route=e,this.postsServise=o}ngOnInit(){this.route.data.subscribe(e=>{this.post=e.data})}ngOnDestroy(){this.pSub&&this.pSub.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(l.gz),t.Y36(p.P))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-edit-page"]],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["loading",""]],template:function(e,o){if(1&e&&(t.YNc(0,j,5,1,"div",0),t.YNc(1,z,1,0,"ng-template",null,1,t.W1O)),2&e){const r=t.MAs(2);t.Q6J("ngIf",o.post)("ngIfElse",r)}},directives:[s.O5],styles:[""]}),n})();var $=a(4466);let _=(()=>{class n{constructor(e,o){this.auth=e,this.router=o}canActivate(e,o){return!!this.auth.isAuthenticated()||(this.auth.logout(),this.router.navigate(["/admin","login"],{queryParams:{loginFailed:!0}}),!1)}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(h.e),t.LFG(l.F0))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();var H=a(9193),X=a(5304);let R=(()=>{class n{constructor(e,o){this.postsService=e,this.router=o}resolve(e,o){var r;return this.postsService.getById(null===(r=e.params)||void 0===r?void 0:r.id).pipe((0,X.K)(()=>(console.log("catchError in PostResolver"),this.router.navigate(["/admin","dashboard"]),H.E)))}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(p.P),t.LFG(l.F0))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),K=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[_,m],imports:[[s.ez,u.u5,u.UX,$.m,l.Bz.forChild([{path:"",component:F,children:[{path:"",redirectTo:"/admin/login",pathMatch:"full"},{path:"login",component:U},{path:"dashboard",component:B,canActivate:[_]},{path:"create",component:D,canActivate:[_]},{path:"post/:id/edit",component:G,canActivate:[_],resolve:{data:R}}]}])],l.Bz]}),n})()}}]);