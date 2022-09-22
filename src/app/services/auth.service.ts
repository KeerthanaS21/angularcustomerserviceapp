import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from '../models/registerUserModel';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginUser } from '../models/loginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    authUrl = "https://localhost:7276/CustomerServicePortal/api";

    constructor(private http: HttpClient) { }

    login(loginUser : LoginUser):Observable<any>{
      return this.http.post<any>(this.authUrl + '/Login', loginUser);
    }

    register(registerUser : RegisterUser): Observable<any> {
        return this.http.post<any>(this.authUrl + '/Register', registerUser);
    }

    handleError(error: HttpErrorResponse) {
        const err = new Error(error.message); 
        return throwError(() => err);
        //return throwError(error);
    }
}