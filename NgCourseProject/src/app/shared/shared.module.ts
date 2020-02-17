import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { MoneyPipe } from './money.pipe';

@NgModule({
  declarations: [FormErrorsComponent, MoneyPipe],
  imports: [CommonModule],
  exports: [FormErrorsComponent, MoneyPipe]
})
export class SharedModule {}
