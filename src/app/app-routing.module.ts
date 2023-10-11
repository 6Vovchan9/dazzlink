import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AgreementsPageComponent } from './agreements-page/agreements-page.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostPageComponent } from './post-page/post-page.component';
import { LocationsPageComponent } from './locations-page/locations-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomePageComponent },
      { path: 'agreements', component: AgreementsPageComponent },
      { path: 'articles', component: ArticlesPageComponent },
      { path: 'locations', component: LocationsPageComponent },
      { path: 'post/:id', component: PostPageComponent },
      // { path: '**', redirectTo: '/' }
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
