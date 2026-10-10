import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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


@Component({
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  selector: 'app-contact-component',
  styleUrl: './contact-component.scss',
  templateUrl: './contact-component.html',
})

export class ContactComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'phones', 'emails', 'socialmedias', 'actions']
  contacts = new MatTableDataSource<contact>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ContactService) {

  }

  ngOnInit(): void {
    this.LoadContacts();
  }

  ngAfterViewInit(): void {
    this.contacts.paginator = this.paginator;
    this.contacts.sort = this.sort;
  }

  contactList: contact[] = [];

  // LoadContacts() {
  //   this.service.GetAll().subscribe({
  //     next: data => {
  //       this.contacts = data;
  //     },
  //     error: err => {
  //       console.error('Failed to load contacts', err);
  //     }
  //   })
  // }

  LoadContacts() {
    this.service.GetAll().subscribe(item => {
      this.contactList = item;
      this.contacts.data = this.contactList;

      this.contacts = new MatTableDataSource(this.contactList);
    })
  }

}
