import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

export interface Feature {
  code: string;
  label: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MockService {

  getAddresses() {
    return of([
      {
        country: 'Россия',
        city: 'Екатеринбург',
        zip: '620000',
        street: 'Ленина',
        building: 3,
        apartment: null
      },
      {
        country: 'Россия',
        city: 'Новосибирск',
        zip: '630000',
        street: 'Красный проспект',
        building: 4,
        apartment: null
      }
    ])
  }
  getFeatures(): Observable<Feature[]> {
    return of([
      {
        code: 'lift',
        label: 'Подъем на этаж',
        value: true
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true
      },
      {
        code: 'fast',
        label: 'Ускоренная доставка',
        value: false
      }
    ]);
  }
}
