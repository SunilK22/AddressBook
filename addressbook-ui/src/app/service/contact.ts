import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { completeContact, contact } from '../model/contactmodel';

@Injectable({ providedIn: 'root' })
export class ContactService {

    baseurl = 'http://localhost:5207/api/contacts';

    private http = inject(HttpClient);


    constructor() {

    }

    GetAllContacts() {
        return this.http.get<completeContact[]>(this.baseurl);
    }

    GetContactById(id: number) {
        return this.http.get<completeContact>(this.baseurl + '/' + id);
    }

    CreateContact(_data: completeContact) {
        return this.http.post(this.baseurl, _data);
    }

    UpdateContact(_data: contact) {
        return this.http.put(this.baseurl + '/' + _data.contactID, _data);
    }

    DeleteContact(id: number) {
        return this.http.delete(this.baseurl + '/' + id);
    }
}
