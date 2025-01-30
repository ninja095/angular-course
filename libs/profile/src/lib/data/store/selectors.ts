import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfile,
  (profiles) => profiles
);

export const selectProfilePage = createSelector(
  profileFeature.selectProfileFeatureState,
  (state) => ({
    page: state.page,
    size: state.size,
  })
);

export const selectProfileFilters = createSelector(
  profileFeature.selectProfileFilters,
  (filters) => filters
);
