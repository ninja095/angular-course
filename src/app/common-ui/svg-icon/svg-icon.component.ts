import {Component, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: `<svg:use [attr.href]="href"></svg:use>`,
  styles: [`
    :host {
      width: var(--svg-icon-width, 18px);
      height: var(--svg-icon-height, 18px);
    }
  `]
})
export class SvgIconComponent {
  @Input() icon = '';

  get href() {
    return `/assets/svg/${this.icon}.svg#${this.icon}`
  }
}
