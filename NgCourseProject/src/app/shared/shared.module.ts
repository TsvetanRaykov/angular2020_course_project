import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { MoneyPipe } from './money.pipe';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './google-map/google-map.component';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [FormErrorsComponent, MoneyPipe, GoogleMapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_API_KEY,
      libraries: ['places']
    })
  ],
  exports: [FormErrorsComponent, MoneyPipe, GoogleMapComponent]
})
export class SharedModule {}
