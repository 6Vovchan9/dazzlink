import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SharedModule } from '../shared/shared.module';
import { authGuard } from './shared/services/auth.guard';
import { PostResolver } from '../shared/services/post.resolver';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
import { reducers } from './shared/store/login/reducers';
import { LoginEffect } from './shared/store/login/effects';
import { LoginPageWithNgrxComponent } from './login-page-with-ngrx/login-page-with-ngrx.component';
import { PersistanceService } from './shared/services/persistance.service';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    LoginPageWithNgrxComponent,
    CreatePageComponent,
    DashboardPageComponent,
    EditPageComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          // { path: 'login', component: LoginPageWithNgrxComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [authGuard] },
          { path: 'create', component: CreatePageComponent, canActivate: [authGuard] },
          { path: 'post/:id/edit', component: EditPageComponent, canActivate: [authGuard], resolve: { data: PostResolver } }
        ]
      }
    ]),
    StoreModule.forFeature('login', reducers),
    EffectsModule.forFeature([LoginEffect])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    // AuthGuard,
    AlertService,
    PersistanceService
  ]
})
export class AdminModule { }
