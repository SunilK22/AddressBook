import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { contact } from '../model/contactmodel';

@Service()
export class Contact {

    baseurl = 'http://localhost:3000/contact';

    private http = inject(HttpClient);


    constructor() {

    }

    GetAll() {
        return this.http.get<contact[]>(this.baseurl);
    }

    GetContactById(id: number) {
        return this.http.get<contact>(this.baseurl + '/' + id);
    }

    CreateContact(_data: contact) {
        return this.http.post(this.baseurl, _data);
    }

    UpdateContact(_data: contact) {
        return this.http.put(this.baseurl + '/' + _data.id, _data);
    }

    DeleteContact(id: number) {
        return this.http.delete(this.baseurl + '/' + id);
    }
}
