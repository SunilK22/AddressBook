import { Component, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PersonalInfoComponent } from '../personal-info-component/personal-info-component';
import { MatIconModule } from '@angular/material/icon';
import { ChildTableComponent } from '../child-table-component/child-table-component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContactService } from '../../service/contact';
import { childTable, completeContact } from '../../model/contactmodel';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [MatCardModule, MatButtonModule, PersonalInfoComponent,
    MatIconModule, ChildTableComponent, MatExpansionModule, MatFormFieldModule, FormsModule],
  selector: 'app-add-new-contact-component',
  styleUrl: './add-new-contact-component.scss',
  templateUrl: './add-new-contact-component.html',
})
export class AddNewContactComponent {
  readonly panelOpenState = signal(false);
  phones: childTable[] = [];
  emails: childTable[] = [];
  socialMedia: childTable[] = [];

  @ViewChild(PersonalInfoComponent) private personalInfo?: PersonalInfoComponent;

  constructor(private service: ContactService) { }

  SaveContact(): void {
    const form = this.personalInfo?.personalInfoForm;
    if (!form) {
      return;
    }

    const { title, firstname, middlename, lastname, gender, dob, category } = form.getRawValue();
    if (!firstname || !lastname || title === null || gender === null || dob === null || category === null) {
      return;
    }

    const data: completeContact = {
      firstName: firstname.trim(),
      middleName: middlename?.trim() || null,
      lastName: lastname.trim(),
      dateOfBirth: this.formatDate(dob),
      title,
      gender,
      contactCategory: category,
      phones: this.phones.map(({ type, value }) => ({
        phoneNumber: value,
        contactMethodType: type
      })),
      emails: this.emails.map(({ type, value }) => ({
        emailAddress: value,
        contactMethodType: type
      })),
      socialMedias: this.socialMedia.map(({ type, value }) => ({
        socialMediaAddress: value,
        socialMediaType: type
      }))
    };

    this.service.CreateContact(data).subscribe({
      next: () => {
        form.reset();
        this.phones = [];
        this.emails = [];
        this.socialMedia = [];
        alert('Contact saved successfully.');
      },
      error: (error: unknown) => {

        console.error('Error saving contact:', error);
      }
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
