import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CATALOG } from 'src/app/catalogs/api.catalog';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    
    api:string = API_CATALOG.httpEndpoint;

    constructor (public http: HttpClient) { }

    async all () {
        //
        try {
            return await this.userList.toPromise();
        } catch (error) {
            console.log("Ocurrió un error al consumir el servicio:");
            console.log(error);
            return [];
        }
    }

    get userList () {
        //
        let headers:HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json",
        });

        return this.http.get(this.api + "/users/getTotalUsers.json", {
            headers: headers
        });
    }

}
