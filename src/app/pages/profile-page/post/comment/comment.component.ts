import {Component, input} from '@angular/core';
import {Comments} from "../../../../data/interfaces/post.interface";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input<Comments>();
}
