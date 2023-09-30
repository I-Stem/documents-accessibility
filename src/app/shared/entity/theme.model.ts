import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class Theme {
    baseUrl: string = environment.baseUrl; 
    http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
 
    constructor() { }
    
    name:   string   
    
    getAll() {
        return this.http.get<any>(`${environment.baseUrl}/themes/`)
    }

    getById(theme: any) {
        return this.http.get<any>(`${environment.baseUrl}/themes/` + theme)
    }
};
