import { Component, Input, ElementRef, Renderer2, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: `<svg:use></svg:use>`,
  styles: [
    `
      :host {
        width: var(--svg-icon-width, 18px);
        height: var(--svg-icon-height, 18px);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent implements OnInit {
  @Input() icon = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const useElement = this.el.nativeElement.querySelector('use');
    const href = `/assets/svg/${this.icon}.svg#${this.icon}`;
    this.renderer.setAttribute(useElement, 'href', href);
  }
}
