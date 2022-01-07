/* eslint-disable @typescript-eslint/naming-convention */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  PRODUCTION: false,
  HOST: 'http://localhost:3003/api',
  SALDO_HOST: 'http://localhost:3010/api/solana',
  CLIENT_INFO: {
    NAME: 'saldoapp',
    CODE: 'SaldoApp.1!',
  },
  TOAST_DURATION: 5000,
  PUBLIC_IP: '54.177.253.49',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
