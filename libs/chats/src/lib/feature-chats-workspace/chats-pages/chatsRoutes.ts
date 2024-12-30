import { Route } from '@angular/router';
import { ChatsPagesComponent } from './chats-pages.component';
import { ChatWorkspaceComponent } from '../chat-workspace/chat-workspace.component';

export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPagesComponent,
    children: [{ path: ':id', component: ChatWorkspaceComponent }],
  },
];
