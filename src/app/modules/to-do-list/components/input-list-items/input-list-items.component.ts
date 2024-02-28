import { Component, Input } from '@angular/core';

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

}
