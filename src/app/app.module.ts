import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp({ 
      apiKey: "AIzaSyAeckrorv7nEmcoe2SMzCjsO2AIWfPCyto",
      authDomain: "burger-tech-app.firebaseapp.com",
      projectId: "burger-tech-app",
      storageBucket: "burger-tech-app.appspot.com",
      messagingSenderId: "344322130765",
      appId: "1:344322130765:web:40a5b8130f06eafc112d04"
     }),
     AngularFirestoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}