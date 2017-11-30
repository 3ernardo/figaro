import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BarbeariaDetailPage} from '../pages/barbeariaDetail/barbeariaDetail';
import { AgendamentoPage} from '../pages/agendamento/agendamento';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import{ CrudBarbeariasService } from './crud-barbearias.service';
 
var config = {
    apiKey: "AIzaSyBhoUgnF8fWv8u7_RnnDZiXh2y7-wyH21c",
    authDomain: "app-barbearia.firebaseapp.com",
    databaseURL: "https://app-barbearia.firebaseio.com",
    projectId: "app-barbearia",
    storageBucket: "app-barbearia.appspot.com",
    messagingSenderId: "491412402447"
  };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BarbeariaDetailPage,
    AgendamentoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule

  ],
  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BarbeariaDetailPage,
    AgendamentoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CrudBarbeariasService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
