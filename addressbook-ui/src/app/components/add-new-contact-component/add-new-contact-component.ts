import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PersonalInfoComponent } from '../personal-info-component/personal-info-component';
import { MatIconModule } from '@angular/material/icon';
import { NavComponent } from '../nav-component/nav-component';
import { ChildTableComponent } from '../child-table-component/child-table-component';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  imports: [MatCardModule, MatButtonModule, PersonalInfoComponent,
    MatIconModule, NavComponent, ChildTableComponent, MatExpansionModule],
  selector: 'app-add-new-contact-component',
  styleUrl: './add-new-contact-component.scss',
  templateUrl: './add-new-contact-component.html',
})
export class AddNewContactComponent {
  readonly panelOpenState = signal(false);
}

