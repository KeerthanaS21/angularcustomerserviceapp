import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { RegisterUser } from '../models/registerUserModel';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/loginUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    adminUrl = "https://localhost:7251/api/Profile";

    constructor(private http: HttpClient) { }


    getProfiles(userName : string):Observable<any>{
        let queryParams = new HttpParams()
        queryParams = queryParams.append('userName', userName)
      return this.http.get<any>(this.adminUrl + '/GetProfiles',{ 
        params : queryParams,        
        headers: new HttpHeaders({
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),          
        'Content-Type': 'application/json' 
            })
        })
    }

    getContacts(userName:string): Observable<any> {
        let queryParams = new HttpParams()
        queryParams = queryParams.append('userName', userName)
        return this.http.get<any>(this.adminUrl + '/GetContacts',{  
            params : queryParams,          
            headers: new HttpHeaders({
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),          
            'Content-Type': 'application/json' 
            })
        })
    }
}