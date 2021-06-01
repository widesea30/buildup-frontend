// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'http://localhost:8000',
  firebase: {
    apiKey: "AIzaSyDypfERureopDOX-xIm7n_ZfJZCOfFtv94",
    authDomain: "buildup-7a0db.firebaseapp.com",
    projectId: "buildup-7a0db",
    storageBucket: "buildup-7a0db.appspot.com",
    messagingSenderId: "529304574140",
    appId: "1:529304574140:web:34c1e5a61b627347e2d8b9"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
