# Rayo app
//TODO  add description

This app has used following techs:

- [ES6](http://babeljs.io/learn-es2015/) features/modules

- [ESLint](http://eslint.org/) for code linting
- VS Code

---

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [IONIC](https://ionicframework.com/docs/intro/cli)
- [CORDOVA](https://cordova.apache.org/docs/en/10.x/guide/cli/index.html#installing-the-cordova-cli)

## Setup

Clone the repository, install the dependencies and get started right away.

     git clone https://github.com/marcomontesneri/relampago.git
     cd <application-name>
     npm install

Finally, start the application.

     ionic serve --lab (For development)

## Prod Build

     ionic cordova build ios --prod
     ionic cordova build android --prod --release

## Dev Setup Auth
  To enable XCode emulator, enable Security tool

     sudo DevToolsSecurity -enable
## Sign Android APK
If you want to release your app in the Google Play Store, you have to sign your APK file. To do this, you have to create a new certificate/keystore.

Let’s generate your private key using the keytool command that comes with the JDK:

     keytool -genkey -v -keystore rayo-app-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias

To sign the unsigned APK, run the jarsigner tool which is also included in the JDK:

     /usr/bin/jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore rayo-app-release-key.jks app-release-unsigned.apk my-alias

Run the zip align tool to optimize the APK:

     ~/Library/Android/sdk/build-tools/30.0.3/zipalign -v 4 app-release-unsigned.apk rayo.apk

To verify that your apk is signed run apksigner:

     ~/Library/Android/sdk/build-tools/30.0.3/apksigner verify rayo.apk
