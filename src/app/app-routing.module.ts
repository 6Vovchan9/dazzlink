import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// import { AgreementsPageComponent } from './agreements-page/agreements-page.component';
// import { PlacePageComponent } from './place-page/place-page.component';
// import { TeamPageComponent } from './team-page/team-page.component';
// import { LegalInfoPageComponent } from './legal-info-page/legal-info-page.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./home-page/home-page.component").then(m => m.HomePageComponent)
  },
  {
    path: 'media',
    loadComponent: () => import("./articles-page/articles-page.component").then(m => m.ArticlesPageComponent)
  },
  {
    path: 'media/:title',
    loadComponent: () => import("./post-page/post-page.component").then(m => m.PostPageComponent)
  },
  {
    path: 'help',
    loadComponent: () => import("./help-page/help-page.component").then(m => m.HelpPageComponent)
  },
  {
    path: 'locations',
    loadComponent: () => import("./locations-page-with-front-filter/locations-page-with-front-filter.component").then(m => m.LocationsPageWithFrontFilterComponent)
  },
  {
    path: 'locations/:title',
    loadComponent: () => import("./place-page/place-page.component").then(m => m.PlacePageComponent)
  },
  {
    path: 'company',
    loadComponent: () => import("./team-page/team-page.component").then(m => m.TeamPageComponent)
  },
  {
    path: 'legal-info',
    loadComponent: () => import("./legal-info-page/legal-info-page.component").then(m => m.LegalInfoPageComponent)
  },

  {
    path: 'app',
    loadComponent: () => import("./redirect/redirect.component").then(m => m.RedirectComponent)
  },
  // {
  //   path: 'app/locations',
  //   pathMatch: 'full',
  //   redirectTo: '/locations',
  // },
  // {
  //   path: 'app/locations/:pageName',
  //   redirectTo: '/locations/:pageName',
  // },
  // {
  //   path: 'app/media',
  //   pathMatch: 'full',
  //   redirectTo: '/media',
  // },
  // {
  //   path: 'app/media/:pageName',
  //   redirectTo: '/media/:pageName',
  // },
  {
    path: 'app/:pathname1',
    pathMatch: 'full',
    redirectTo: '/:pathname1', // в будущем надо будет перейти на 18 версию angular и там в качестве значения свойства redirectTo может быть функция
  },
  {
    path: 'app/:pathname1/:pathname2',
    redirectTo: '/:pathname1/:pathname2',
  },

  // {
  //   path: '', component: MainLayoutComponent, title: 'Dazzlink', children: [
  //     // { path: '', redirectTo: '/', pathMatch: 'full' },
  //     {
  //       path: '',
  //       loadComponent: () =>
  //         import("./home-page/home-page.component").then(
  //           m => m.HomePageComponent
  //         )
  //     },
  //     { path: 'agreements', component: AgreementsPageComponent },
  //     { path: 'media', component: ArticlesPageComponent },
  //     // { path: 'locations', component: LocationsPageComponent }, // Фильтрация и сортировка на бэке
  //     { path: 'locations', component: LocationsPageWithFrontFilterComponent, title: 'Локации' }, // Фильтрация и сортировка на фронте
  //     { path: 'locations/:title', component: PlacePageComponent },
  //     { path: 'team', component: TeamPageComponent },
  //     { path: 'help', component: HelpPageComponent },
  //     { path: 'legal-info', component: LegalInfoPageComponent },
  //     { path: 'media/:title', component: PostPageComponent },
  //     // { path: '**', redirectTo: '/' }
  //   ]
  // },

  // {
  //   path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  // },
  
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules,
        // scrollPositionRestoration: 'enabled'
        get scrollPositionRestoration() {
          const params: any = new URLSearchParams(window.location.search);
          const pathname = window.location.pathname;
          // if (params.get('name')) {
          if (pathname.startsWith('/company') || pathname.startsWith('/help')) {
            return 'disabled' as const;
          }
          return 'top' as const;
        }
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
