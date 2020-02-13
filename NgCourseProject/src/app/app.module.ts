import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { UserModule } from './user/user.module';
import { NotFound404Component } from './not-found404/not-found404.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent, NotFound404Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseModule,
    NgbModule,
    UserModule,
    HomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 3000, positionClass: 'toast-top-center', preventDuplicates: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
