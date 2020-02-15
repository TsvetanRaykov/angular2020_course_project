import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaEditComponent } from './pizza-edit.component';

describe('PizzaEditComponent', () => {
  let component: PizzaEditComponent;
  let fixture: ComponentFixture<PizzaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
