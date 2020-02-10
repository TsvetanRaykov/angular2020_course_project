import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { from } from 'rxjs';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BaseModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
