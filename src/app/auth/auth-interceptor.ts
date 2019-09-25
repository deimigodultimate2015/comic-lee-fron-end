import { TokenStorageService } from './token-storage.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const TOKEN_HEADER_KEY = 'Authorization';
const ROLE_HEADER_KEY = 'sol_role';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private token: TokenStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            let role = '';

            if (this.token.getAuthorities()[0] === 'ROLE_USER') {
                role = 'USER';
            } else if (this.token.getAuthorities()[0] === 'ROLE_UPLOADER') {
                role = 'UPLOADER';
            }

            const headers = new HttpHeaders({
                'Authorization':  'Bearer ' + token,
                'sol_role': role
              });

            authReq = req.clone({headers});
        }
        return next.handle(authReq);
    }

}

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
