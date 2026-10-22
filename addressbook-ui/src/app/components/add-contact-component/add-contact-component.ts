import { ChangeDetectorRef, Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ContactService } from '../../service/contact';
import { IChildTable, contact, IContact } from '../../model/contactmodel';
import { ChildTableComponent } from '../child-table-component/child-table-component';
import { PersonalInfoComponent } from '../personal-info-component/personal-info-component';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    PersonalInfoComponent,
    ChildTableComponent
  ],
  selector: 'app-add-contact-component',
  styleUrl: './add-contact-component.scss',
  templateUrl: './add-contact-component.html',
})
export class AddContactComponent implements OnInit, OnDestroy {
  panelOpenState = signal(false);

  form!: FormGroup;
  fb!: FormBuilder;
  isViewMode = false;
  contactData!: contact;
  private currentContactId: number | null = null;

  private destroyRef = inject(DestroyRef);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private _fb: FormBuilder, private contactService: ContactService, private cd: ChangeDetectorRef) {
    this.fb = _fb;
  }

  buildForm(contact: contact | null = null): FormGroup {
    let fgroup = this.fb.group({
      personalDetails: this.fb.group({
        title: new FormControl<number | null>(contact?.title ?? null, Validators.required),
        firstname: new FormControl(contact?.firstName, [Validators.required, Validators.maxLength(50)]),
        middlename: new FormControl(contact?.middleName, [Validators.maxLength(50)]),
        lastname: new FormControl(contact?.lastName, [Validators.required, Validators.maxLength(50)]),
        dob: new FormControl<Date | null>(this.parseDate(contact?.dateOfBirth), Validators.required),
        age: new FormControl({ value: '', disabled: true }),
        gender: new FormControl<number | null>(contact?.gender ?? null, Validators.required),
        category: new FormControl<number | null>(contact?.contactCategory ?? null, Validators.required)
      }),
      phones: new FormArray([]),
      emails: new FormArray([]),
      socialMedias: new FormArray([])
    });

    let phones: FormArray = fgroup.get('phones') as FormArray;
    if ((contact?.phones ?? []).length > 0) {
      contact!.phones.forEach((phone, i) => {
        phones.insert(i, new FormGroup({
          type: new FormControl(phone.contactMethodType),
          value: new FormControl(phone.phoneNumber)
        }))
      })
    }
    let emails: FormArray = fgroup.get('emails') as FormArray;
    if ((contact?.emails ?? []).length > 0) {
      contact!.emails.forEach((email, i) => {
        emails.insert(i, new FormGroup({
          type: new FormControl(email.contactMethodType),
          value: new FormControl(email.emailAddress)
        }))
      })
    }

    let socialmedias: FormArray = fgroup.get('socialMedias') as FormArray;
    if ((contact?.socialMedias ?? []).length > 0) {
      contact!.socialMedias.forEach((sm, i) => {
        socialmedias.insert(i, new FormGroup({
          type: new FormControl(sm.socialMediaType),
          value: new FormControl(sm.socialMediaAddress)
        }))
      })
    }

    return fgroup;
  }

  ngOnInit(): void {
    this.form = this.buildForm();
    const contactId = this.route.snapshot.paramMap.get('id');
    this.currentContactId = Number(contactId);
    this.isViewMode = this.router.url.includes('view');

    if (contactId) {
      this.loadContactDetails(Number(contactId));
    }

  }

  ngOnDestroy(): void {
    // if (this.currentContactId !== null) {
    //   this.contactService.clearContact(this.currentContactId);
    // }

  }

  get personalDetails(): FormGroup {
    return this.form.get('personalDetails') as FormGroup;
  }

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  get emails(): FormArray {
    return this.form.get('emails') as FormArray;
  }

  get socialMedias(): FormArray {
    return this.form.get('socialMedias') as FormArray;
  }

  loadContactDetails(id: number): void {

    const contactData = this.contactService.getContact(id);
    this.form = this.buildForm(contactData);
    this.cd.markForCheck();

    if (this.isViewMode) {
      this.form.disable();
    }
  }

  private parseDate(date: string | undefined): Date | null {
    if (!date) {
      return null;
    }

    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  saveContact(): void {
    if (this.form.invalid) {
      return;
    }

    let { personalDetails, phones, emails, socialMedias } = this.form.getRawValue();

    if (!personalDetails.firstname || !personalDetails.lastname || !personalDetails.dob
      || personalDetails.title === null || personalDetails.gender === null || personalDetails.category === null) {
      return;
    }

    const data: IContact = {
      firstName: personalDetails.firstname.trim(),
      middleName: personalDetails.middlename?.trim() || null,
      lastName: personalDetails.lastname.trim(),
      dateOfBirth: this.formatDate(personalDetails.dob),
      title: personalDetails.title,
      gender: personalDetails.gender,
      contactCategory: personalDetails.category,
      phones: phones.map((row: IChildTable) => ({
        phoneNumber: row.value,
        contactMethodType: row.type
      })),
      emails: emails.map((row: IChildTable) => ({
        emailAddress: row.value,
        contactMethodType: row.type
      })),
      socialMedias: socialMedias.map((row: IChildTable) => ({
        socialMediaAddress: row.value,
        socialMediaType: row.type
      }))
    };

    if (this.currentContactId != null) {
      this.contactService.UpdateContact({ ...data, contactID: this.currentContactId })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.form.reset();
            this.phones.clear();
            this.emails.clear();
            this.socialMedias.clear();
            alert('Contact updated successfully.');
          },
          error: (error: unknown) => {
            console.error('Error updating contact:', error);
          }
        });
    } else {
      this.contactService.CreateContact(data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.form.reset();
            this.phones.clear();
            this.emails.clear();
            this.socialMedias.clear();
            alert('Contact saved successfully.');
          },
          error: (error: unknown) => {
            console.error('Error saving contact:', error);
          }
        });
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
