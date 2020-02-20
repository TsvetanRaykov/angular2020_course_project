import { Directive, Input, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { TSortDirection } from 'src/app/models';

const rotate: { [key: string]: TSortDirection } = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: TSortDirection;
}

@Directive({
  selector: '[appSortable]'
})
export class NgbdSortableHeaderDirective {
  constructor() {}

  @Input()
  column: string;

  @Input()
  direction: TSortDirection = '';

  @Output() sort = new EventEmitter<SortEvent>();

  @HostListener('click') rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.column, direction: this.direction });
  }
}
