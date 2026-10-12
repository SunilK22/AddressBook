import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { childTable, selectOpt } from '../../model/contactmodel';

type ChildKind = 'phone' | 'email' | 'socialMedia';

@Component({
  imports: [FormsModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatTableModule, MatButtonModule],
  selector: 'app-child-table-component',
  styleUrl: './child-table-component.scss',
  templateUrl: './child-table-component.html',
})
export class ChildTableComponent implements OnInit {
  @Input() tableTitle: string = 'Value';
  @Input() kind: ChildKind = 'phone';
  @Input() dataSource: childTable[] = [];
  @Output() dataSourceChange = new EventEmitter<childTable[]>();

  displayedColumns: string[] = ['type', 'value', 'actions'];
  newValue = '';
  newType = 0;
  maxLength = 20;
  inputType = 'tel';
  typeOptions: selectOpt[] = [];

  ngOnInit(): void {
    if (this.kind === 'socialMedia') {
      this.typeOptions = [
        { value: 0, viewValue: 'Instagram' },
        { value: 1, viewValue: 'Facebook' },
        { value: 2, viewValue: 'LinkedIn' },
        { value: 3, viewValue: 'Twitter' },
        { value: 4, viewValue: 'WhatsApp' }
      ];
      this.maxLength = 50;
      this.inputType = 'text';
    } else if (this.kind === 'email') {
      this.typeOptions = [
        { value: 0, viewValue: 'Home' },
        { value: 1, viewValue: 'Work' },
        { value: 2, viewValue: 'Other' }
      ];
      this.maxLength = 254;
      this.inputType = 'email';
    }

    if (this.kind === 'phone') {
      this.typeOptions = [
        { value: 0, viewValue: 'Home' },
        { value: 1, viewValue: 'Work' },
        { value: 2, viewValue: 'Other' }
      ];
    }
  }

  addItem(): void {
    const value = this.newValue.trim();
    if (value === '' || value.length > this.maxLength) {
      return;
    }

    const updatedData = this.dataSource.slice();
    updatedData.push({ type: this.newType, value });
    this.dataSourceChange.emit(updatedData);
    this.newValue = '';
    this.newType = 0;
  }

  removeItem(itemToRemove: childTable): void {
    const updatedData: childTable[] = [];

    for (const item of this.dataSource) {
      if (item !== itemToRemove) {
        updatedData.push(item);
      }
    }

    this.dataSourceChange.emit(updatedData);
  }

  typeLabel(type: number): string {
    for (const option of this.typeOptions) {
      if (option.value === type) {
        return option.viewValue;
      }
    }

    return '';
  }
}
