import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownListComponent } from './drop-down-list.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'ng-test-host',
  template: '<ng-drop-down-list [items]="items"></ng-drop-down-list>'
})
class TestHostComponent {
  items: ListItem[] = [];
  setItems(items: ListItem[]) {
    this.items = items;
  }
}

describe('DropDownListComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  const mockItemsList: ListItem[] = [
    {
      display: 'one',
      value: 1
    },
    {
      display: 'two',
      value: 2
    },
    {
      display: 'three',
      value: 3
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropDownListComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should still render drop down with no selectable items', () => {
    const el = fixture.debugElement.nativeElement as HTMLElement;
    const selectEl = el.querySelector('select');
    expect(selectEl).toBeTruthy();
  });

  it('should default to empty list', () => {
    const el = fixture.debugElement.nativeElement as HTMLElement;
    const options = el.querySelectorAll('option');
    expect(options.length).toBe(0);
  });

  it('should disable drop down if the list is empty', () => {
    const el = fixture.debugElement.nativeElement as HTMLElement;
    const selectEl = el.querySelector('select');
    expect(selectEl.disabled).toBe(true);
  });

  it('should enable drop down if the list has items', () => {
    component.setItems(mockItemsList);
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement as HTMLElement;
    const selectEl = el.querySelector('select');
    expect(selectEl.disabled).toBe(false);
  });

  it('should call event handler when selection is made', () => {
    component.setItems(mockItemsList);
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    const ddrComponent: DropDownListComponent = fixture.debugElement.query(
      By.directive(DropDownListComponent)
    ).componentInstance;

    spyOn(ddrComponent, 'selectionChanged');
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(ddrComponent.selectionChanged).toHaveBeenCalled();
  });
});
