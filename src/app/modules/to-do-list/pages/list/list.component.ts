import { Component, signal } from '@angular/core';

// Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';

// Interface
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>([]);
  getListItems = this.#setListItems.asReadonly();

  public getInputAddItem(value: IListItems) {
    localStorage.setItem('@my-list', JSON.stringify([value]));
  }
}
