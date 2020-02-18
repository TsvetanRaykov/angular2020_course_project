import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/must-match.validator';
import { GlobalMessages } from 'src/app/shared/global.constants';
import { ILocation, IUser } from 'src/app/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private componentFactory: ComponentFactoryResolver,
    private spinner: NgxSpinnerService
  ) {
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
  userChanges = {};
  updateSubscription: Subscription;

  ngOnInit(): void {
    const setter = (target, key, value) => {
      if (target[key] !== value) {
        this.userChanges[key] = value;
      }
      return true;
    };
    this.user = new Proxy(this.authService.User, { set: setter });
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
    this.location.address = this.user.address;
  }
  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
    this.spinner.hide();
  }
  onSubmit() {
    this.user.username = this.get('email');
    const newPassword = this.get('password');
    if (newPassword) {
      this.user.password = newPassword;
    }
    this.user.fullName = `${this.get('firstname')} ${this.get('lastname')}`;
    this.user.phone = this.get('phone');
    this.user.address = this.location.address.slice();
    this.user.location = this.location;

    if (Object.entries(this.userChanges).length > 0) {
      this.spinner.show();
      this.updateSubscription = this.authService.update(this.userChanges).subscribe({
        next: () => {
          this.toastr.success(GlobalMessages.USER_UPDATE_SUCCESS);
          this.spinner.hide();
        },
        error: error => {
          this.toastr.error(GlobalMessages.USER_UPDATE_FAILED);
          if (!environment.production) {
            console.error(error);
            this.spinner.hide();
          }
        }
      });
    } else {
      this.toastr.info(GlobalMessages.USER_UPDATE_NO_CHANGES);
    }
  }

  private get(key: string) {
    return this.profileForm.get(key).value;
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
