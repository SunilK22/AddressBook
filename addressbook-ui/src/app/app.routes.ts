import { Routes } from '@angular/router';
import { ContactComponent } from './components/contact-component/contact-component';
import { Testcomp } from './components/testcomp/testcomp';
import { App } from './app';
import { NavComponent } from './components/nav-component/nav-component';
import { PersonalInfoComponent } from './components/personal-info-component/personal-info-component';
import { AddNewContactComponent } from './components/add-new-contact-component/add-new-contact-component';

export const routes: Routes = [
    {
        // default path ie http://localhost:4200
        path: '',
        component: NavComponent,
        title: 'Home Page',
        children: [{
            path: 'contact',
            component: ContactComponent,
            title: "Contacts",
        }, {
            path: 'addcontact',
            component: ContactComponent,
            title: "Add Contact",
        }, {
            path: 'categories',
            component: ContactComponent,
            title: "Categories",
        }]
    },
    {
        path: 'newcontact',
        component: AddNewContactComponent,
        title: 'Add New Contact',
    }


];
