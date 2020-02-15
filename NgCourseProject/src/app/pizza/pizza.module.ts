import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaRoutingModule } from './pizza-routing.module';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaEditComponent } from './pizza-edit/pizza-edit.component';
import { PizzaNewComponent } from './pizza-new/pizza-new.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PizzaListComponent, PizzaEditComponent, PizzaNewComponent],
  imports: [CommonModule, PizzaRoutingModule, SharedModule, ReactiveFormsModule]
})
export class PizzaModule {}
