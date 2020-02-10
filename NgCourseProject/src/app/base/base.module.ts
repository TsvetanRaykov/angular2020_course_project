import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, NgbModule],
  exports: [NavigationComponent]
})
export class BaseModule {}
