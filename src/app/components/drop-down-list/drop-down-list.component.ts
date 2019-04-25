import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'ng-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropDownListComponent),
    multi: true
  }]
})
export class DropDownListComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() items: ListItem[] = [];
  @Input() disabled = false;
  @Output() selectionChangedEmitter = new EventEmitter<any>();

  selectedValue: any = null;

  constructor() { }

  ngOnInit() {
    this.disabled = this.items.length <= 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['items'].isFirstChange()) {
      const items = changes['items'].currentValue;
      this.disabled = items.length <= 0;
    }
  }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  selectionChanged(ev: Event) {
    this.selectionChangedEmitter.emit();
  }
}
