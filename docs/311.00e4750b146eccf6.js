"use strict";(self.webpackChunkmyProject=self.webpackChunkmyProject||[]).push([[311],{2311:(Bt,L,d)=>{d.r(L),d.d(L,{AdminModule:()=>Gt});var h=d(6895),m=d(1718),g=d(4719),t=d(6353);function I(e,r,n,o){if("a"===n&&!o)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof r?e!==r||!o:!r.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?o:"a"===n?o.call(e):o?o.value:r.get(e)}"function"==typeof SuppressedError&&SuppressedError;var O,D,k=d(5529),st=d(1737),ct=d(2868),U=d(7221),pt=d(2340),gt=d(529);class y{constructor(r){this.http=r,O.add(this),this.error$=new k.xQ}get token(){const r=new Date(localStorage.getItem("fb-token-exp")||0);return new Date>r?(this.logout(),null):localStorage.getItem("fb-token")}login(r){return r.returnSecureToken=!0,this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${pt.N.apiKey}`,r).pipe((0,ct.b)(I(this,O,"m",D)),(0,U.K)(this.handleError.bind(this)))}logout(){I(this,O,"m",D).call(this,null)}handleError(r){const{message:n}=r.error.error;switch(n){case"INVALID_EMAIL":this.error$.next("\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email");break;case"INVALID_PASSWORD":this.error$.next("\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c");break;case"EMAIL_NOT_FOUND":this.error$.next("\u0422\u0430\u043a\u043e\u0433\u043e email \u043d\u0435\u0442")}return(0,st._)(r)}isAuthenticated(){return!!this.token}}O=new WeakSet,D=function(r){if(r){const n=new Date((new Date).getTime()+1e3*+r.expiresIn);localStorage.setItem("fb-token",r.idToken),localStorage.setItem("fb-token-exp",n.toString())}else localStorage.clear()},y.\u0275fac=function(r){return new(r||y)(t.LFG(gt.eN))},y.\u0275prov=t.Yz7({token:y,factory:y.\u0275fac,providedIn:"root"});let A=(()=>{class e{constructor(){this.alert$=new k.xQ}success(n){this.alert$.next({type:"success",text:n})}warning(n){this.alert$.next({type:"warning",text:n})}danger(n){this.alert$.next({type:"danger",text:n})}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e})();const dt=function(e,r,n){return{"alert__wrap--success":e,"alert__wrap--warning":r,"alert__wrap--danger":n}};function ft(e,r){if(1&e&&(t.TgZ(0,"div",1)(1,"div",2),t._uU(2),t.qZA()()),2&e){const n=t.oxw();t.xp6(1),t.Q6J("ngClass",t.kEZ(2,dt,"success"===(null==n.alertData?null:n.alertData.type),"warning"===(null==n.alertData?null:n.alertData.type),"danger"===(null==n.alertData?null:n.alertData.type))),t.xp6(1),t.hij(" ",null==n.alertData?null:n.alertData.text," ")}}let mt=(()=>{class e{constructor(n){this.alertService=n,this.delay=5e3}ngOnInit(){this.aSub=this.alertService.alert$.subscribe(n=>{this.alertData=n;const o=setTimeout(()=>{clearTimeout(o),this.alertData=null},this.delay)})}ngOnDestroy(){this.aSub?.unsubscribe()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(A))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-alert"]],inputs:{delay:"delay"},decls:1,vars:1,consts:[["class","alert",4,"ngIf"],[1,"alert"],[1,"alert__wrap",3,"ngClass"]],template:function(n,o){1&n&&t.YNc(0,ft,3,6,"div",0),2&n&&t.Q6J("ngIf",o.alertData)},dependencies:[h.mk,h.O5],styles:[".alert[_ngcontent-%COMP%]{position:fixed;top:20px;width:100%;padding:0 20px;box-sizing:border-box;display:flex;justify-content:flex-end}.alert[_ngcontent-%COMP%]   .alert__wrap[_ngcontent-%COMP%]{background:gray;color:#fff;padding:20px;border-radius:6px;max-width:300px}.alert[_ngcontent-%COMP%]   .alert__wrap--success[_ngcontent-%COMP%]{background-color:green}.alert[_ngcontent-%COMP%]   .alert__wrap--danger[_ngcontent-%COMP%]{background-color:orange}.alert[_ngcontent-%COMP%]   .alert__wrap--warning[_ngcontent-%COMP%]{background-color:red}"]}),e})();const _t=function(){return["/admin","dashboard"]},ht=function(){return["/admin","create"]};function vt(e,r){if(1&e){const n=t.EpF();t.TgZ(0,"nav",2)(1,"ul",3)(2,"li",4)(3,"a",5),t._uU(4,"UI"),t.qZA()(),t.TgZ(5,"li",6)(6,"a",7),t.NdJ("click",function(){t.CHM(n);const i=t.oxw();return t.KtG(i.goToAnotherPage(["/admin","dashboard"]))}),t._uU(7,"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"),t.qZA()(),t.TgZ(8,"li",6)(9,"a",7),t.NdJ("click",function(){t.CHM(n);const i=t.oxw();return t.KtG(i.goToAnotherPage(["/admin","create"]))}),t._uU(10,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"),t.qZA()(),t.TgZ(11,"li",4)(12,"a",8),t.NdJ("click",function(i){t.CHM(n);const a=t.oxw();return t.KtG(a.logout(i))}),t._uU(13,"\u0412\u044b\u0439\u0442\u0438"),t.qZA()()()()}2&e&&(t.xp6(6),t.Q6J("routerLink",t.DdM(2,_t)),t.xp6(3),t.Q6J("routerLink",t.DdM(3,ht)))}let yt=(()=>{class e{constructor(n,o){this.router=n,this.auth=o}ngOnInit(){}goToAnotherPage(n){this.router.navigate(n)}logout(n){n.preventDefault(),this.auth.logout(),this.router.navigate(["/admin","login"])}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(m.F0),t.Y36(y))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-admin-layout"]],decls:5,vars:2,consts:[["class","menu",4,"ngIf"],[3,"delay"],[1,"menu"],[1,"menu__list"],[1,"menu__item"],["routerLink","/"],["routerLinkActive","menu__item--active",1,"menu__item"],[3,"routerLink","click"],["href","#",3,"click"]],template:function(n,o){1&n&&(t.TgZ(0,"p"),t._uU(1,"admin-layout works!"),t.qZA(),t.YNc(2,vt,14,4,"nav",0),t._UZ(3,"app-alert",1)(4,"router-outlet")),2&n&&(t.xp6(2),t.Q6J("ngIf",o.auth.isAuthenticated()),t.xp6(1),t.Q6J("delay",3e3))},dependencies:[h.O5,m.lC,m.rH,m.Od,mt],styles:[".menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]{display:flex}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]{margin-left:10px}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:underline;cursor:pointer;color:#000}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item--active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:red}.menu[_ngcontent-%COMP%]   .menu__list[_ngcontent-%COMP%]   .menu__item[_ngcontent-%COMP%]:first-child{margin:0}"]}),e})();function bt(e,r){if(1&e&&(t.TgZ(0,"div",14),t._uU(1),t.qZA()),2&e){const n=r.ngIf;t.xp6(1),t.hij(" ",n," ")}}function Ct(e,r){if(1&e&&(t.TgZ(0,"div",15),t._uU(1),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.hij(" ",n.messageFromQueryParams," ")}}function wt(e,r){1&e&&(t.TgZ(0,"div",18),t._uU(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email"),t.qZA())}function Pt(e,r){1&e&&(t.TgZ(0,"div",18),t._uU(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 email"),t.qZA())}function xt(e,r){if(1&e&&(t.TgZ(0,"div",16),t.YNc(1,wt,2,0,"div",17),t.YNc(2,Pt,2,0,"div",17),t.qZA()),2&e){const n=t.oxw();let o,i;t.xp6(1),t.Q6J("ngIf",null==(o=n.loginForm.get("email"))||null==o.errors?null:o.errors.required),t.xp6(1),t.Q6J("ngIf",null==(i=n.loginForm.get("email"))||null==i.errors?null:i.errors.email)}}function Ot(e,r){1&e&&(t.TgZ(0,"div",18),t._uU(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"),t.qZA())}function At(e,r){if(1&e&&(t.TgZ(0,"div",18),t._uU(1),t.qZA()),2&e){const n=t.oxw(2);let o;t.xp6(1),t.hij(" \u041f\u0430\u0440\u043e\u043b\u044c \u0434\u043e\u043b\u0436\u0435\u043d \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u043d\u0435 \u043c\u0435\u043d\u0435\u0435 ",null==(o=n.loginForm.get("password"))||null==o.errors?null:o.errors.minlength.requiredLength," \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 ")}}function Tt(e,r){if(1&e&&(t.TgZ(0,"div",16),t.YNc(1,Ot,2,0,"div",17),t.YNc(2,At,2,1,"div",17),t.qZA()),2&e){const n=t.oxw();let o,i;t.xp6(1),t.Q6J("ngIf",null==(o=n.loginForm.get("password"))||null==o.errors?null:o.errors.required),t.xp6(1),t.Q6J("ngIf",null==(i=n.loginForm.get("password"))||null==i.errors?null:i.errors.minlength)}}const q=function(e){return{"inputControl--invalid":e}};let Ft=(()=>{class e{constructor(n,o,i){this.auth=n,this.router=o,this.route=i,this.submitted=!1}ngOnInit(){this.route.queryParams.subscribe(n=>{n.loginFailed?this.messageFromQueryParams="\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435":n.authFailed&&(this.messageFromQueryParams="\u0421\u0435\u0441\u0441\u0438\u044f \u0438\u0441\u0442\u0435\u043a\u043b\u0430. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0437\u0430\u043d\u043e\u0432\u043e")}),this.loginForm=new g.nJ({email:new g.p4(null,[g.kI.email,g.kI.required]),password:new g.p4(null,[g.kI.required,g.kI.minLength(6)])})}submit(){this.loginForm?.valid&&(this.submitted=!0,this.auth.login({email:this.loginForm.value.email,password:this.loginForm.value.password}).subscribe(()=>{this.submitted=!1,this.loginForm.reset(),this.router.navigate(["/admin","dashboard"])},()=>this.submitted=!1))}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(y),t.Y36(m.F0),t.Y36(m.gz))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-login-page"]],decls:22,vars:14,consts:[[1,"loginForm",3,"formGroup","ngSubmit"],[1,"loginForm__header"],["class","loginForm__message loginForm__message--error",4,"ngIf"],["class","loginForm__message",4,"ngIf"],[1,"loginForm__form"],[1,"loginForm__control"],[1,"inputControl",3,"ngClass"],["for","adminEmail",1,"inputControl__label"],["id","adminEmail","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email","formControlName","email","type","text",1,"inputControl__input"],["class","controlError",4,"ngIf"],["for","adminPassword",1,"inputControl__label"],["id","adminPassword","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c","formControlName","password","type","password",1,"inputControl__input"],[1,"loginForm__btns"],["type","submit",1,"btn",3,"disabled"],[1,"loginForm__message","loginForm__message--error"],[1,"loginForm__message"],[1,"controlError"],["class","controlError__item",4,"ngIf"],[1,"controlError__item"]],template:function(n,o){if(1&n&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return o.submit()}),t.TgZ(1,"div",1),t._uU(2," \u0412\u043e\u0439\u0442\u0438 \u0432 \u043f\u0430\u043d\u0435\u043b\u044c \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430 "),t.qZA(),t.YNc(3,bt,2,1,"div",2),t.ALo(4,"async"),t.YNc(5,Ct,2,1,"div",3),t.TgZ(6,"div",4)(7,"div",5)(8,"div",6)(9,"label",7),t._uU(10,"Email:"),t.qZA(),t._UZ(11,"input",8),t.YNc(12,xt,3,2,"div",9),t.qZA()(),t.TgZ(13,"div",5)(14,"div",6)(15,"label",10),t._uU(16,"Password:"),t.qZA(),t._UZ(17,"input",11),t.YNc(18,Tt,3,2,"div",9),t.qZA()(),t.TgZ(19,"div",12)(20,"button",13),t._uU(21,"\u0412\u043e\u0439\u0442\u0438"),t.qZA()()()()),2&n){let i,a,u,s;t.Q6J("formGroup",o.loginForm),t.xp6(3),t.Q6J("ngIf",t.lcZ(4,8,o.auth.error$)),t.xp6(2),t.Q6J("ngIf",o.messageFromQueryParams),t.xp6(3),t.Q6J("ngClass",t.VKq(10,q,(null==(i=o.loginForm.get("email"))?null:i.touched)&&(null==(i=o.loginForm.get("email"))?null:i.invalid))),t.xp6(4),t.Q6J("ngIf",(null==(a=o.loginForm.get("email"))?null:a.touched)&&(null==(a=o.loginForm.get("email"))?null:a.invalid)),t.xp6(2),t.Q6J("ngClass",t.VKq(12,q,(null==(u=o.loginForm.get("password"))?null:u.touched)&&(null==(u=o.loginForm.get("password"))?null:u.invalid))),t.xp6(4),t.Q6J("ngIf",(null==(s=o.loginForm.get("password"))?null:s.touched)&&(null==(s=o.loginForm.get("password"))?null:s.invalid)),t.xp6(2),t.Q6J("disabled",(null==o.loginForm?null:o.loginForm.invalid)||o.submitted)}},dependencies:[h.mk,h.O5,g._Y,g.Fj,g.JJ,g.JL,g.sg,g.u,h.Ov],styles:[".loginForm[_ngcontent-%COMP%]{margin-top:30px;border:1px solid black;border-radius:6px;max-width:600px;padding:30px}.loginForm[_ngcontent-%COMP%]   .loginForm__header[_ngcontent-%COMP%]{margin-bottom:20px;font-size:24px}.loginForm[_ngcontent-%COMP%]   .loginForm__message[_ngcontent-%COMP%]{margin-bottom:20px;padding:10px;background-color:gray;color:#fff;font-size:16px}.loginForm[_ngcontent-%COMP%]   .loginForm__message--error[_ngcontent-%COMP%]{background-color:brown}.loginForm[_ngcontent-%COMP%]   .loginForm__form[_ngcontent-%COMP%]   .loginForm__control[_ngcontent-%COMP%]{margin-bottom:20px}.loginForm[_ngcontent-%COMP%]   .loginForm__form[_ngcontent-%COMP%]   .loginForm__control[_ngcontent-%COMP%]:last-child{margin:0}.inputControl[_ngcontent-%COMP%]{display:flex;flex-direction:column}.inputControl[_ngcontent-%COMP%]   .inputControl__label[_ngcontent-%COMP%]{margin-bottom:10px}.inputControl--invalid[_ngcontent-%COMP%], .inputControl--invalid[_ngcontent-%COMP%]   .inputControl__input[_ngcontent-%COMP%], .controlError[_ngcontent-%COMP%]{color:red}"]}),e})();var T=d(4051),St=d(4403);let Zt=(()=>{class e{constructor(n,o,i){this.postsService=n,this.alertService=o,this.locationsService=i}ngOnInit(){}create(){this.postsService.create({title:"5 \u043f\u0440\u0438\u0447\u0438\u043d \u043f\u043e\u0447\u0435\u043c\u0443 \u0444\u043b\u0438\u0440\u0442\u043e\u0432\u0430\u0442\u044c \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u043d\u0435\u043d\u0430\u0434\u0435\u0436\u043d\u043e",html:'\n        <p class="articleParagraph">\u0424\u043b\u0438\u0440\u0442 \u2013 \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0435\u043d\u043d\u0430\u044f \u0444\u043e\u0440\u043c\u0430 \u043e\u0431\u0449\u0435\u043d\u0438\u044f \u043c\u0435\u0436\u0434\u0443 \u043c\u0443\u0436\u0447\u0438\u043d\u043e\u0439 \u0438 \u0436\u0435\u043d\u0449\u0438\u043d\u043e\u0439. \u041f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u0438 \u043f\u0440\u043e\u0442\u0438\u0432\u043e\u043f\u043e\u043b\u043e\u0436\u043d\u043e\u0433\u043e \u043f\u043e\u043b\u0430 \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u044e\u0442 \u0434\u0440\u0443\u0433 \u0441 \u0434\u0440\u0443\u0433\u043e\u043c, \u043a\u0430\u043a \u043d\u0430 \u0434\u043e\u0441\u0443\u0433\u0435, \u0442\u0430\u043a \u0438 \u0432 \u0434\u0435\u043b\u043e\u0432\u043e\u0439 \u043e\u0431\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0435.</p>\n        <p class="articleParagraph">\u041d\u0435\u043f\u0440\u0438\u043d\u0443\u0436\u0434\u0435\u043d\u043d\u044b\u0435 \u0443\u0445\u0430\u0436\u0438\u0432\u0430\u043d\u0438\u044f \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u043d\u0430\u043f\u043e\u043c\u0438\u043d\u0430\u044e\u0442 \u0438\u0433\u0440\u0443, \u043a\u0430\u0436\u0443\u0442\u0441\u044f \u0431\u0435\u0437\u043e\u0431\u0438\u0434\u043d\u044b\u043c \u0440\u0430\u0437\u0432\u043b\u0435\u0447\u0435\u043d\u0438\u0435\u043c. \u0422\u0430\u043a \u043b\u0438 \u044d\u0442\u043e \u043d\u0430 \u0441\u0430\u043c\u043e\u043c \u0434\u0435\u043b\u0435? \u041f\u0441\u0438\u0445\u043e\u043b\u043e\u0433\u0438 \u043d\u0430\u0445\u043e\u0434\u044f\u0442 \u043f\u043b\u044e\u0441\u044b \u0432 \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u043d\u0438\u044f\u0445 \u043c\u0435\u0436\u0434\u0443 \u043a\u043e\u043b\u043b\u0435\u0433\u0430\u043c\u0438, \u043d\u043e \u0432\u0441\u0435 \u0436\u0435 \u0441\u0447\u0438\u0442\u0430\u044e\u0442 \u0442\u0430\u043a\u043e\u0439 \u0444\u043b\u0438\u0440\u0442 \u043e\u043f\u0430\u0441\u043d\u044b\u043c.</p>\n        <span class="articleHeader">\u041f\u043e\u043b\u043e\u0436\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0441\u0442\u043e\u0440\u043e\u043d\u044b \u043d\u0435\u043f\u0440\u0438\u043d\u0443\u0436\u0434\u0435\u043d\u043d\u044b\u0445 \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u0439.</span>\n        <p class="articleParagraph">\n          \u0427\u0435\u043b\u043e\u0432\u0435\u043a \u043f\u0440\u043e\u0432\u043e\u0434\u0438\u0442 \u043d\u0430 \u0440\u0430\u0431\u043e\u0447\u0435\u043c \u043c\u0435\u0441\u0442\u0435 \u043c\u0438\u043d\u0438\u043c\u0443\u043c 8 \u0447\u0430\u0441\u043e\u0432 \u0432 \u0441\u0443\u0442\u043a\u0438 5 \u0434\u043d\u0435\u0439 \u0432 \u043d\u0435\u0434\u0435\u043b\u044e. \u0415\u0441\u043b\u0438 \u043d\u0430 \u043f\u0440\u043e\u0442\u044f\u0436\u0435\u043d\u0438\u0438 \u044d\u0442\u043e\u0433\u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u0442\u044c \u0441\u0435\u0440\u044c\u0435\u0437\u043d\u044b\u0439 \u043d\u0430\u0441\u0442\u0440\u043e\u0439 \u0438 \u0434\u0443\u043c\u0430\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u043e \u0434\u0435\u043b\u043e\u0432\u044b\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u0445, \u043c\u043e\u0436\u0435\u0442 \u043f\u0440\u043e\u0438\u0437\u043e\u0439\u0442\u0438 \u0432\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0435\u0435 \u0432\u044b\u0433\u043e\u0440\u0430\u043d\u0438\u0435.\n        </p>\n        <div class="articleParagraph">\n          \u0424\u043b\u0438\u0440\u0442 \u043f\u043e\u043c\u043e\u0433\u0430\u0435\u0442:\n          <ul class="articleList">\n            <li class="articleListItem">\u041f\u0440\u0435\u0434\u043e\u0442\u0432\u0440\u0430\u0442\u0438\u0442\u044c \u0441\u0442\u0440\u0435\u0441\u0441. \u041a\u043e\u043c\u043f\u043b\u0438\u043c\u0435\u043d\u0442, \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u043d\u044b\u0439 \u043e\u0442 \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u044f \u043f\u0440\u043e\u0442\u0438\u0432\u043e\u043f\u043e\u043b\u043e\u0436\u043d\u043e\u0433\u043e \u043f\u043e\u043b\u0430, \u0443\u043b\u0443\u0447\u0448\u0430\u0435\u0442 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d\u0438\u0435, \u0437\u0430\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0440\u0430\u0441\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043f\u043b\u0435\u0447\u0438.</li>\n            <li class="articleListItem">\u041f\u043e\u0432\u044b\u0441\u0438\u0442\u044c \u0441\u0430\u043c\u043e\u043e\u0446\u0435\u043d\u043a\u0443. \u041e\u0442\u0432\u0435\u0442\u043d\u0430\u044f \u0440\u0435\u0430\u043a\u0446\u0438\u044f \u043d\u0430 \u043f\u043e\u0434\u043c\u0438\u0433\u0438\u0432\u0430\u043d\u0438\u0435 \u0438\u043b\u0438 \u0443\u043b\u044b\u0431\u043a\u0443 \u043f\u0440\u0438\u044f\u0442\u043d\u0430, \u0442\u0430\u043a \u043a\u0430\u043a \u0443\u0431\u0435\u0436\u0434\u0430\u0435\u0442 \u0432 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0439 \u043f\u0440\u0438\u0432\u043b\u0435\u043a\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438.</li>\n            <li class="articleListItem">\u0423\u043b\u0443\u0447\u0448\u0438\u0442\u044c \u0440\u0430\u0431\u043e\u0442\u043e\u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0441\u0442\u044c. \u041d\u0430\u043b\u0438\u0447\u0438\u0435 \u043f\u043e\u043a\u043b\u043e\u043d\u043d\u0438\u043a\u0430 \u0438\u043b\u0438 \u043e\u0431\u044a\u0435\u043a\u0442\u0430 \u0441\u0438\u043c\u043f\u0430\u0442\u0438\u0438 \u043c\u043e\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442 \u043f\u0440\u0438\u0445\u043e\u0434\u0438\u0442\u044c \u043d\u0430 \u043c\u0435\u0441\u0442\u043e \u0441\u043b\u0443\u0436\u0431\u044b \u0432\u043e\u0432\u0440\u0435\u043c\u044f, \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u043e \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0438, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0441\u0435\u0431\u044f \u0441 \u043b\u0443\u0447\u0448\u0435\u0439 \u0441\u0442\u043e\u0440\u043e\u043d\u044b.</li>\n          </ul>\n        </div>\n        <span class="articleHeader">\u041f\u043e\u0447\u0435\u043c\u0443 \u0444\u043b\u0438\u0440\u0442\u043e\u0432\u0430\u0442\u044c \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u043d\u0435\u043d\u0430\u0434\u0435\u0436\u043d\u043e?</span>\n        <div class="articleParagraph">\n          \u041e\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u043c\u043e\u043c\u0435\u043d\u0442\u043e\u0432 \u0444\u043b\u0438\u0440\u0442\u0430 \u043d\u0430 \u0440\u0430\u0431\u043e\u0442\u0435 \u0431\u043e\u043b\u044c\u0448\u0435, \u0447\u0435\u043c \u043f\u043e\u043b\u043e\u0436\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0445:\n          <ul class="articleList">\n            <li class="articleListItem">\u0423\u043b\u044b\u0431\u043a\u0438 \u0438 \u043d\u0435\u0432\u0438\u043d\u043d\u044b\u0435 \u043d\u0430\u043c\u0435\u043a\u0438 \u043c\u043e\u0433\u0443\u0442 \u0432\u044b\u0437\u0432\u0430\u0442\u044c \u0432\u043b\u044e\u0431\u043b\u0435\u043d\u043d\u043e\u0441\u0442\u044c. \u0415\u0441\u043b\u0438 \u043e\u0434\u0438\u043d \u0438\u0437 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432 \u0438\u0433\u0440\u044b \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d \u043d\u0430 \u0441\u0435\u0440\u044c\u0435\u0437\u043d\u044b\u0435 \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u044f, \u0430 \u0434\u0440\u0443\u0433\u043e\u0439 \u2013 \u043d\u0435\u0442, \u043d\u0435\u043c\u0438\u043d\u0443\u0435\u043c \u0441\u043a\u043e\u0440\u044b\u0439 \u0440\u0430\u0437\u0440\u044b\u0432. \u0412 \u043d\u0435\u0441\u043e\u0441\u0442\u043e\u044f\u0432\u0448\u0435\u0439\u0441\u044f \u043f\u0430\u0440\u0435 \u0432\u043e\u0437\u043d\u0438\u043a\u0430\u0435\u0442 \u043d\u0430\u043f\u0440\u044f\u0436\u0435\u043d\u0438\u0435, \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u043e\u0435 \u043f\u0435\u0440\u0435\u0440\u0430\u0441\u0442\u0438 \u0432 \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0439 \u043a\u043e\u043d\u0444\u043b\u0438\u043a\u0442.</li>\n            <li class="articleListItem">\u0417\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u043d\u0438\u044f \u0434\u0430\u044e\u0442 \u043f\u043e\u0432\u043e\u0434 \u0434\u043b\u044f \u0441\u043f\u043b\u0435\u0442\u0435\u043d. \u041f\u0435\u0440\u0435\u0441\u0443\u0434\u044b \u0437\u0430 \u0441\u043f\u0438\u043d\u043e\u0439 \u2013 \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0435\u043d\u043d\u043e\u0435 \u0440\u0430\u0437\u0432\u043b\u0435\u0447\u0435\u043d\u0438\u0435 \u043e\u0444\u0438\u0441\u043d\u044b\u0445 \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u043e\u0432. \u0420\u0430\u0437\u0433\u043e\u0432\u043e\u0440\u044b \u043e \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u043c \u0441\u043b\u0443\u0436\u0435\u0431\u043d\u043e\u043c \u0440\u043e\u043c\u0430\u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0432\u044b\u0439\u0442\u0438 \u0437\u0430 \u043f\u0440\u0435\u0434\u0435\u043b\u044b \u0444\u0438\u0440\u043c\u044b \u0438 \u043f\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043a \u0441\u0435\u043c\u0435\u0439\u043d\u044b\u043c \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430\u043c, \u0435\u0441\u043b\u0438 \u043e\u0434\u0438\u043d \u0438\u0437 \u043e\u0431\u044a\u0435\u043a\u0442\u043e\u0432 \u043d\u0435\u0441\u0432\u043e\u0431\u043e\u0434\u0435\u043d.</li>\n            <li class="articleListItem">\u0423\u0432\u043b\u0435\u0447\u0435\u043d\u043d\u044b\u0439 \u0447\u0435\u043b\u043e\u0432\u0435\u043a \u0441\u043f\u043e\u0441\u043e\u0431\u0435\u043d \u0432\u044b\u0434\u0430\u0442\u044c \u0442\u0430\u0439\u043d\u044b \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438. \u0418\u043d\u043e\u0433\u0434\u0430 \u0444\u043b\u0438\u0440\u0442\u043e\u0432\u0430\u0442\u044c \u043d\u0430\u0447\u0438\u043d\u0430\u044e\u0442 \u0434\u043b\u044f \u0442\u043e\u0433\u043e, \u0447\u0442\u043e\u0431\u044b \u0440\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0438\u0442\u044c \u0438 \xab\u0440\u0430\u0437\u0433\u043e\u0432\u043e\u0440\u0438\u0442\u044c\xbb \u0441\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0430 \u0444\u0438\u0440\u043c\u044b. \u0412 \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u0441\u043b\u0443\u0447\u0430\u044f\u0445 \u0440\u0430\u0437\u043e\u0447\u0430\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0431\u0435\u0437\u043e\u0442\u0432\u0435\u0442\u043d\u044b\u043c\u0438 \u0447\u0443\u0432\u0441\u0442\u0432\u0430\u043c\u0438 \u043e\u0431\u044a\u0435\u043a\u0442 \u0438\u0434\u0435\u0442 \u043d\u0430 \u0441\u043b\u0443\u0436\u0435\u0431\u043d\u043e\u0435 \u043f\u0440\u0435\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u0435 \u0438\u0437 \u043c\u0435\u0441\u0442\u0438.</li>\n            <li class="articleListItem">\u0424\u043b\u0438\u0440\u0442 \u043c\u043e\u0436\u0435\u0442 \u0432\u044b\u0437\u0432\u0430\u0442\u044c \u0440\u0435\u0432\u043d\u043e\u0441\u0442\u044c. \u0415\u0441\u043b\u0438 \u0441\u0438\u043c\u043f\u0430\u0442\u0438\u0447\u043d\u044b\u0439 \u043a\u043e\u043b\u043b\u0435\u0433\u0430 \u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u043e\u0441\u0442\u044c\u044e, \u0442\u043e\u0442, \u0441 \u043a\u0435\u043c \u043e\u043d \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u0435\u0442, \u043f\u043e\u043f\u0430\u0434\u0430\u0435\u0442 \u0432 \u043e\u043f\u0430\u043b\u0443.</li>\n            <li class="articleListItem">\u041a\u043e\u043c\u043f\u043b\u0438\u043c\u0435\u043d\u0442\u044b \u0438 \u0443\u043b\u044b\u0431\u043a\u0438 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u044b \u043f\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043a \u043f\u043e\u0442\u0435\u0440\u0435 \u0434\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u0438. \u041e\u043f\u0430\u0441\u043d\u0435\u0435 \u0432\u0441\u0435\u0433\u043e \u0444\u043b\u0438\u0440\u0442 \u0441 \u043d\u0430\u0447\u0430\u043b\u044c\u043d\u0438\u043a\u043e\u043c. \u0415\u0441\u043b\u0438 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c \u0443\u0432\u043b\u0435\u0447\u0435\u0442\u0441\u044f, \u043f\u0440\u0438\u0434\u0435\u0442\u0441\u044f \u043f\u0435\u0440\u0435\u0445\u043e\u0434\u0438\u0442\u044c \u043e\u0442 \u0441\u043b\u043e\u0432 \u043a \u0434\u0435\u043b\u0443 \u0438\u043b\u0438 \u0438\u0441\u043a\u0430\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u0440\u0430\u0431\u043e\u0442\u0443.</li>\n          </ul>\n        </div>\n        <div class="articleParagraph">\n          \u0421\u0442\u043e\u0438\u0442 \u043b\u0438 \u043f\u0440\u0438\u0431\u0435\u0433\u0430\u0442\u044c \u043a \u0437\u0430\u0438\u0433\u0440\u044b\u0432\u0430\u043d\u0438\u044f\u043c \u2013 \u043b\u0438\u0447\u043d\u044b\u0439 \u0432\u044b\u0431\u043e\u0440 \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0430. \u041e\u043d\u0438 \u0441\u043f\u043e\u0441\u043e\u0431\u043d\u044b \u0432\u044b\u0437\u0432\u0430\u0442\u044c \u043d\u0435\u043f\u0440\u0438\u044f\u0442\u043d\u043e\u0441\u0442\u0438, \u043d\u043e \u0438\u043d\u043e\u0433\u0434\u0430 \u0444\u043b\u0438\u0440\u0442 \u043f\u043e\u043c\u043e\u0433\u0430\u0435\u0442 \u0443\u0441\u0442\u0440\u043e\u0438\u0442\u044c \u043b\u0438\u0447\u043d\u0443\u044e \u0436\u0438\u0437\u043d\u044c.\n        </div>\n      ',authorList:[{link:"grg/gvsv/bsdfv/bdfv3",name:"\u0418\u0433\u043e\u0440\u044c",occupation:"\u0412\u043e\u0434\u0438\u0442\u0435\u043b\u044c",imageUrl:"assets/images/home-page/linkToArticlesX2.jpg"}],published:new Date,viewCount:147,likeCount:20,dislikeCount:11}).subscribe(()=>{console.log("\u0421\u043e\u0437\u0434\u0430\u043b\u0438 \u043f\u043e\u0441\u0442"),this.alertService.success("\u041f\u043e\u0441\u0442 \u0431\u044b\u043b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043e\u0437\u0434\u0430\u043d")})}createLocation(){this.locationsService.create({address:"\u0443\u043b. \u0418\u0441\u043b\u0430\u043c\u0430 \u041a\u0430\u0440\u0438\u043c\u043e\u0432\u0430, 17",categoryCode:"\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d",subcategory:"\u0411\u0430\u0440",subtitle:"\u0423\u0437\u0431\u0435\u043a\u0441\u043a\u0430\u044f",title:"\u0427\u0430\u0439\u0445\u0430\u043d\u0430",priceRange:2,rating:4.8}).subscribe(()=>{this.alertService.success("\u041b\u043e\u043a\u0430\u0446\u0438\u044f \u0431\u044b\u043b\u0430 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043e\u0437\u0434\u0430\u043d\u0430")})}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(T.P),t.Y36(A),t.Y36(St._))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-create-page"]],decls:6,vars:0,consts:[["type","submit",1,"btn",3,"click"]],template:function(n,o){1&n&&(t.TgZ(0,"p"),t._uU(1,"create-page works!"),t.qZA(),t.TgZ(2,"button",0),t.NdJ("click",function(){return o.create()}),t._uU(3,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u043e\u0441\u0442"),t.qZA(),t.TgZ(4,"button",0),t.NdJ("click",function(){return o.createLocation()}),t._uU(5,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043b\u043e\u043a\u0430\u0446\u0438\u044e"),t.qZA())}}),e})(),Et=(()=>{class e{transform(n,o){return o.trim()?n.filter(i=>i.title.toLowerCase().includes(o.toLowerCase())):n}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275pipe=t.Yjl({name:"search",type:e,pure:!0}),e})();function Mt(e,r){if(1&e){const n=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA(),t.TgZ(7,"td"),t._uU(8),t.ALo(9,"date"),t.qZA(),t.TgZ(10,"td")(11,"button",7),t.NdJ("click",function(){const a=t.CHM(n).$implicit,u=t.oxw(3);return t.KtG(u.goToEditPage(a.id))}),t._uU(12," \u041e\u0442\u043a\u0440\u044b\u0442\u044c "),t.qZA(),t.TgZ(13,"a",8),t.NdJ("click",function(){const a=t.CHM(n).$implicit,u=t.oxw(3);return t.KtG(u.remove(a.id))}),t._uU(14,"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"),t.qZA()()()}if(2&e){const n=r.$implicit,o=r.index;t.xp6(2),t.Oqu(o+1),t.xp6(2),t.Oqu(n.author),t.xp6(2),t.Oqu(n.title),t.xp6(2),t.Oqu(t.gM2(9,4,n.published,"medium","","ru"))}}function It(e,r){if(1&e){const n=t.EpF();t.TgZ(0,"div",4)(1,"div")(2,"input",5),t.NdJ("ngModelChange",function(i){t.CHM(n);const a=t.oxw(2);return t.KtG(a.searchStr=i)}),t.qZA()(),t.TgZ(3,"table")(4,"thead")(5,"tr")(6,"th"),t._uU(7,"#"),t.qZA(),t.TgZ(8,"th"),t._uU(9,"\u0410\u0432\u0442\u043e\u0440"),t.qZA(),t.TgZ(10,"th"),t._uU(11,"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"),t.qZA(),t.TgZ(12,"th"),t._uU(13,"\u0414\u0430\u0442\u0430"),t.qZA(),t.TgZ(14,"th"),t._uU(15,"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435"),t.qZA()()(),t.TgZ(16,"tbody"),t.YNc(17,Mt,15,9,"tr",6),t.ALo(18,"search"),t.qZA()()()}if(2&e){const n=t.oxw(2);t.xp6(2),t.Q6J("ngModel",n.searchStr),t.xp6(15),t.Q6J("ngForOf",t.xi3(18,2,n.posts,n.searchStr))}}function Dt(e,r){1&e&&(t.TgZ(0,"p"),t._uU(1,"\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u0443\u0441\u0442"),t.qZA())}function Lt(e,r){if(1&e&&(t.TgZ(0,"div"),t.YNc(1,It,19,5,"div",2),t.YNc(2,Dt,2,0,"ng-template",null,3,t.W1O),t.qZA()),2&e){const n=t.MAs(3),o=t.oxw();t.xp6(1),t.Q6J("ngIf",o.posts.length)("ngIfElse",n)}}function jt(e,r){1&e&&(t.TgZ(0,"p"),t._uU(1,"\u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."),t.qZA())}let kt=(()=>{class e{constructor(n,o,i){this.postsService=n,this.alertService=o,this.router=i,this.posts=[],this.loading=!0,this.searchStr=""}ngOnInit(){this.postsService.getAll().subscribe(n=>{this.posts=n,this.loading=!1})}remove(n){n&&(this.loading=!0,this.dSub=this.postsService.remove(n).subscribe(()=>{this.loading=!1,this.posts=this.posts.filter(o=>o.id!==n),this.alertService.danger("\u041f\u043e\u0441\u0442 \u0431\u044b\u043b \u0443\u0434\u0430\u043b\u0435\u043d")}))}goToEditPage(n){this.loading=!0,this.router.navigate(["/admin","post",n,"edit"]).then(o=>{o||(this.loading=!1,this.alertService.warning("\u0423\u043f\u0441, \u0447\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a("))})}ngOnDestroy(){this.pSub?.unsubscribe(),this.dSub?.unsubscribe()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(T.P),t.Y36(A),t.Y36(m.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-dashboard-page"]],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["loadingTemplate",""],["style","margin-top: 30px;",4,"ngIf","ngIfElse"],["empty",""],[2,"margin-top","30px"],["type","text","placeholder","\u041d\u0430\u0439\u0442\u0438 \u043f\u043e\u0441\u0442...",3,"ngModel","ngModelChange"],[4,"ngFor","ngForOf"],[1,"btn",3,"click"],[3,"click"]],template:function(n,o){if(1&n&&(t.YNc(0,Lt,4,2,"div",0),t.YNc(1,jt,2,0,"ng-template",null,1,t.W1O)),2&n){const i=t.MAs(2);t.Q6J("ngIf",!o.loading)("ngIfElse",i)}},dependencies:[h.sg,h.O5,g.Fj,g.JJ,g.On,h.uU,Et]}),e})();function Ut(e,r){if(1&e&&(t.TgZ(0,"div")(1,"p"),t._uU(2,"edit-page works!"),t.qZA(),t.TgZ(3,"div"),t._uU(4),t.qZA()()),2&e){const n=t.oxw();t.xp6(4),t.hij("\u041f\u043e\u0441\u0442 ",n.post.id," \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d")}}function qt(e,r){1&e&&t._uU(0," \u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430...\n")}let Jt=(()=>{class e{constructor(n,o){this.route=n,this.postsServise=o}ngOnInit(){this.route.data.subscribe(n=>{this.post=n.data})}ngOnDestroy(){this.pSub&&this.pSub.unsubscribe()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(m.gz),t.Y36(T.P))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-edit-page"]],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["loading",""]],template:function(n,o){if(1&n&&(t.YNc(0,Ut,5,1,"div",0),t.YNc(1,qt,1,0,"ng-template",null,1,t.W1O)),2&n){const i=t.MAs(2);t.Q6J("ngIf",o.post)("ngIfElse",i)}},dependencies:[h.O5]}),e})();var Yt=d(4466);let F=(()=>{class e{constructor(n,o){this.auth=n,this.router=o}canActivate(n,o){return!!this.auth.isAuthenticated()||(this.auth.logout(),this.router.navigate(["/admin","login"],{queryParams:{loginFailed:!0}}),!1)}}return e.\u0275fac=function(n){return new(n||e)(t.LFG(y),t.LFG(m.F0))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e})();var Nt=d(8896);let Qt=(()=>{class e{constructor(n,o){this.postsService=n,this.router=o}resolve(n,o){return this.postsService.getById(n.params?.id).pipe((0,U.K)(()=>(console.log("catchError in PostResolver"),this.router.navigate(["/admin","dashboard"]),Nt.E)))}}return e.\u0275fac=function(n){return new(n||e)(t.LFG(T.P),t.LFG(m.F0))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})(),Gt=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[F,A],imports:[h.ez,g.u5,g.UX,Yt.m,m.Bz.forChild([{path:"",component:yt,children:[{path:"",redirectTo:"/admin/login",pathMatch:"full"},{path:"login",component:Ft},{path:"dashboard",component:kt,canActivate:[F]},{path:"create",component:Zt,canActivate:[F]},{path:"post/:id/edit",component:Jt,canActivate:[F],resolve:{data:Qt}}]}]),m.Bz]}),e})()}}]);