import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@Component({
  imports: [MatIconModule, MatCardModule],
  selector: 'app-child-table-component',
  styleUrl: './child-table-component.scss',
  templateUrl: './child-table-component.html',
})
export class ChildTableComponent {

  tableTitle: string = '';

  opened = signal(false);

  IsClicked() {
    let isOpened = this.opened();
    this.opened.set(!isOpened);
  }
}
