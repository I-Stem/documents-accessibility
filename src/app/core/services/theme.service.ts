import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { promise } from "protractor";
import { Observable, of } from "rxjs";
import { catchError, concatMap, map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
    constructor(private http: HttpClient) { }
    
    getAllTheme() {
        return this.http.get<any>(`${environment.baseUrl}/themes/`)
    }

    getThemeById(id: string) {
        return this.http.get<any>(`${environment.baseUrl}/themes/${id}`)
    }
} 