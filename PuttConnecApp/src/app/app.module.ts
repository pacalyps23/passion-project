import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { ListPage } from '../pages/list/list';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InfoPage } from '../pages/info/info';
import { ProfilePage } from '../pages/profile/profile';
import { AuthService } from './services/authService';
import { ListService } from './services/listService';
import { RegisterPage } from '../pages/register/register';


@NgModule({
  declarations: [
    MyApp,
    ListPage,
    InfoPage,
    ProfilePage,
    RegisterPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HomePageModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'bottom'}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    ProfilePage,
    InfoPage,
    RegisterPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ListService,
    Geolocation,
    AuthService
  ]
})
export class AppModule {}
