import { Profile } from 'libs/data-access/src/lib/profile';
import {  createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';

export interface ProfileState {
  profile: Profile[];
  profileFilters: Record<string, any>;
  page: number;
  size: number;
}

export const initialState: ProfileState = {
  profile: [],
  profileFilters: {},
  page: 1,
  size: 10
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profileLoaded, (state: ProfileState, payload ) => {
      return {
        ...state,
        profile: state.profile.concat(payload.profiles)
      }
    }),
    on(profileActions.filterEvents, (state: ProfileState, payload ) => {
      return {
        ...state,
        profile: [],
        profileFilters: payload.filters,
        page: 1
      }
    }),
    on(profileActions.setPage, (state: ProfileState, payload ) => {
     let page = payload.page;
     if (!page) page = state.page + 1;
      return {
        ...state,
        page
      }
    }),
  )
})
