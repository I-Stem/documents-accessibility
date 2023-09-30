import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Country } from "./country.model"

export class Region {
    baseUrl: string = environment.baseUrl;
    http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));

    constructor() { }
    name: string
    country: Country

    getAll() {
        return this.http.get<any>(`${environment.baseUrl}/regions/`)
    }

    getById(region: any) {
        return this.http.get<any>(`${environment.baseUrl}/regions/` + region)
    }
};
