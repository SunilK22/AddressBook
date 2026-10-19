import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ISelectOpt } from '../../model/contactmodel';
import { CommonModule } from '@angular/common';


@Component({
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatRadioModule, MatDatepickerModule, ReactiveFormsModule, CommonModule],
  selector: 'app-personal-info-component',
  styleUrl: './personal-info-component.scss',
  templateUrl: './personal-info-component.html',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PersonalInfoComponent {


  private _personalDetails!: FormGroup;
  @Input() set personalDetails(value: FormGroup) {
    this._personalDetails = value;
  }

  get personalDetails(): FormGroup {
    return this._personalDetails;
  }

  titles: ISelectOpt[] = [
    { value: 0, viewValue: 'Mr' },
    { value: 1, viewValue: 'Mrs' },
    { value: 2, viewValue: 'Ms' },
    { value: 3, viewValue: 'Mx' },
  ];

  categories: ISelectOpt[] = [
    { value: 0, viewValue: 'Business' },
    { value: 1, viewValue: 'Family' },
    { value: 2, viewValue: 'Other' }
  ]
}
