import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GlobalMessages } from '../../shared/global.constants';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPizza, IPizzaType } from 'src/app/models';
import { KinveyPizzaService } from 'src/app/core/services/kinvey-pizza.service';

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
    private pizzaService: KinveyPizzaService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

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
        const hasTipes = this.pizzaNewForm.get('hastipes');
        if (this.newPizzaTypes.length === 0) {
          hasTipes.setErrors({ 'Please, add at least one type': true });
          hasTipes.markAsDirty();
        } else {
          hasTipes.setErrors(null);
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
    this.pizzaNewForm.get('hastipes').updateValueAndValidity();
  }
  handlePizzaTypeRemove(e) {
    this.newPizzaTypes = this.newPizzaTypes.filter(t => !Object.is(t, e));
    this.pizzaNewForm.get('hastipes').updateValueAndValidity();
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
        error: e => {
          this.toastr.error(GlobalMessages.PIZA_CREATE_FAILED);
          console.log(e);
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
      photo: this.pizzaPhoto ? { photoName: 'photo', base64: this.pizzaPhoto } : null,
      types: this.newPizzaTypes,
      onSale: true
    };
  }

  private pizza(key: string) {
    return this.pizzaNewForm.get(key).value;
  }
}
