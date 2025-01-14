'use strict';

import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component';
import { Store } from '@ngrx/store';
import { selectFilteredProfiles } from '../../data';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {

  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {
  }
}
