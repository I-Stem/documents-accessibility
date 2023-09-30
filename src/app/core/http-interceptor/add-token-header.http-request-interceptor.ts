import { HttpEvent, HttpHandler, HttpInterceptor, HttpClient, HttpRequest, HttpUserEvent, HttpResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError, BehaviorSubject } from "rxjs";
import { catchError, filter, first, map, mergeMap, switchMap, take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { AngularJWTService } from "../services/angularJWT.service";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable()
export class AddTokenHeaderHttpRequestInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService, private router: Router, private jwtService: AngularJWTService, private storageService: LocalStorageService) { }

    addToken(req: HttpRequest<any>, token: string | null): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: '' + token } });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
        if (!request.url.endsWith('/auth/login/')
            && !request.url.endsWith("/auth/verify/")
            && !request.url.endsWith("/auth/refresh/")
            && !request.url.endsWith("/auth/forgot-password/")
            && !request.url.endsWith("/auth/register/")
            && !request.url.includes("/event/approve-or-disapprove-event/")
        ) {
            let tokens = this.authService.getToken();
            let token = tokens?.accessToken;

            if (this.jwtService.isTokenExpired(token, 30)) {
                return this.handle403Error(request, next);
            } else {
                return next.handle(this.addToken(request, token)).pipe(
                    catchError(error => {
                        // this.logoutUser();
                        return throwError(error);
                    })
                )
            }
        } else {
            return next.handle(request).pipe(
                catchError(error => {
                    // this.logoutUser();
                    return throwError(error);
                })
            )
        }
    }

    logoutUser() {
        this.authService.logout().subscribe((result: boolean) => {
            this.router.navigate(['auth']);
        })
    }

    private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                mergeMap((token) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token?.accessToken);
                    return next.handle(this.addToken(request, token?.accessToken));
                }),
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                mergeMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));
        }
    }
}