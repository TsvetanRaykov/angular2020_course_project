import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { KinveyModule } from 'kinvey-angular-sdk';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    NgxSpinnerModule,
    KinveyModule.init({
      appKey: environment.KINVEY_APP_KEY,
      appSecret: environment.KINVEY_APP_SECRET
    })
  ],
  exports: [NavigationComponent]
})
export class CoreModule {}
