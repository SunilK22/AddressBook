import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContactService } from '../../service/contact';
import { contact } from '../../model/contactmodel';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  selector: 'app-contact-component',
  styleUrl: './contact-component.scss',
  templateUrl: './contact-component.html',
})

export class ContactComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'phones', 'emails', 'socialmedias', 'actions'];
  contacts = new MatTableDataSource<contact>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private router = inject(Router);
  private contactCache = inject(ContactService);

  constructor(private service: ContactService) {

  }

  ngOnInit(): void {
    this.LoadContacts();
  }

  ngAfterViewInit(): void {
    this.contacts.paginator = this.paginator;
    this.contacts.sort = this.sort;
  }

  LoadContacts() {
    this.service.GetAllContacts().subscribe(item => {
      this.contacts.data = item;
    })
  }

  ViewContact(contact: contact) {
    if (contact.contactID === undefined) {
      return;
    }

    this.contactCache.setContact({ ...contact, contactID: contact.contactID });

    this.router.navigate(['/contact/view', contact.contactID]);
  }
}
