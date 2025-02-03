import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'lib-stack-input',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, FormsModule],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StackInputComponent),
      multi: true,
    },
  ],
})
export class StackInputComponent implements ControlValueAccessor {
  value$ = new BehaviorSubject<string[]>([])
  #disabled = false;

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.#disabled;
  }

  innerInput = '';
  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.innerInput) return;

    this.value$.next([...this.value$.value, this.innerInput]);
    this.innerInput = '';
    this.onChange(this.value$.value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.#disabled = isDisabled;
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value$.next([]);
      return;
    }

    this.value$.next(stack);
  }

  onChange = (value: string[] | null) => {};
  onTouched = () => {};

  removeTech(index: number) {
    this.value$.next(this.value$.value.filter((_, i) => i !== index));
    this.onChange(this.value$.value);
  }
}
