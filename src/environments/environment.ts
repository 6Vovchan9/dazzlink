// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "./interface";

export const environment: Environment = {
  production: false,
  apiKey: 'AIzaSyCgmx_4eLW1JXVz-8qB8KMdbavDpYtKGSA',
  fbDbUrl: 'https://dazzlink-e643b-default-rtdb.firebaseio.com',
  rovraggeUrl: '/dating/api/article-content',
  rovraggePlacesUrl: '/dating/api/meeting-places',
  articleUrl: '/article-content',
  placeUrl: '/meeting-places'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
