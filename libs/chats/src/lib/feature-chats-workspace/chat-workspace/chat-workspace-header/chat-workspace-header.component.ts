import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@ac/common-ui';
import { Profile } from 'libs/data-access/src/lib/profile';

@Component({
  selector: 'app-chat-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
