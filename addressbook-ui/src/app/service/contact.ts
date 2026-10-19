import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { contact, IContact } from '../model/contactmodel';

@Injectable({ providedIn: 'root' })
export class ContactService {

    baseurl = 'http://localhost:5207/api/contacts';

    private http = inject(HttpClient);
    private cachedContacts: Record<number, contact> = {};

    constructor() {

    }

    setContact(contact: contact ): void {
        this.cachedContacts[contact.contactID] = contact;
    }

    getContact(id: number): contact | null {
        return this.cachedContacts[id] ?? null;
    }

    clearContact(id?: number): void {
        if (id === undefined) {
            this.cachedContacts = {};
            return;
        }
        delete this.cachedContacts[id];
    }


    GetAllContacts() {
        return this.http.get<contact[]>(this.baseurl);
    }

    GetContactById(id: number) {
        return this.http.get<contact>(this.baseurl + '/' + id);
    }

    CreateContact(_data: IContact) {
        return this.http.post(this.baseurl, _data);
    }

    UpdateContact(_data: contact & { contactID: number }) {
        return this.http.put(this.baseurl + '/' + _data.contactID, _data);
    }

    DeleteContact(id: number) {
        return this.http.delete(this.baseurl + '/' + id);
    }
}
