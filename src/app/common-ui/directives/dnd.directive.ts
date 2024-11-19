import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[dnd]',
  standalone: true
})
export class DndDirective {
  @Output() fileDropped = new EventEmitter<File>();

  @HostBinding('class.dragover') isDragover = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isDragover = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isDragover = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isDragover = false;

    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }
}

