import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderTableComponent } from './order-table/order-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeaderDirective } from './order-table/sortable.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OrderListComponent, OrderTableComponent, NgbdSortableHeaderDirective],
  imports: [CommonModule, OrderRoutingModule, FormsModule, ReactiveFormsModule, NgbModule, BrowserModule, SharedModule]
})
export class OrderModule {}
