import { Component, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { selectOpt } from '../../model/contactmodel';


@Component({
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatRadioModule, MatDatepickerModule, ReactiveFormsModule],
  selector: 'app-personal-info-component',
  styleUrl: './personal-info-component.scss',
  templateUrl: './personal-info-component.html',
  providers: [provideNativeDateAdapter()],

})
export class PersonalInfoComponent  {

  selectedValue = signal('');

  titles: selectOpt[] = [
    { value: 0, viewValue: 'Mr' },
    { value: 1, viewValue: 'Mrs' },
    { value: 2, viewValue: 'Ms' },
    { value: 3, viewValue: 'Mx' },
  ];

  categories: selectOpt[] = [
    { value: 0, viewValue: 'Business' },
    { value: 1, viewValue: 'Family' },
    { value: 2, viewValue: 'Other' }

  ]

  personalInfoForm = new FormGroup({
    title: new FormControl<number | null>(null, Validators.required),
    firstname: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
    middlename: new FormControl('', Validators.compose([Validators.maxLength(50)])),
    lastname: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
    dob: new FormControl<Date | null>(null, Validators.required),
    age: new FormControl({ value: '', disabled: true }),
    gender: new FormControl<number | null>(null, Validators.required),
    category: new FormControl<number | null>(null, Validators.required)
  })
}
