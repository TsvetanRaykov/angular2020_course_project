import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, NgbModule, RouterModule, NgxSpinnerModule],
  exports: [NavigationComponent]
})
export class CoreModule {}
