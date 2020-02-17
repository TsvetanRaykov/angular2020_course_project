import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { MoneyPipe } from './money.pipe';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './google-map/google-map.component';
@NgModule({
  declarations: [FormErrorsComponent, MoneyPipe, GoogleMapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsm8cICsupexo4-Yln9fshqPXVkA07a4g',
      libraries: ['places']
    })
  ],
  exports: [FormErrorsComponent, MoneyPipe, GoogleMapComponent]
})
export class SharedModule {}
