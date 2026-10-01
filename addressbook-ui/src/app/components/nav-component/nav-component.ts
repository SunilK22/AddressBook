import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, CommonModule, RouterOutlet],
  selector: 'app-nav-component',
  styleUrl: './nav-component.scss',
  templateUrl: './nav-component.html',
})
export class NavComponent {

  opened = signal(false);

  constructor(){}


  openSidenav() {
    let isOpened = this.opened();
    this.opened.set(!isOpened);
    
  }
}
