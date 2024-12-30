import { Routes } from '@angular/router';
import { LoginPageComponent } from '../../../../libs/auth/src/lib/feature-login/login-page/login-page.component';
import { SearchPageComponent } from '../../../../libs/profile/src/lib/feature-profile-list/search-page/search-page.component';
import { LayoutComponent } from '../../../../libs/common-ui/src/lib/layout/layout.component';
import { SettingsPageComponent } from '../../../../libs/profile/src/lib/feature-profile-settings/settings-page/settings-page.component';
import { chatsRoutes } from '../../../../libs/chats/src/lib/feature-chats-workspace/chats-pages/chatsRoutes';
import { canActivateAuth } from '@ac/auth';
import { ProfilePageComponent } from '@ac/profile';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'chats', loadChildren: () => chatsRoutes },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
