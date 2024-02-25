import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AgreementsPageComponent } from './agreements-page/agreements-page.component';
import { ArticlesPageComponent } from './articles-page/articles-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostPageComponent } from './post-page/post-page.component';
// import { LocationsPageComponent } from './locations-page/locations-page.component';
import { LocationsPageWithFrontFilterComponent } from './locations-page-with-front-filter/locations-page-with-front-filter.component';
import { PlacePageComponent } from './place-page/place-page.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { LegalInfoPageComponent } from './legal-info-page/legal-info-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomePageComponent },
      { path: 'agreements', component: AgreementsPageComponent },
      { path: 'articles', component: ArticlesPageComponent },
      // { path: 'locations', component: LocationsPageComponent }, // Фильтрация и сортировка на бэке
      { path: 'locations', component: LocationsPageWithFrontFilterComponent }, // Фильтрация и сортировка на фронте
      { path: 'team', component: TeamPageComponent },
      { path: 'help', component: HelpPageComponent },
      { path: 'legal-info', component: LegalInfoPageComponent },
      { path: 'post/:id', component: PostPageComponent },
      { path: 'place/:id', component: PlacePageComponent },
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
