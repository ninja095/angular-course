import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { profileActions } from './actions';
import { ProfileService } from '@ac/data-access';
import { Store } from '@ngrx/store';
import { selectProfileFilters, selectProfilePage } from './selectors';

@Injectable({
  providedIn: 'root'
})
export class ProfileEffects {
  profileService = inject(ProfileService);
  actions$ = inject(Actions);
  store = inject(Store);

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents, profileActions.setPage),
      withLatestFrom(
        this.store.select(selectProfileFilters),
        this.store.select(selectProfilePage),
      ),
      switchMap(([_, filters, pageable]) => {
        return this.profileService.getFilteredProfiles({
          ...pageable,
          ...filters
        });
      }),
      map(res => profileActions.profileLoaded({ profiles: res.items }))
    )
  });
}

