import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateProfile } from '../models/updateProfile';
import { UpdateContact } from '../models/updateContact';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    profileUrl = "https://localhost:7251/api/Profile";

    updateProfile : UpdateProfile = {
        userName: '',
        firstName: '',
        lastName: '',
        dob: new Date(),
        idType: '',
        idValue : ''
      }

    constructor(private http: HttpClient) { }

    addProfileDetails(updatedProfile : UpdateProfile):Observable<any>{
        console.log('inside profile service')
        return this.http.post<any>(this.profileUrl + '/AddProfile', updatedProfile, {
            headers: new HttpHeaders({
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),          
            'Content-Type': 'application/json' 
            })
        })
    }

    addContactDetails(updateContact : UpdateContact):Observable<any>{
        return this.http.post<any>(this.profileUrl + '/AddContact', updateContact, {
            headers: new HttpHeaders({
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),          
            'Content-Type': 'application/json' 
            })
        })
    }

    getProfiles(userName : string):Observable<any>{
        let queryParams = new HttpParams()
        queryParams = queryParams.append('userName', userName)
        return this.http.get<any>(this.profileUrl + '/GetProfiles',{
          params : queryParams,     
          headers: new HttpHeaders({
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),          
          'Content-Type': 'application/json' 
              })
          })
      }
  
      getContacts(userName : string): Observable<any> {
        let queryParams = new HttpParams()
        queryParams = queryParams.append('userName', userName)
          return this.http.get<any>(this.profileUrl + '/GetContacts',{ 
              params : queryParams,   
              headers: new HttpHeaders({
              'Authorization': 'Bearer ' + window.sessionStorage.getItem("token"),          
              'Content-Type': 'application/json' 
              })
          })
      }
    
}