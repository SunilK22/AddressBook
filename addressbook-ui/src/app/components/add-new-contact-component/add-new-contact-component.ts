import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PersonalInfoComponent } from '../personal-info-component/personal-info-component';
import { MatIconModule } from '@angular/material/icon';
import { ChildTableComponent } from '../child-table-component/child-table-component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  imports: [MatCardModule, MatButtonModule, PersonalInfoComponent,
    MatIconModule, ChildTableComponent, MatExpansionModule, MatFormFieldModule],
  selector: 'app-add-new-contact-component',
  styleUrl: './add-new-contact-component.scss',
  templateUrl: './add-new-contact-component.html',
})
export class AddNewContactComponent {
  readonly panelOpenState = signal(false);
}

