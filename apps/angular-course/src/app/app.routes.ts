import { Routes } from '@angular/router';
import { LoginPageComponent } from '../../../../libs/auth/src/lib/feature-login/login-page/login-page.component';
import { chatsRoutes } from '../../../../libs/chats/src/lib/feature-chats-workspace/chats-pages/chatsRoutes';
import { canActivateAuth } from '@ac/auth';
import {
  ProfileEffects,
  profileFeature,
  ProfilePageComponent,
  SearchPageComponent,
  SettingsPageComponent
} from '@ac/profile';
import { LayoutComponent } from '@ac/layout';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PostEffects, postFeature } from '@ac/posts';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent,
        providers: [
        provideState(postFeature),
        provideEffects(PostEffects),
        ]
      },
      { path: 'settings', component: SettingsPageComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
        provideState(profileFeature),
        provideEffects(ProfileEffects),
        ]
      },
      { path: 'chats', loadChildren: () => chatsRoutes },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
