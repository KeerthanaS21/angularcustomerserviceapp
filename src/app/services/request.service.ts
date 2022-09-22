import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestModel } from '../models/requestModel';
@Injectable({
  providedIn: 'root'
})
export class RequestService {

    requestUrl = "https://localhost:7186/api/ServiceRequest";

    constructor(private http: HttpClient) { }

    createNewRequest(requestModel : RequestModel):Observable<any>{
        return this.http.post<any>(this.requestUrl + '/CreateServiceRequest', requestModel, {
            headers: new HttpHeaders({
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),          
            'Content-Type': 'application/json' 
            })
        })
    }

    getRequests(userName : string):Observable<any>{
        let queryParams = new HttpParams()
        queryParams = queryParams.append('userName', userName)
        return this.http.get<any>(this.requestUrl + '/GetAllRequest', 
        {
            params : queryParams,
            headers: new HttpHeaders({
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),          
            'Content-Type': 'application/json' 
            })
        })
    }

    assignRequest(request : RequestModel):Observable<any>{
        return this.http.put<any>(this.requestUrl + '/AssignRequest', request, {
            headers: new HttpHeaders({
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),          
            'Content-Type': 'application/json' 
            })
        })
    }

    addComment(request : RequestModel):Observable<any>{
        return this.http.put<any>(this.requestUrl + '/AddComment', request, {
            headers: new HttpHeaders({
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),          
            'Content-Type': 'application/json' 
            })
        })
    }
    
}