"use strict";(self.webpackChunkmyProject=self.webpackChunkmyProject||[]).push([[972],{8972:(V,f,a)=>{a.r(f),a.d(f,{AdminModule:()=>W});var c=a(6895),l=a(1718),u=a(4719),t=a(6353),h=a(7342),C=a(5529);let m=(()=>{class n{constructor(){this.alert$=new C.xQ}success(e){this.alert$.next({type:"success",text:e})}warning(e){this.alert$.next({type:"warning",text:e})}danger(e){this.alert$.next({type:"danger",text:e})}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();const P=function(n,i,e){return{"alert__wrap--success":n,"alert__wrap--warning":i,"alert__wrap--danger":e}};function x(n,i){if(1&n&&(t.TgZ(0,"div",1)(1,"div",2),t._uU(2),t.qZA()()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngClass",t.kEZ(2,P,"success"===(null==e.alertData?null:e.alertData.type),"warning"===(null==e.alertData?null:e.alertData.type),"danger"===(null==e.alertData?null:e.alertData.type))),t.xp6(1),t.hij(" ",null==e.alertData?null:e.alertData.text," ")}}let b=(()=>{class n{constructor(e){this.alertService=e,this.delay=5e3}ngOnInit(){this.aSub=this.alertService.alert$.subscribe(e=>{this.alertData=e;const o=setTimeout(()=>{clearTimeout(o),this.alertData=null},this.delay)})}ngOnDestroy(){this.aSub?.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(m))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-alert"]],inputs:{delay:"delay"},decls:1,vars:1,consts:[["class","alert",4,"ngIf"],[1,"alert"],[1,"alert__wrap",3,"ngClass"]],template:function(e,o){1&e&&t.YNc(0,x,3,6,"div",0),2&e&&t.Q6J("ngIf",o.alertData)},dependencies:[c.mk,c.O5],styles:[".alert[_ngcontent-%COMP%]{position:fixed;top:20px;width:100%;padding:0 20px;box-sizing:border-box;display:flex;justify-content:flex-end}.alert[_ngcontent-%COMP%]   .alert__wrap[_ngcontent-%COMP%]{background:gray;color:#fff;padding:20px;border-radius:6px;max-width:300px}.alert[_ngcontent-%COMP%]   .alert__wrap--success[_ngcontent-%COMP%]{background-color:green}.alert[_ngcontent-%COMP%]   .alert__wrap--danger[_ngcontent-%COMP%]{background-color:orange}.alert[_ngcontent-%COMP%]   .alert__wrap--warning[_ngcontent-%COMP%]{background-color:red}"]}),n})();const A=function(){return["/admin","dashboard"]},F=function(){return["/admin","create"]};function Z(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"nav",2)(1,"ul",3)(2,"li",4)(3,"a",5),t._uU(4,"UI"),t.qZA()(),t.TgZ(5,"li",6)(6,"a",7),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.goToAnotherPage(["/admin","dashboard"]))}),t._uU(7,"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"),t.qZA()(),t.TgZ(8,"li",6)(9,"a",7),t.NdJ("click",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.goToAnotherPage(["/admin","create"]))}),t._uU(10,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"),t.qZA()(),t.TgZ(11,"li",4)(12,"a",8),t.NdJ("click",function(r){t.CHM(e);const s=t.oxw();return t.KtG(s.logout(r))}),t._uU(13,"\u0412\u044b\u0439\u0442\u0438"),t.qZA()()()()}2&n&&(t.xp6(6),t.Q6J("routerLink",t.DdM(2,A)),t.xp6(3),t.Q6J("routerLink",t.DdM(3,F)))}let T=(()=>{class n{constructor(e,o){this.router=e,this.auth=o}ngOnInit(){}goToAnotherPage(e){this.router.navigate(e)}logout(e){e.preventDefault(),this.auth.logout(),this.router.navigate(["/admin","login"])}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(l.F0),t.Y36(h.e))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-admin-layout"]],decls:5,vars:2,consts:[["class","menu",4,"ngIf"],[3,"delay"],[1,"menu"],[1,"menu__list"],[1,"menu__item"],["routerLink","/"],["routerLinkActive","menu__item--active",1,"menu__item"],[3,"routerLink","click"],["href","#",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"p"),t._uU(1,"admin-layout works!"),t.qZA(),t.YNc(2,Z,14,4,"nav",0),t._UZ(3,"app-alert",1)(4,"router-outlet")),2&e&&(t.xp6(2),t.Q6J("ngIf",o.auth.isAuthenticated()),t.xp6(1),t.Q6J("delay",3e3))},dependencies:[c.O5,l.lC,l.rH,l.Od,b],styles:[".menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]{display:flex}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]{margin-left:10px}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:underline;cursor:pointer;color:#000}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item--active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:red}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]:first-child{margin:0}"]}),n})();function y(n,i){if(1&n&&(t.TgZ(0,"div",14),t._uU(1),t.qZA()),2&n){const e=i.ngIf;t.xp6(1),t.hij(" ",e," ")}}function O(n,i){if(1&n&&(t.TgZ(0,"div",15),t._uU(1),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.hij(" ",e.messageFromQueryParams," ")}}function M(n,i){1&n&&(t.TgZ(0,"div",18),t._uU(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email"),t.qZA())}function w(n,i){1&n&&(t.TgZ(0,"div",18),t._uU(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 email"),t.qZA())}function E(n,i){if(1&n&&(t.TgZ(0,"div",16),t.YNc(1,M,2,0,"div",17),t.YNc(2,w,2,0,"div",17),t.qZA()),2&n){const e=t.oxw();let o,r;t.xp6(1),t.Q6J("ngIf",null==(o=e.loginForm.get("email"))||null==o.errors?null:o.errors.required),t.xp6(1),t.Q6J("ngIf",null==(r=e.loginForm.get("email"))||null==r.errors?null:r.errors.email)}}function L(n,i){1&n&&(t.TgZ(0,"div",18),t._uU(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"),t.qZA())}function I(n,i){if(1&n&&(t.TgZ(0,"div",18),t._uU(1),t.qZA()),2&n){const e=t.oxw(2);let o;t.xp6(1),t.hij(" \u041f\u0430\u0440\u043e\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u043d\u0435 \u043c\u0435\u043d\u0435\u0435 ",null==(o=e.loginForm.get("password"))||null==o.errors?null:o.errors.minlength.requiredLength," \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 ")}}function q(n,i){if(1&n&&(t.TgZ(0,"div",16),t.YNc(1,L,2,0,"div",17),t.YNc(2,I,2,1,"div",17),t.qZA()),2&n){const e=t.oxw();let o,r;t.xp6(1),t.Q6J("ngIf",null==(o=e.loginForm.get("password"))||null==o.errors?null:o.errors.required),t.xp6(1),t.Q6J("ngIf",null==(r=e.loginForm.get("password"))||null==r.errors?null:r.errors.minlength)}}const v=function(n){return{"inputControl--invalid":n}};let U=(()=>{class n{constructor(e,o,r){this.auth=e,this.router=o,this.route=r,this.submitted=!1}ngOnInit(){this.route.queryParams.subscribe(e=>{e.loginFailed?this.messageFromQueryParams="\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435":e.authFailed&&(this.messageFromQueryParams="\u0421\u0435\u0441\u0441\u0438\u044f \u0438\u0441\u0442\u0435\u043a\u043b\u0430. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0437\u0430\u043d\u043e\u0432\u043e")}),this.loginForm=new u.nJ({email:new u.p4(null,[u.kI.email,u.kI.required]),password:new u.p4(null,[u.kI.required,u.kI.minLength(6)])})}submit(){this.loginForm?.valid&&(this.submitted=!0,this.auth.login({email:this.loginForm.value.email,password:this.loginForm.value.password}).subscribe(()=>{this.submitted=!1,this.loginForm.reset(),this.router.navigate(["/admin","dashboard"])},()=>this.submitted=!1))}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(h.e),t.Y36(l.F0),t.Y36(l.gz))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login-page"]],decls:22,vars:14,consts:[[1,"loginForm",3,"formGroup","ngSubmit"],[1,"loginForm__header"],["class","loginForm__message loginForm__message--error",4,"ngIf"],["class","loginForm__message",4,"ngIf"],[1,"loginForm__form"],[1,"loginForm__control"],[1,"inputControl",3,"ngClass"],["for","adminEmail",1,"inputControl__label"],["id","adminEmail","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email","formControlName","email","type","text",1,"inputControl__input"],["class","controlError",4,"ngIf"],["for","adminPassword",1,"inputControl__label"],["id","adminPassword","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c","formControlName","password","type","password",1,"inputControl__input"],[1,"loginForm__btns"],["type","submit",1,"btn",3,"disabled"],[1,"loginForm__message","loginForm__message--error"],[1,"loginForm__message"],[1,"controlError"],["class","controlError__item",4,"ngIf"],[1,"controlError__item"]],template:function(e,o){if(1&e&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return o.submit()}),t.TgZ(1,"div",1),t._uU(2," \u0412\u043e\u0439\u0442\u0438 \u0432 \u043f\u0430\u043d\u0435\u043b\u044c \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430 "),t.qZA(),t.YNc(3,y,2,1,"div",2),t.ALo(4,"async"),t.YNc(5,O,2,1,"div",3),t.TgZ(6,"div",4)(7,"div",5)(8,"div",6)(9,"label",7),t._uU(10,"Email:"),t.qZA(),t._UZ(11,"input",8),t.YNc(12,E,3,2,"div",9),t.qZA()(),t.TgZ(13,"div",5)(14,"div",6)(15,"label",10),t._uU(16,"Password:"),t.qZA(),t._UZ(17,"input",11),t.YNc(18,q,3,2,"div",9),t.qZA()(),t.TgZ(19,"div",12)(20,"button",13),t._uU(21,"\u0412\u043e\u0439\u0442\u0438"),t.qZA()()()()),2&e){let r,s,g,_;t.Q6J("formGroup",o.loginForm),t.xp6(3),t.Q6J("ngIf",t.lcZ(4,8,o.auth.error$)),t.xp6(2),t.Q6J("ngIf",o.messageFromQueryParams),t.xp6(3),t.Q6J("ngClass",t.VKq(10,v,(null==(r=o.loginForm.get("email"))?null:r.touched)&&(null==(r=o.loginForm.get("email"))?null:r.invalid))),t.xp6(4),t.Q6J("ngIf",(null==(s=o.loginForm.get("email"))?null:s.touched)&&(null==(s=o.loginForm.get("email"))?null:s.invalid)),t.xp6(2),t.Q6J("ngClass",t.VKq(12,v,(null==(g=o.loginForm.get("password"))?null:g.touched)&&(null==(g=o.loginForm.get("password"))?null:g.invalid))),t.xp6(4),t.Q6J("ngIf",(null==(_=o.loginForm.get("password"))?null:_.touched)&&(null==(_=o.loginForm.get("password"))?null:_.invalid)),t.xp6(2),t.Q6J("disabled",(null==o.loginForm?null:o.loginForm.invalid)||o.submitted)}},dependencies:[c.mk,c.O5,u._Y,u.Fj,u.JJ,u.JL,u.sg,u.u,c.Ov],styles:[".loginForm[_ngcontent-%COMP%]{margin-top:30px;border:1px solid black;border-radius:6px;max-width:600px;padding:30px}.loginForm[_ngcontent-%COMP%]   .loginForm__header[_ngcontent-%COMP%]{margin-bottom:20px;font-size:24px}.loginForm[_ngcontent-%COMP%]   .loginForm__message[_ngcontent-%COMP%]{margin-bottom:20px;padding:10px;background-color:gray;color:#fff;font-size:16px}.loginForm[_ngcontent-%COMP%]   .loginForm__message--error[_ngcontent-%COMP%]{background-color:brown}.loginForm[_ngcontent-%COMP%]   .loginForm__form[_ngcontent-%COMP%]   .loginForm__control[_ngcontent-%COMP%]{margin-bottom:20px}.loginForm[_ngcontent-%COMP%]   .loginForm__form[_ngcontent-%COMP%]   .loginForm__control[_ngcontent-%COMP%]:last-child{margin:0}.inputControl[_ngcontent-%COMP%]{display:flex;flex-direction:column}.inputControl[_ngcontent-%COMP%]   .inputControl__label[_ngcontent-%COMP%]{margin-bottom:10px}.inputControl--invalid[_ngcontent-%COMP%], .inputControl--invalid[_ngcontent-%COMP%]   .inputControl__input[_ngcontent-%COMP%], .controlError[_ngcontent-%COMP%]{color:red}"]}),n})();var p=a(4051),D=a(4403);let k=(()=>{class n{constructor(e,o,r){this.postsService=e,this.alertService=o,this.locationsService=r}ngOnInit(){}create(){this.postsService.create({title:"5 \u043f\u0440\u0438\u0447\u0438\u043d \u043f\u043e\u0447\u0435\u043c\u0443 \u0444\u043b\u0438\u0440\u0442\u043e\u0432\u0430\u0442\u044c \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u043d\u0435\u043d\u0430\u0434\u0435\u0436\u043d\u043e",html:'\n        <p class="articleParagraph">\u0424\u043b\u0438\u0440\u0442 \u2013 \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0435\u043d\u043d\u0430\u044f \u0444\u043e\u0440\u043c\u0430 \u043e\u0431\u0449\u0435\u043d\u0438\u044f \u043c\u0435\u0436\u0434\u0443 \u043c\u0443\u0436\u0447\u0438\u043d\u043e\u0439 \u0438 \u0436\u0435\u043d\u0449\u0438\u043d\u043e\u0439. \u041f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u0438 \u043f\u0440\u043e\u0442\u0438\u0432\u043e\u043f\u043e\u043b\u043e\u0436\u043d\u043e\u0433\u043e \u043f\u043e\u043b\u0430 \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u044e\u0442 \u0434\u0440\u0443\u0433 \u0441 \u0434\u0440\u0443\u0433\u043e\u043c, \u043a\u0430\u043a \u043d\u0430 \u0434\u043e\u0441\u0443\u0433\u0435, \u0442\u0430\u043a \u0438 \u0432 \u0434\u0435\u043b\u043e\u0432\u043e\u0439 \u043e\u0431\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0435.</p>\n        <p class="articleParagraph">\u041d\u0435\u043f\u0440\u0438\u043d\u0443\u0436\u0434\u0435\u043d\u043d\u044b\u0435 \u0443\u0445\u0430\u0436\u0438\u0432\u0430\u043d\u0438\u044f \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u043d\u0430\u043f\u043e\u043c\u0438\u043d\u0430\u044e\u0442 \u0438\u0433\u0440\u0443, \u043a\u0430\u0436\u0443\u0442\u0441\u044f \u0431\u0435\u0437\u043e\u0431\u0438\u0434\u043d\u044b\u043c \u0440\u0430\u0437\u0432\u043b\u0435\u0447\u0435\u043d\u0438\u0435\u043c. \u0422\u0430\u043a \u043b\u0438 \u044d\u0442\u043e \u043d\u0430 \u0441\u0430\u043c\u043e\u043c \u0434\u0435\u043b\u0435? \u041f\u0441\u0438\u0445\u043e\u043b\u043e\u0433\u0438 \u043d\u0430\u0445\u043e\u0434\u044f\u0442 \u043f\u043b\u044e\u0441\u044b \u0432 \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u043d\u0438\u044f\u0445 \u043c\u0435\u0436\u0434\u0443 \u043a\u043e\u043b\u043b\u0435\u0433\u0430\u043c\u0438, \u043d\u043e \u0432\u0441\u0435 \u0436\u0435 \u0441\u0447\u0438\u0442\u0430\u044e\u0442 \u0442\u0430\u043a\u043e\u0439 \u0444\u043b\u0438\u0440\u0442 \u043e\u043f\u0430\u0441\u043d\u044b\u043c.</p>\n        <span class="articleHeader">\u041f\u043e\u043b\u043e\u0436\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0441\u0442\u043e\u0440\u043e\u043d\u044b \u043d\u0435\u043f\u0440\u0438\u043d\u0443\u0436\u0434\u0435\u043d\u043d\u044b\u0445 \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u0439.</span>\n        <p class="articleParagraph">\n          \u0427\u0435\u043b\u043e\u0432\u0435\u043a \u043f\u0440\u043e\u0432\u043e\u0434\u0438\u0442 \u043d\u0430 \u0440\u0430\u0431\u043e\u0447\u0435\u043c \u043c\u0435\u0441\u0442\u0435 \u043c\u0438\u043d\u0438\u043c\u0443\u043c 8 \u0447\u0430\u0441\u043e\u0432 \u0432 \u0441\u0443\u0442\u043a\u0438 5 \u0434\u043d\u0435\u0439 \u0432 \u043d\u0435\u0434\u0435\u043b\u044e. \u0415\u0441\u043b\u0438 \u043d\u0430 \u043f\u0440\u043e\u0442\u044f\u0436\u0435\u043d\u0438\u0438 \u044d\u0442\u043e\u0433\u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u0442\u044c \u0441\u0435\u0440\u044c\u0435\u0437\u043d\u044b\u0439 \u043d\u0430\u0441\u0442\u0440\u043e\u0439 \u0438 \u0434\u0443\u043c\u0430\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u043e \u0434\u0435\u043b\u043e\u0432\u044b\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u0445, \u043c\u043e\u0436\u0435\u0442 \u043f\u0440\u043e\u0438\u0437\u043e\u0439\u0442\u0438 \u0432\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0435\u0435 \u0432\u044b\u0433\u043e\u0440\u0430\u043d\u0438\u0435.\n        </p>\n        <div class="articleParagraph">\n          \u0424\u043b\u0438\u0440\u0442 \u043f\u043e\u043c\u043e\u0433\u0430\u0435\u0442:\n          <ul class="articleList">\n            <li class="articleListItem">\u041f\u0440\u0435\u0434\u043e\u0442\u0432\u0440\u0430\u0442\u0438\u0442\u044c \u0441\u0442\u0440\u0435\u0441\u0441. \u041a\u043e\u043c\u043f\u043b\u0438\u043c\u0435\u043d\u0442, \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u043d\u044b\u0439 \u043e\u0442 \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u044f \u043f\u0440\u043e\u0442\u0438\u0432\u043e\u043f\u043e\u043b\u043e\u0436\u043d\u043e\u0433\u043e \u043f\u043e\u043b\u0430, \u0443\u043b\u0443\u0447\u0448\u0430\u0435\u0442 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d\u0438\u0435, \u0437\u0430\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0440\u0430\u0441\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u043b\u0435\u0447\u0438.</li>\n            <li class="articleListItem">\u041f\u043e\u0432\u044b\u0441\u0438\u0442\u044c \u0441\u0430\u043c\u043e\u043e\u0446\u0435\u043d\u043a\u0443. \u041e\u0442\u0432\u0435\u0442\u043d\u0430\u044f \u0440\u0435\u0430\u043a\u0446\u0438\u044f \u043d\u0430 \u043f\u043e\u0434\u043c\u0438\u0433\u0438\u0432\u0430\u043d\u0438\u0435 \u0438\u043b\u0438 \u0443\u043b\u044b\u0431\u043a\u0443 \u043f\u0440\u0438\u044f\u0442\u043d\u0430, \u0442\u0430\u043a \u043a\u0430\u043a \u0443\u0431\u0435\u0436\u0434\u0430\u0435\u0442 \u0432 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0439 \u043f\u0440\u0438\u0432\u043b\u0435\u043a\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438.</li>\n            <li class="articleListItem">\u0423\u043b\u0443\u0447\u0448\u0438\u0442\u044c \u0440\u0430\u0431\u043e\u0442\u043e\u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u044c. \u041d\u0430\u043b\u0438\u0447\u0438\u0435 \u043f\u043e\u043a\u043b\u043e\u043d\u043d\u0438\u043a\u0430 \u0438\u043b\u0438 \u043e\u0431\u044a\u0435\u043a\u0442\u0430 \u0441\u0438\u043c\u043f\u0430\u0442\u0438\u0438 \u043c\u043e\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442 \u043f\u0440\u0438\u0445\u043e\u0434\u0438\u0442\u044c \u043d\u0430 \u043c\u0435\u0441\u0442\u043e \u0441\u043b\u0443\u0436\u0431\u044b \u0432\u043e\u0432\u0440\u0435\u043c\u044f, \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u043e \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0438, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0441\u0435\u0431\u044f \u0441 \u043b\u0443\u0447\u0448\u0435\u0439 \u0441\u0442\u043e\u0440\u043e\u043d\u044b.</li>\n          </ul>\n        </div>\n        <span class="articleHeader">\u041f\u043e\u0447\u0435\u043c\u0443 \u0444\u043b\u0438\u0440\u0442\u043e\u0432\u0430\u0442\u044c \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u043d\u0435\u043d\u0430\u0434\u0435\u0436\u043d\u043e?</span>\n        <div class="articleParagraph">\n          \u041e\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u043c\u043e\u043c\u0435\u043d\u0442\u043e\u0432 \u0444\u043b\u0438\u0440\u0442\u0430 \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u0431\u043e\u043b\u044c\u0448\u0435, \u0447\u0435\u043c \u043f\u043e\u043b\u043e\u0436\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0445:\n          <ul class="articleList">\n            <li class="articleListItem">\u0423\u043b\u044b\u0431\u043a\u0438 \u0438 \u043d\u0435\u0432\u0438\u043d\u043d\u044b\u0435 \u043d\u0430\u043c\u0435\u043a\u0438 \u043c\u043e\u0433\u0443\u0442 \u0432\u044b\u0437\u0432\u0430\u0442\u044c \u0432\u043b\u044e\u0431\u043b\u0435\u043d\u043d\u043e\u0441\u0442\u044c. \u0415\u0441\u043b\u0438 \u043e\u0434\u0438\u043d \u0438\u0437 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432 \u0438\u0433\u0440\u044b \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d \u043d\u0430 \u0441\u0435\u0440\u044c\u0435\u0437\u043d\u044b\u0435 \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u044f, \u0430 \u0434\u0440\u0443\u0433\u043e\u0439 \u2013 \u043d\u0435\u0442, \u043d\u0435\u043c\u0438\u043d\u0443\u0435\u043c \u0441\u043a\u043e\u0440\u044b\u0439 \u0440\u0430\u0437\u0440\u044b\u0432. \u0412 \u043d\u0435\u0441\u043e\u0441\u0442\u043e\u044f\u0432\u0448\u0435\u0439\u0441\u044f \u043f\u0430\u0440\u0435 \u0432\u043e\u0437\u043d\u0438\u043a\u0430\u0435\u0442 \u043d\u0430\u043f\u0440\u044f\u0436\u0435\u043d\u0438\u0435, \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0435 \u043f\u0435\u0440\u0435\u0440\u0430\u0441\u0442\u0438 \u0432 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0439 \u043a\u043e\u043d\u0444\u043b\u0438\u043a\u0442.</li>\n            <li class="articleListItem">\u0417\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u043d\u0438\u044f \u0434\u0430\u044e\u0442 \u043f\u043e\u0432\u043e\u0434 \u0434\u043b\u044f \u0441\u043f\u043b\u0435\u0442\u0435\u043d. \u041f\u0435\u0440\u0435\u0441\u0443\u0434\u044b \u0437\u0430 \u0441\u043f\u0438\u043d\u043e\u0439 \u2013 \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0435\u043d\u043d\u043e\u0435 \u0440\u0430\u0437\u0432\u043b\u0435\u0447\u0435\u043d\u0438\u0435 \u043e\u0444\u0438\u0441\u043d\u044b\u0445 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u043e\u0432. \u0420\u0430\u0437\u0433\u043e\u0432\u043e\u0440\u044b \u043e \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u043c \u0441\u043b\u0443\u0436\u0435\u0431\u043d\u043e\u043c \u0440\u043e\u043c\u0430\u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0432\u044b\u0439\u0442\u0438 \u0437\u0430 \u043f\u0440\u0435\u0434\u0435\u043b\u044b \u0444\u0438\u0440\u043c\u044b \u0438 \u043f\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043a \u0441\u0435\u043c\u0435\u0439\u043d\u044b\u043c \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430\u043c, \u0435\u0441\u043b\u0438 \u043e\u0434\u0438\u043d \u0438\u0437 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 \u043d\u0435\u0441\u0432\u043e\u0431\u043e\u0434\u0435\u043d.</li>\n            <li class="articleListItem">\u0423\u0432\u043b\u0435\u0447\u0435\u043d\u043d\u044b\u0439 \u0447\u0435\u043b\u043e\u0432\u0435\u043a \u0441\u043f\u043e\u0441\u043e\u0431\u0435\u043d \u0432\u044b\u0434\u0430\u0442\u044c \u0442\u0430\u0439\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438. \u0418\u043d\u043e\u0433\u0434\u0430 \u0444\u043b\u0438\u0440\u0442\u043e\u0432\u0430\u0442\u044c \u043d\u0430\u0447\u0438\u043d\u0430\u044e\u0442 \u0434\u043b\u044f \u0442\u043e\u0433\u043e, \u0447\u0442\u043e\u0431\u044b \u0440\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0438\u0442\u044c \u0438 \xab\u0440\u0430\u0437\u0433\u043e\u0432\u043e\u0440\u0438\u0442\u044c\xbb \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430 \u0444\u0438\u0440\u043c\u044b. \u0412 \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u0441\u043b\u0443\u0447\u0430\u044f\u0445 \u0440\u0430\u0437\u043e\u0447\u0430\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0431\u0435\u0437\u043e\u0442\u0432\u0435\u0442\u043d\u044b\u043c\u0438 \u0447\u0443\u0432\u0441\u0442\u0432\u0430\u043c\u0438 \u043e\u0431\u044a\u0435\u043a\u0442 \u0438\u0434\u0435\u0442 \u043d\u0430 \u0441\u043b\u0443\u0436\u0435\u0431\u043d\u043e\u0435 \u043f\u0440\u0435\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435 \u0438\u0437 \u043c\u0435\u0441\u0442\u0438.</li>\n            <li class="articleListItem">\u0424\u043b\u0438\u0440\u0442 \u043c\u043e\u0436\u0435\u0442 \u0432\u044b\u0437\u0432\u0430\u0442\u044c \u0440\u0435\u0432\u043d\u043e\u0441\u0442\u044c. \u0415\u0441\u043b\u0438 \u0441\u0438\u043c\u043f\u0430\u0442\u0438\u0447\u043d\u044b\u0439 \u043a\u043e\u043b\u043b\u0435\u0433\u0430 \u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u043e\u0441\u0442\u044c\u044e, \u0442\u043e\u0442, \u0441 \u043a\u0435\u043c \u043e\u043d \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u0435\u0442, \u043f\u043e\u043f\u0430\u0434\u0430\u0435\u0442 \u0432 \u043e\u043f\u0430\u043b\u0443.</li>\n            <li class="articleListItem">\u041a\u043e\u043c\u043f\u043b\u0438\u043c\u0435\u043d\u0442\u044b \u0438 \u0443\u043b\u044b\u0431\u043a\u0438 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u044b \u043f\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043a \u043f\u043e\u0442\u0435\u0440\u0435 \u0434\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u0438. \u041e\u043f\u0430\u0441\u043d\u0435\u0435 \u0432\u0441\u0435\u0433\u043e \u0444\u043b\u0438\u0440\u0442 \u0441 \u043d\u0430\u0447\u0430\u043b\u044c\u043d\u0438\u043a\u043e\u043c. \u0415\u0441\u043b\u0438 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c \u0443\u0432\u043b\u0435\u0447\u0435\u0442\u0441\u044f, \u043f\u0440\u0438\u0434\u0435\u0442\u0441\u044f \u043f\u0435\u0440\u0435\u0445\u043e\u0434\u0438\u0442\u044c \u043e\u0442 \u0441\u043b\u043e\u0432 \u043a \u0434\u0435\u043b\u0443 \u0438\u043b\u0438 \u0438\u0441\u043a\u0430\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u0440\u0430\u0431\u043e\u0442\u0443.</li>\n          </ul>\n        </div>\n        <div class="articleParagraph">\n          \u0421\u0442\u043e\u0438\u0442 \u043b\u0438 \u043f\u0440\u0438\u0431\u0435\u0433\u0430\u0442\u044c \u043a \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u043d\u0438\u044f\u043c \u2013 \u043b\u0438\u0447\u043d\u044b\u0439 \u0432\u044b\u0431\u043e\u0440 \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0430. \u041e\u043d\u0438 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u044b \u0432\u044b\u0437\u0432\u0430\u0442\u044c \u043d\u0435\u043f\u0440\u0438\u044f\u0442\u043d\u043e\u0441\u0442\u0438, \u043d\u043e \u0438\u043d\u043e\u0433\u0434\u0430 \u0444\u043b\u0438\u0440\u0442 \u043f\u043e\u043c\u043e\u0433\u0430\u0435\u0442 \u0443\u0441\u0442\u0440\u043e\u0438\u0442\u044c \u043b\u0438\u0447\u043d\u0443\u044e \u0436\u0438\u0437\u043d\u044c.\n        </div>\n      ',authorList:[{link:"grg/gvsv/bsdfv/bdfv3",name:"\u0418\u0433\u043e\u0440\u044c",occupation:"\u0412\u043e\u0434\u0438\u0442\u0435\u043b\u044c",imageUrl:"assets/images/linkToArticlesX2.jpg"}],published:new Date,viewCount:147,likeCount:20,dislikeCount:11}).subscribe(()=>{console.log("\u0421\u043e\u0437\u0434\u0430\u043b\u0438 \u043f\u043e\u0441\u0442"),this.alertService.success("\u041f\u043e\u0441\u0442 \u0431\u044b\u043b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043e\u0437\u0434\u0430\u043d")})}createLocation(){this.locationsService.create({address:"\u0443\u043b. \u0418\u0441\u043b\u0430\u043c\u0430 \u041a\u0430\u0440\u0438\u043c\u043e\u0432\u0430, 17",categoryCode:"\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d",subcategory:"\u0411\u0430\u0440",subtitle:"\u0423\u0437\u0431\u0435\u043a\u0441\u043a\u0430\u044f",title:"\u0427\u0430\u0439\u0445\u0430\u043d\u0430",priceRange:2,rating:4.8}).subscribe(()=>{this.alertService.success("\u041b\u043e\u043a\u0430\u0446\u0438\u044f \u0431\u044b\u043b\u0430 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043e\u0437\u0434\u0430\u043d\u0430")})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.P),t.Y36(m),t.Y36(D._))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-create-page"]],decls:6,vars:0,consts:[["type","submit",1,"btn",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"p"),t._uU(1,"create-page works!"),t.qZA(),t.TgZ(2,"button",0),t.NdJ("click",function(){return o.create()}),t._uU(3,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u043e\u0441\u0442"),t.qZA(),t.TgZ(4,"button",0),t.NdJ("click",function(){return o.createLocation()}),t._uU(5,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043b\u043e\u043a\u0430\u0446\u0438\u044e"),t.qZA())}}),n})(),S=(()=>{class n{transform(e,o){return o.trim()?e.filter(r=>r.title.toLowerCase().includes(o.toLowerCase())):e}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275pipe=t.Yjl({name:"search",type:n,pure:!0}),n})();function J(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.ALo(9,"date"),t.qZA(),t.TgZ(10,"td")(11,"button",7),t.NdJ("click",function(){const s=t.CHM(e).$implicit,g=t.oxw(3);return t.KtG(g.goToEditPage(s.id))}),t._uU(12," \u041e\u0442\u043a\u0440\u044b\u0442\u044c "),t.qZA(),t.TgZ(13,"a",8),t.NdJ("click",function(){const s=t.CHM(e).$implicit,g=t.oxw(3);return t.KtG(g.remove(s.id))}),t._uU(14,"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"),t.qZA()()()}if(2&n){const e=i.$implicit,o=i.index;t.xp6(2),t.Oqu(o+1),t.xp6(2),t.Oqu(e.author),t.xp6(2),t.Oqu(e.title),t.xp6(2),t.Oqu(t.gM2(9,4,e.published,"medium","","ru"))}}function Y(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"div",4)(1,"div")(2,"input",5),t.NdJ("ngModelChange",function(r){t.CHM(e);const s=t.oxw(2);return t.KtG(s.searchStr=r)}),t.qZA()(),t.TgZ(3,"table")(4,"thead")(5,"tr")(6,"th"),t._uU(7,"#"),t.qZA(),t.TgZ(8,"th"),t._uU(9,"\u0410\u0432\u0442\u043e\u0440"),t.qZA(),t.TgZ(10,"th"),t._uU(11,"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"),t.qZA(),t.TgZ(12,"th"),t._uU(13,"\u0414\u0430\u0442\u0430"),t.qZA(),t.TgZ(14,"th"),t._uU(15,"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435"),t.qZA()()(),t.TgZ(16,"tbody"),t.YNc(17,J,15,9,"tr",6),t.ALo(18,"search"),t.qZA()()()}if(2&n){const e=t.oxw(2);t.xp6(2),t.Q6J("ngModel",e.searchStr),t.xp6(15),t.Q6J("ngForOf",t.xi3(18,2,e.posts,e.searchStr))}}function N(n,i){1&n&&(t.TgZ(0,"p"),t._uU(1,"\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u0443\u0441\u0442"),t.qZA())}function Q(n,i){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,Y,19,5,"div",2),t.YNc(2,N,2,0,"ng-template",null,3,t.W1O),t.qZA()),2&n){const e=t.MAs(3),o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.posts.length)("ngIfElse",e)}}function B(n,i){1&n&&(t.TgZ(0,"p"),t._uU(1,"\u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."),t.qZA())}let G=(()=>{class n{constructor(e,o,r){this.postsService=e,this.alertService=o,this.router=r,this.posts=[],this.loading=!0,this.searchStr=""}ngOnInit(){this.postsService.getAll().subscribe(e=>{this.posts=e,this.loading=!1})}remove(e){e&&(this.loading=!0,this.dSub=this.postsService.remove(e).subscribe(()=>{this.loading=!1,this.posts=this.posts.filter(o=>o.id!==e),this.alertService.danger("\u041f\u043e\u0441\u0442 \u0431\u044b\u043b \u0443\u0434\u0430\u043b\u0435\u043d")}))}goToEditPage(e){this.loading=!0,this.router.navigate(["/admin","post",e,"edit"]).then(o=>{o||(this.loading=!1,this.alertService.warning("\u0423\u043f\u0441, \u0447\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a("))})}ngOnDestroy(){this.pSub?.unsubscribe(),this.dSub?.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(p.P),t.Y36(m),t.Y36(l.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-dashboard-page"]],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["loadingTemplate",""],["style","margin-top: 30px;",4,"ngIf","ngIfElse"],["empty",""],[2,"margin-top","30px"],["type","text","placeholder","\u041d\u0430\u0439\u0442\u0438 \u043f\u043e\u0441\u0442...",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],[1,"btn",3,"click"],[3,"click"]],template:function(e,o){if(1&e&&(t.YNc(0,Q,4,2,"div",0),t.YNc(1,B,2,0,"ng-template",null,1,t.W1O)),2&e){const r=t.MAs(2);t.Q6J("ngIf",!o.loading)("ngIfElse",r)}},dependencies:[c.sg,c.O5,u.Fj,u.JJ,u.On,c.uU,S]}),n})();function j(n,i){if(1&n&&(t.TgZ(0,"div")(1,"p"),t._uU(2,"edit-page works!"),t.qZA(),t.TgZ(3,"div"),t._uU(4),t.qZA()()),2&n){const e=t.oxw();t.xp6(4),t.hij("\u041f\u043e\u0441\u0442 ",e.post.id," \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d")}}function z(n,i){1&n&&t._uU(0," \u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430...\n")}let H=(()=>{class n{constructor(e,o){this.route=e,this.postsServise=o}ngOnInit(){this.route.data.subscribe(e=>{this.post=e.data})}ngOnDestroy(){this.pSub&&this.pSub.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(l.gz),t.Y36(p.P))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-edit-page"]],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["loading",""]],template:function(e,o){if(1&e&&(t.YNc(0,j,5,1,"div",0),t.YNc(1,z,1,0,"ng-template",null,1,t.W1O)),2&e){const r=t.MAs(2);t.Q6J("ngIf",o.post)("ngIfElse",r)}},dependencies:[c.O5]}),n})();var K=a(4466);let d=(()=>{class n{constructor(e,o){this.auth=e,this.router=o}canActivate(e,o){return!!this.auth.isAuthenticated()||(this.auth.logout(),this.router.navigate(["/admin","login"],{queryParams:{loginFailed:!0}}),!1)}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(h.e),t.LFG(l.F0))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();var $=a(8896),X=a(7221);let R=(()=>{class n{constructor(e,o){this.postsService=e,this.router=o}resolve(e,o){return this.postsService.getById(e.params?.id).pipe((0,X.K)(()=>(console.log("catchError in PostResolver"),this.router.navigate(["/admin","dashboard"]),$.E)))}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(p.P),t.LFG(l.F0))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),W=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[d,m],imports:[c.ez,u.u5,u.UX,K.m,l.Bz.forChild([{path:"",component:T,children:[{path:"",redirectTo:"/admin/login",pathMatch:"full"},{path:"login",component:U},{path:"dashboard",component:G,canActivate:[d]},{path:"create",component:k,canActivate:[d]},{path:"post/:id/edit",component:H,canActivate:[d],resolve:{data:R}}]}]),l.Bz]}),n})()}}]);