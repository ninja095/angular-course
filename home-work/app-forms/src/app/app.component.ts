import {Component, inject, signal} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup, FormRecord,
  FormsModule,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MockService} from './mock.service';
import {Feature} from './mock.service';
import {AsyncPipe, KeyValuePipe} from '@angular/common';
import {NameValidator} from './name.validator';
import {DaDataService} from './daData.service';
import {debounceTime, switchMap, tap} from 'rxjs';
import {DadataInterface} from './dadata.interface';

interface Address {
  search?: string;
  country?: string;
  city?: string;
  zip?: string;
  street?: string;
  building?: number | null;
  apartment?: number | null;
}

enum ReceiverType {
  PERSON = 'PERSON',
  COMPANY = 'COMPANY'
}
function getFormAddress(initialValue: Address = {}): FormGroup {
  return new FormGroup({
    search: new FormControl<string>(initialValue.search ?? ''),
    country: new FormControl<string>(initialValue.country ?? ''),
    city: new FormControl<string>(initialValue.city ?? ''),
    zip: new FormControl<string>(initialValue.zip ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null)
  })
}

const validateStartsWith = (forbiddenLetter: string): ValidatorFn => (control: AbstractControl) => {
  return control.value.startsWith(forbiddenLetter) ? {startsWith: {message: `${forbiddenLetter} - давай без этой буквы`}} : null  ;
};

const validateDateRange = ({from, to}: {from: string, to: string}) => (control: AbstractControl) => {
  const fromControl = control.get(from);
  const toControl = control.get(to);

  if (!fromControl || !toControl) return null;

  const fromDate = new Date(fromControl.value);
  const toDate = new Date(toControl.value);

  if (fromDate > toDate) {
    toControl.setErrors({dateRange: {message: 'Дата начала не может быть позже даты окончания'}});
    return {dateRange: {message: 'Дата начала не может быть позже даты окончания'}};
  }
    return null;

};

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, KeyValuePipe, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  ReceiverType = ReceiverType;
  mockData = inject(MockService);
  nameValidator = inject(NameValidator);
  daDataService = inject(DaDataService);

  isDropdownOpened = signal<boolean>(true)

  features: Feature[] = [];
  searchControl = new FormControl<string>('');
  suggestions$ = this.searchControl.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(value => {
        return this.daDataService.getSuggestions(value).pipe(
          tap(res => {
            this.isDropdownOpened.set(!!res.length)
          })
        )
      })
    )
  onSuggestionPick(suggest: DadataInterface) {
    // this.form.controls.addresses.controls.forEach(group => {
    //   group.get('city')?.setValue(city);
    // });
    this.form.controls.addresses.patchValue([{
      country: suggest.data.country,
      city: suggest.data.city,
      zip: suggest.data.postal_code,
      street: suggest.data.street,
      building: suggest.data.house,
    }])
    this.isDropdownOpened.set(false)
    this.searchControl.setValue('');
  }

  form = new FormGroup({
    receiverType: new FormControl<ReceiverType>(ReceiverType.PERSON),
      name: new FormControl<string>('',
        {
          validators: [Validators.required],
          asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
          updateOn: 'blur'
        },
      ),
      lastName: new FormControl<string>(''),
      tin: new FormControl<number | null>(null),
      addresses: new FormArray([getFormAddress()]),
      features: new FormRecord({}),
      dateRange: new FormGroup({
        from: new FormControl<string>(''),
        to: new FormControl<string>('')
      }, validateDateRange({from: 'from', to: 'to'}))
  });

  constructor() {
    // this.mockData.getAddresses()
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(data => {
    //     this.form.controls.addresses.clear();
    //
    //     data.forEach((address) => {
    //     this.form.controls.addresses.push(getFormAddress(address));
    //     });
    //     // this.form.controls.addresses.setControl(1, getFormAddress(data[1]));
    //     // this.form.controls.addresses.at(1);
    //
    //   });
    this.mockData.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe(features => {
        this.features = features;
        for (const feature of features) {
          this.form.controls.features.addControl(feature.code, new FormControl<boolean>(feature.value));
        }
      });


    this.form.controls.receiverType.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.form.controls.tin.clearValidators();

        if (value === ReceiverType.COMPANY) {
          this.form.controls.tin.setValidators([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(12)
          ])
          this.form.controls.addresses.controls.forEach(group => {
            group.get('apartment')?.disable();
          });
        } else {
          this.form.controls.addresses.controls.forEach(group => {
            group.get('apartment')?.enable();
          });
        }
    });
  }
  onSubmit(event:SubmitEvent) {
    this.form.markAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
    // this.form.reset();

  }
  addAddress() {
    this.form.controls.addresses.push(getFormAddress());
    // this.form.controls.addresses.insert(0, getFormAddress());
  }
  removeAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {emitEvent: false});
  }
  sort = () => 0;
}

