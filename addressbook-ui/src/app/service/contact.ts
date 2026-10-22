import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { contact, IContact } from '../model/contactmodel';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {

    baseUrl = `${environment.apiUrl}/api/contacts`;

    private http = inject(HttpClient);
    private cachedContacts: Record<number, contact> = {};

    constructor() {

    }

    setContact(contact: contact): void {
        this.cachedContacts[contact.contactID] = contact;
    }

    getContact(id: number): contact | null {
        return this.cachedContacts[id] ?? null;
    }

    clearContact(id: number): void {

        delete this.cachedContacts[id];
    }


    GetAllContacts() {
        return this.http.get<contact[]>(this.baseUrl);
    }

    GetContactById(id: number) {
        return this.http.get<contact>(this.baseUrl + '/' + id);
    }

    CreateContact(_data: IContact) {
        return this.http.post(this.baseUrl, _data);
    }

    UpdateContact(_data: IContact & { contactID: number }) {
        return this.http.put(this.baseUrl + '/' + _data.contactID, _data);
    }

    DeleteContact(id: number) {
        return this.http.delete(this.baseUrl + '/' + id);
    }
}
