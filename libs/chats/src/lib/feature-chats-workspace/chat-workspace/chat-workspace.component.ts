import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChatsService } from '@ac/data-access';


@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  chatsService = inject(ChatsService);

  activatedChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          switchMap(({ userId }) => {
            console.log('userId', userId);
            return this.chatsService.createChat(userId)
              .pipe(
                switchMap(chat => {
                  this.router.navigate(['chats', chat.id]);
                  return of(null)
                })
              );
          })
        )
      }
     return this.chatsService.getChatById(id);
    })
  );
}
