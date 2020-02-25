import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../persistance/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

    api:string = "http://127.0.0.1:3333/api";
    key:string = 'session';

    constructor (
        public http: HttpClient,
        public storage: StorageService
    ) {
        //
    }

    async request () {
        //
        let userdata:any = this.signedup();
        if (userdata && userdata.hasOwnProperty('token') === true) {
            return userdata;
        }

        try {
            userdata = await this.userdata.toPromise();
            this.persist(userdata);
            return userdata;
        } catch (error) {
            console.log("Hubo un problema al consumir servicio de registro de usuario:");
            console.log(error);
            return null;
        }
    }

    get userdata () {
        //
        let headers:HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json",
        });

        return this.http.get(this.api + "/users/signup.json", {
            headers: headers
        });
    }

    persist (data:any = {}) {
        //
        return this.storage.set(this.key, data);
    }

    signedup () {
        //
        return this.storage.get(this.key);
    }
}
