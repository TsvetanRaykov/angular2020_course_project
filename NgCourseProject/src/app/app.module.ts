import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { NotFound404Component } from './not-found404/not-found404.component';
import { PizzaModule } from './pizza/pizza.module';

@NgModule({
  declarations: [AppComponent, NotFound404Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgbModule,
    UserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2000, positionClass: 'toast-bottom-center', preventDuplicates: false }),
    PizzaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
