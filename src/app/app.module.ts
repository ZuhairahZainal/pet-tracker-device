import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from '../app/auth.service';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

//env
import { environment } from '../environments/environment';
import { AuthGuard } from './auth.guard';

import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireAuthModule,
            AngularFireDatabaseModule,
            AngularFireStorageModule,
            AngularFirestoreModule,
            QRCodeModule,
            AppRoutingModule],
  providers: [AuthService, AuthGuard, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
