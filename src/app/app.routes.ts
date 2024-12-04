import { Routes } from "@angular/router";

export const routes: Routes = [
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
    {
        path: 'app/:pathname1',
        pathMatch: 'full',
        redirectTo: '/:pathname1', // в будущем надо будет перейти на 18 версию angular и там в качестве значения свойства redirectTo может быть функция
    },
    {
        path: 'app/:pathname1/:pathname2',
        redirectTo: '/:pathname1/:pathname2',
    },
    { path: "**", redirectTo: "/" },
];
