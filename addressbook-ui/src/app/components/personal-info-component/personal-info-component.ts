import { Component, inject, OnInit, signal } from '@angular/core';
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
    { value: 'mr', viewValue: 'Mr' },
    { value: 'ms', viewValue: 'Ms' },
    { value: 'mx', viewValue: 'Mx' },
  ];

  categories: selectOpt[] = [
    { value: 'bussiness', viewValue: "Business" },
    { value: 'family', viewValue: "Family" },
    { value: 'other', viewValue: "Other" }

  ]

  constructor() { }

  
  personalInfoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])),
    middlename: new FormControl('', Validators.compose([Validators.minLength(4), Validators.maxLength(50)])),
    lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])),
    dob: new FormControl('', Validators.compose([Validators.required])),
    age: new FormControl({ value: '', disabled: true }),
    gender: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  })

 
  saveContact() {

  }
}
