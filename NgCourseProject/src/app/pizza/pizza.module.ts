import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaRoutingModule } from './pizza-routing.module';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaEditComponent } from './pizza-edit/pizza-edit.component';
import { PizzaNewComponent } from './pizza-new/pizza-new.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PizzaComponent } from './pizza/pizza.component';
@NgModule({
  declarations: [PizzaListComponent, PizzaEditComponent, PizzaNewComponent, PizzaComponent],
  imports: [CommonModule, PizzaRoutingModule, SharedModule, ReactiveFormsModule, NgxSpinnerModule]
})
export class PizzaModule {}
