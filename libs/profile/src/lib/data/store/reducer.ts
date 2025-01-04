import { Profile } from '@ac/interfaces/profile';
import {  createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';

export interface ProfileState {
  profile: Profile[];
  profileFilters: Record<string, any>;
}

export const initialState: ProfileState = {
  profile: [],
  profileFilters: {}
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profileLoaded, (state: ProfileState, payload ) => {
      console.log('profileReducer state after:', state);
      return {
        ...state,
        profile: payload.profiles
      }
    }),
  )
})
