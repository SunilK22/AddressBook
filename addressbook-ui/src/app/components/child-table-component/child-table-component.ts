import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@Component({
  imports: [MatIconModule, MatCardModule, MatTableModule, MatButtonModule],
  selector: 'app-child-table-component',
  styleUrl: './child-table-component.scss',
  templateUrl: './child-table-component.html',
})
export class ChildTableComponent {
  @Input() tableTitle: string = 'Value';
  @Input() dataSource: any[] = [];

  displayedColumns: string[] = ['type', 'value', 'actions'];
}
