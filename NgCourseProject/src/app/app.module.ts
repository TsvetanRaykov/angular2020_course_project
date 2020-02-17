import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { NotFound404Component } from './not-found404/not-found404.component';
import { PizzaModule } from './pizza/pizza.module';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [AppComponent, NotFound404Component],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    CoreModule,
    NgbModule,
    UserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 4000, positionClass: 'toast-bottom-center', preventDuplicates: false }),
    PizzaModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsm8cICsupexo4-Yln9fshqPXVkA07a4g',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
