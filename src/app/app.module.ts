import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { FilterByGender } from './shared/pipe/filter.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar';

function initiateConfig(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    FilterByGender
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OrderModule,
    MatProgressBarModule
  ],
  providers: [  AppConfig,
    { provide: APP_INITIALIZER,
      useFactory: initiateConfig,
      deps: [AppConfig], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
