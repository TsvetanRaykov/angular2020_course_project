import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { UserModule } from './user/user.module';
import { NotFound404Component } from './not-found404/not-found404.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent, NotFound404Component],
  imports: [BrowserModule, AppRoutingModule, BaseModule, NgbModule, UserModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
