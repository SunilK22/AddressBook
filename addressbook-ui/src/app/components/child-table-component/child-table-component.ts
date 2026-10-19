import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ValueChangeEvent } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { IChildTable, ISelectOpt } from '../../model/contactmodel';
import { Subscription } from 'rxjs';

type ChildKind = 'phone' | 'email' | 'socialMedia';

@Component({
  imports: [FormsModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatTableModule, MatButtonModule],
  selector: 'app-child-table-component',
  styleUrl: './child-table-component.scss',
  templateUrl: './child-table-component.html',
})
export class ChildTableComponent implements OnInit, OnDestroy {
  @Input() tableTitle: string = 'Value';
  @Input() kind: ChildKind = 'phone';
  @Input() arrayData: FormArray = new FormArray<FormGroup>([]);
  @Input() isViewMode = false;
  @ViewChild(MatTable) table!: MatTable<unknown>;

  displayedColumns: string[] = ['type', 'value', 'actions'];
  tableRows: IChildTable[] = [];
  newValue = '';
  newType = 0;
  maxLength = 20;
  inputType = 'tel';
  typeOptions: ISelectOpt[] = [];
  valueChanges!: Subscription;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.tableRows = this.arrayData.getRawValue();
    this.valueChanges = this.arrayData.valueChanges.subscribe(() => {
      this.tableRows = this.arrayData.getRawValue();
    });

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

  ngOnDestroy(): void {
    if (this.valueChanges) {
      this.valueChanges.unsubscribe();
    }
  }

  addItem(): void {
    const value = this.newValue.trim();
    if (value === '' || value.length > this.maxLength) {
      return;
    }

    const newRow = new FormGroup({
      type: new FormControl(this.newType),
      value: new FormControl(value)
    });


    this.arrayData.push(newRow);
    this.newValue = '';
    this.newType = 0;
  }

  removeItem(index: number): void {
    this.arrayData.removeAt(index);
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
