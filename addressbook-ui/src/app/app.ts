import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NavComponent } from './components/nav-component/nav-component';
// import { ContactComponent } from './components/contact-component/contact-component';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('addressbook-ui');
}
