import { Component, EventEmitter, Input, Output } from '@angular/core';

// Interface
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-input-list-items',
  standalone: true,
  imports: [],
  templateUrl: './input-list-items.component.html',
  styleUrl: './input-list-items.component.scss'
})
export class InputListItemsComponent {

  @Input({ required: true}) public inputListItems: IListItems[] = [];

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{
    id: string;
    checked: boolean;
  }>();
  public updateItemCheckbox(id: string, checked: boolean) {
    return this.outputUpdateItemCheckbox.emit({ id, checked });
  }

  @Output() public outputUpdateItemText = new EventEmitter<{
    id: string;
    value: string;
  }>();
  public updateItemText(id: string, value: string) {
    return this.outputUpdateItemText.emit({ id, value });
  }

  @Output() public outputDeleteItem = new EventEmitter<string>();
  public deleteItemText(id: string) {
    return this.outputDeleteItem.emit(id);
  }

}
