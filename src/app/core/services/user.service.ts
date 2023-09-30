import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from 'src/app/shared/entity/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }
    private _currentUser: IUser;
    audio = new Audio();

    getUserDetail(user?: string): Observable<IUser | null> {
        return this.http.get<any>(`${environment.baseUrl}/users/${user}`)
            .pipe(
                map((user: any) => {
                    this._currentUser = Object.assign({}, user.data);
                    return this._currentUser;
                }),
                catchError((err) => {
                    console.log(err);
                    return of(null);
                })
            );
    }

    getAll() {
        return this.http.get<any>(`${environment.baseUrl}/users`)
    }

    updateDetail(params:any) {
        return this.http.put<any>(`${environment.baseUrl}/users`, params)
    }
    
    getUserByFilter(filter: any) {
        return this.http.post<any>(`${environment.baseUrl}/users/get-user-by-filter`, filter)
    }

    getUserNotificationSettings(userId: string) {
        return this.http.get<any>(`${environment.baseUrl}/user-notification/${userId}`)
    }

    async updateNotificationSettings(userId: string, type: string, value: boolean) {
        try {
            let result: any
            switch(type){
                case 'GROUP_ANNOUNCEMENT':
                    result = await this.http.put(`${environment.baseUrl}/user-notification/${userId}`,
                    { GROUP_ANNOUNCEMENT: value }).toPromise();   
                    if(result.status_code === 200) {
                      this.audio.src = "assets/notification.mp3";
                      this.audio.load();
                      this.audio.play();
                    }
                    return of(true);

                case 'GROUP_DISCUSSION': 
                    result = await this.http.put(`${environment.baseUrl}/user-notification/${userId}`,
                    { GROUP_DISCUSSION: value }).toPromise();   
                    if(result.status_code === 200) {
                    this.audio.src = "assets/notification.mp3";
                    this.audio.load();
                    this.audio.play();
                    }
                    return of(true);

                case 'PROJECT_ANNOUNCEMENT':
                    result = await this.http.put(`${environment.baseUrl}/user-notification/${userId}`,
                    { PROJECT_ANNOUNCEMENT: value }).toPromise();   
                    if(result.status_code === 200) {
                    this.audio.src = "assets/notification.mp3";
                    this.audio.load();
                    this.audio.play();
                    }
                    return of(true);

                case 'PROJECT_DISCUSSION':
                    result = await this.http.put(`${environment.baseUrl}/user-notification/${userId}`,
                    { PROJECT_DISCUSSION: value }).toPromise();   
                    if(result.status_code === 200) {
                    this.audio.src = "assets/notification.mp3";
                    this.audio.load();
                    this.audio.play();
                    }
                    return of(true);

                case 'PERSONAL_CHATS':
                    result = await this.http.put(`${environment.baseUrl}/user-notification/${userId}`,
                    { PERSONAL_CHATS: value }).toPromise();   
                    if(result.status_code === 200) {
                    this.audio.src = "assets/notification.mp3";
                    this.audio.load();
                    this.audio.play();
                    }
                    return of(true);

                case 'POST_LIKES_AND_COMMENTS':
                    result = await this.http.put(`${environment.baseUrl}/user-notification/${userId}`,
                    { POST_LIKES_AND_COMMENTS: value }).toPromise();   
                    if(result.status_code === 200) {
                    this.audio.src = "assets/notification.mp3";
                    this.audio.load();
                    this.audio.play();
                    }
                    return of(true);

                default: 
                    return of(null);
            } 
        } catch (error) {
            console.log("Error in post deletion", error);
            return of(null);
        }
    }
    
}
