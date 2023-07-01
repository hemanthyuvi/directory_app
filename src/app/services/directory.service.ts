import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterModel, contactModel, loginModel, resetModel} from './../models/directory-models'
import { Observable } from 'rxjs';
import { EndPoints } from '../models/endPoints';
import { catchError } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
urlEndpoint: string = "http://localhost:3000"  

constructor(private http: HttpClient) { }

saveUserData(user:RegisterModel):Observable<RegisterModel>{
  return this.http.post<RegisterModel>(`${this.urlEndpoint}/${EndPoints.register}`,user);
}

validateUser(loginData: loginModel):Observable<loginModel>{
  return this.http.post<loginModel>(`${this.urlEndpoint}/${EndPoints.login}`, loginData);
}

getUsersList(userId:string):Observable<RegisterModel[]>{
  return this.http.get<RegisterModel[]>(`${this.urlEndpoint}/${EndPoints.usersList}/${userId}`);
}

resetPassword(payload:resetModel): Observable<resetModel>{
  return this.http.put<resetModel>(`${this.urlEndpoint}/${EndPoints.resetPassword}`, payload);
}

getToken(){
  return localStorage.getItem('token');
}

removeToken(){
  return localStorage.removeItem('token');
}

getRefreshToken(){
  return localStorage.getItem("refreshToken");
}

removeRefreshToken(){
  return localStorage.removeItem('refreshToken');
}

saveContactData(contactData: any):Observable<any>{
  return this.http.post<any>(`${this.urlEndpoint}/${EndPoints.saveContact}`, contactData);
}

refreshToken(token: string) {
  return this.http.post(`${this.urlEndpoint}/${EndPoints.refreshToken}`, {
    refreshToken: token
  });
}

decodeToken(token:string){
  return jwt_decode(token);
}

}
