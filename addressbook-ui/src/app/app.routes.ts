import { Routes } from '@angular/router';
import { ContactComponent } from './components/contact-component/contact-component';
import { NavComponent } from './components/nav-component/nav-component';
import { AddContactComponent } from './components/add-contact-component/add-contact-component';

export const routes: Routes = [
    {
        // default path ie http://localhost:4200
        path: '',
        component: NavComponent,
        title: 'Home Page',
        children: [
            {
                path: 'contact',
                component: ContactComponent,
                title: "Contacts",
            }, {
                path: 'categories',
                component: AddContactComponent,
                title: "Categories",
            },
            {
                path: 'newcontact',
                component: AddContactComponent,
                title: 'Add New Contact',
            },
            {
                path: 'contact/view/:id',
                component: AddContactComponent,
                title: 'View Contact',
            }
        ]
    }


];
