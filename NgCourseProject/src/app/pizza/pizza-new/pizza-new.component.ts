import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Parse } from 'parse';
import { environment } from '../../../environments/environment';
import { PizzaService } from '../../core/services/pizza.service';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GlobalMessages } from '../../shared/global.constants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pizza-new',
  templateUrl: './pizza-new.component.html',
  styleUrls: ['./pizza-new.component.scss']
})
export class PizzaNewComponent implements OnInit, OnDestroy {
  @ViewChild('selectedFileName', { static: true })
  selectedFileName: ElementRef<HTMLLabelElement>;
  pizzaNewForm: FormGroup;
  pizzaPhoto: string;
  pizzaCreate$: Observable<any>;
  pizzaCreateSubs: Subscription;
  constructor(private fb: FormBuilder, private pizzaService: PizzaService, private router: Router, private toastr: ToastrService) {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }

  ngOnInit() {
    this.pizzaNewForm = this.fb.group({
      name: new FormControl(null),
      size: new FormControl(null),
      weight: new FormControl(null),
      description: new FormControl(null),
      photo: new FormControl(null)
    });
  }

  ngOnDestroy() {
    this.pizzaCreateSubs.unsubscribe();
  }

  onChange(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pizzaPhoto = reader.result.toString();
      };
      this.selectedFileName.nativeElement.textContent = 'blabal';
    }
  }

  onSubmit() {
    this.pizzaCreate$ = this.pizzaService.create({
      name: this.pizza('name'),
      description: this.pizza('description'),
      weight: this.pizza('weight'),
      photo: { name: this.pizza('name'), base64: this.pizzaPhoto }
    });
    this.pizzaCreateSubs = this.pizzaCreate$.subscribe({
      next: () => {
        this.toastr.success(GlobalMessages.PIZA_CREATE_SUCCESS);
        this.router.navigate(['/']);
      },
      error: () => {
        this.toastr.error(GlobalMessages.PIZA_CREATE_FAILED);
      }
    });
  }

  private pizza(key: string) {
    return this.pizzaNewForm.get(key).value;
  }
}
