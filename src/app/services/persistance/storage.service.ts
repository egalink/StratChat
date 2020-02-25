import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    set (key:string, data:any = {}) {

        try {
            localStorage.setItem(key, this.encode(data));
            return data;
        } catch (error) {
            console.error('Error persistiendo datos en "localStorage":', error);
            return null;
        }
    }

    get (key:string) {

        try {
            return this.decode(localStorage.getItem(key));
        } catch (error) {
            console.error('Error al obtener datos de "localStorage":', error);
            return null;
        }
    }

    private get encode () { return JSON.stringify }
    private get decode () { return JSON.parse }

}
