import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatRadioModule, MatDatepickerModule],
  selector: 'app-personal-info-component',
  styleUrl: './personal-info-component.scss',
  templateUrl: './personal-info-component.html',
  providers: [provideNativeDateAdapter()],

})
export class PersonalInfoComponent { }
