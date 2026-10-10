import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms'; 


@Component({
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, 
    MatListModule, CommonModule, MatFormFieldModule, FormsModule, RouterOutlet],
  selector: 'app-nav-component',
  styleUrl: './nav-component.scss',
  templateUrl: './nav-component.html',
})
export class NavComponent implements OnInit {

  private router = inject(Router);

  opened = signal(false);

  isContactPage = signal(this.router.url === '/contact');

  searchQuery: string = '';


  constructor() {

  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isContactPage.set(event.urlAfterRedirects === '/contact');
      });
  }


  openSidenav() {
    let isOpened = this.opened();
    this.opened.set(!isOpened);

  }


  onSearch() {
    console.log('Searching for:', this.searchQuery);

  }

}
