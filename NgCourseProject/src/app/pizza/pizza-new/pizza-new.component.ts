import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Parse } from 'parse';
import { environment } from '../../../environments/environment';
import { PizzaService } from '../../core/services/pizza.service';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GlobalMessages } from '../../shared/global.constants';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPizza, IPizzaType } from 'src/app/models';

@Component({
  selector: 'app-pizza-new',
  templateUrl: './pizza-new.component.html',
  styleUrls: ['./pizza-new.component.scss', '../../shared/form.validation.styles.scss']
})
export class PizzaNewComponent implements OnInit, OnDestroy {
  @ViewChild('selectedFileName', { static: true })
  selectedFileName: ElementRef<HTMLLabelElement>;
  newPizza: IPizza;
  newPizzaTypes: IPizzaType[] = [];
  isTypeValid = {
    size: true,
    weight: true,
    price: true
  };
  pizzaNewForm: FormGroup;
  pizzaPhoto: string;
  pizzaSizes = ['Big', 'Middle', 'Small'];
  localSubscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private pizzaService: PizzaService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }

  ngOnInit() {
    this.pizzaNewForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      size: new FormControl('Middle'),
      weight: new FormControl(null),
      price: new FormControl(null),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      photo: new FormControl(null, [Validators.required]),
      hastipes: new FormControl(null)
    });
    this.onValueChanges();
  }
  onValueChanges(): void {
    this.localSubscriptions.push(
      this.pizzaNewForm.valueChanges.subscribe(() => {
        this.newPizza = this.getPizza();
        if (this.newPizzaTypes.length === 0) {
          const hasTipes = this.pizzaNewForm.get('hastipes');
          hasTipes.setErrors({ 'Please, add at least one type': true });
          hasTipes.markAsDirty();
        }
      })
    );
  }

  ngOnDestroy() {
    this.localSubscriptions.forEach(s => s.unsubscribe());
    this.spinner.hide();
  }
  handlePizzaTypeAdd() {
    const size = this.pizza('size');
    const weight = this.pizza('weight');
    const price = this.pizza('price');
    this.isTypeValid.size = this.pizzaSizes.includes(size);
    this.isTypeValid.weight = !!weight && weight > 100 && weight < 10000;
    this.isTypeValid.price = !!price && price > 0 && price < 1000;
    if (
      Object.values(this.isTypeValid).reduce((acc, val) => {
        return acc && val;
      })
    ) {
      this.newPizzaTypes.push({ size, weight, price });
    }
  }
  handlePizzaTypeRemove(e) {
    this.newPizzaTypes = this.newPizzaTypes.filter(t => !Object.is(t, e));
  }
  handlePhotoChange(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pizzaPhoto = reader.result.toString();
        this.newPizza = this.getPizza();
      };
      this.selectedFileName.nativeElement.textContent = file.name;
    }
  }

  onSubmit() {
    this.spinner.show();
    this.localSubscriptions.push(
      this.pizzaService.create(this.newPizza).subscribe({
        next: () => {
          this.toastr.success(GlobalMessages.PIZA_CREATE_SUCCESS);
          this.router.navigate(['/']);
        },
        error: () => {
          this.toastr.error(GlobalMessages.PIZA_CREATE_FAILED);
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    );
  }

  private getPizza(): IPizza {
    return {
      name: this.pizza('name'),
      description: this.pizza('description'),
      weight: this.pizza('weight'),
      photo: this.pizzaPhoto ? { name: this.pizza('name'), base64: this.pizzaPhoto } : null,
      types: this.newPizzaTypes
    };
  }

  private pizza(key: string) {
    return this.pizzaNewForm.get(key).value;
  }
}
