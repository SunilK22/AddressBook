import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  imports: [MatButtonModule, MatDividerModule, MatIconModule, FormsModule, MatInputModule, CommonModule],
  selector: 'app-testcomp',
  styleUrl: './testcomp.scss',
  templateUrl: './testcomp.html',
})
export class Testcomp {
  _name: string = 'Sunil';

  updateName(event: KeyboardEvent) {
    console.log(this._name);
    this._name = (event.target as HTMLInputElement).value;
  }

  showAlert(){
    alert(this._name);
  }
}
