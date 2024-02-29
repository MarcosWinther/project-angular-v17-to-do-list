import { Component, signal } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Components
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { InputListItemsComponent } from '../../components/input-list-items/input-list-items.component';

// Interface
import { IListItems } from '../../interface/IListItems.interface';

// Enum
import { ELOCALSTORAGE } from '../../enum/ELocalStorage.enum';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem(ELOCALSTORAGE.MY_LIST) || '[]');
  }

  #updateLocalStorage() {
    return localStorage.setItem(ELOCALSTORAGE.MY_LIST, JSON.stringify(this.#setListItems()));
  }

  public getInputAddItem(value: IListItems) {
    localStorage.setItem(ELOCALSTORAGE.MY_LIST, JSON.stringify([...this.#setListItems(), value]));

    return this.#setListItems.set(this.#parseItems());
  }

  public listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter( (res: IListItems) => {
      if(value === 'pending') {
        return !res.checked;
      }

      if(value === 'completed') {
        return res.checked;
      }

      return res;
    })
  }

  public updateItemCheckbox(newItem: { id: string, checked: boolean }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter(res => {
        if(res.id === newItem.id) {
          res.checked = newItem.checked;
          return res;
        }

        return res;
      })

      return oldValue;
    });

    return this.#updateLocalStorage();
  }

  public updateItemText(newItem: { id: string, value: string }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter(res => {
        if(res.id === newItem.id) {
          res.value = newItem.value;
          return res;
        }

        return res;
      })

      return oldValue;
    });

    return this.#updateLocalStorage();
  }

  public deleteItem(id: string) {

    Swal.fire({
      title: "Tem certeza que você deseja apagar este item?",
      text: "Você não poderá reverter o processo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, eu almejo deletar este item!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: IListItems[]) => {
          return oldValue.filter((res) => res.id !== id);
        });

        return this.#updateLocalStorage();
      }
    });
  }

  public deleteAllItems() {

    Swal.fire({
      title: "Tem certeza que você deseja apagar todos os itens?",
      text: "Você não poderá reverter o processo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, delete este item!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ELOCALSTORAGE.MY_LIST);
        return this.#setListItems.set(this.#parseItems());
      }
    });
  }
}
