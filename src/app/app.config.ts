import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"mrg-flight-tracker-app","appId":"1:874090997083:web:908e7cdab597e0400fa67e","storageBucket":"mrg-flight-tracker-app.appspot.com","apiKey":"AIzaSyBR7k7piN4l4ivnfa9_1VTNC_nKv9iKNTE","authDomain":"mrg-flight-tracker-app.firebaseapp.com","messagingSenderId":"874090997083"})), provideAuth(() => getAuth()), provideDatabase(() => getDatabase())]
};
