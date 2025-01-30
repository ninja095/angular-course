'use strict';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component';
import { Store } from '@ngrx/store';
import { profileActions, selectFilteredProfiles } from '../../data';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { InfiniteScrollTriggerComponent } from '@ac/common-ui';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent, InfiniteScrollTriggerComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {

  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);
  console = console;

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}));
  }
}
