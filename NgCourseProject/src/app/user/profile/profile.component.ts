import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/must-match.validator';
import { GlobalMessages } from 'src/app/shared/global.constants';
import { ILocation, IUser } from 'src/app/models';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private componentFactory: ComponentFactoryResolver) {
    this.profileForm = this.fb.group(
      {
        email: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.minLength(3)]),
        RepeatPassword: new FormControl(null),
        phone: new FormControl(null, [Validators.required]),
        firstname: new FormControl(null),
        lastname: new FormControl(null)
      },
      { validators: [MustMatch('password', 'RepeatPassword', GlobalMessages.PASSWORDS_NOT_MATCH)] }
    );
  }
  @ViewChild(TemplateRef, { read: ViewContainerRef })
  private googleMapTemplateViewContainerRef: ViewContainerRef;

  user: IUser;
  profileForm: FormGroup;
  location: ILocation;
  isMapCollapsed = true;
  mapLoaded = false;

  ngOnInit(): void {
    this.user = this.authService.User;
    const [firstname, lastname] = this.user.fullName?.trim().split(' ') || [];
    this.profileForm = this.fb.group(
      {
        email: new FormControl(this.user.username, [Validators.required]),
        password: new FormControl(null, [Validators.minLength(3)]),
        RepeatPassword: new FormControl(null),
        phone: new FormControl(this.user.phone, [Validators.required]),
        firstname: new FormControl(firstname),
        lastname: new FormControl(lastname)
      },
      { validators: [MustMatch('password', 'RepeatPassword', GlobalMessages.PASSWORDS_NOT_MATCH)] }
    );
    this.location = this.user.location;
  }

  onSubmit() {
    console.log(this.location);
  }

  async handleMapComponent() {
    if (!this.mapLoaded) {
      this.googleMapTemplateViewContainerRef.clear();
      const { GoogleMapComponent } = await import('../../shared/google-map/google-map.component');
      const componentRef = this.googleMapTemplateViewContainerRef.createComponent(
        this.componentFactory.resolveComponentFactory(GoogleMapComponent)
      );
      componentRef.instance.inputLocation = this.user.location;
      componentRef.instance.locationChanged.subscribe(data => {
        this.location = data;
      });
      this.mapLoaded = true;
    }
    this.isMapCollapsed = !this.isMapCollapsed;
  }
}
