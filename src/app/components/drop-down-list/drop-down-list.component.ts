import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ng-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss']
})
export class DropDownListComponent implements OnInit, OnChanges {
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

  selectionChanged(ev: Event) {
    this.selectionChangedEmitter.emit();
  }
}
