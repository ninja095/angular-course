import { createActionGroup, props } from '@ngrx/store';
import { Profile } from 'libs/data-access/src/lib/profile';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{filters: Record<string, any>}>(),
    'profile loaded': props<{profiles: Profile[]}>()
  }
})
