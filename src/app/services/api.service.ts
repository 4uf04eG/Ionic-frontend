import {Injectable} from '@angular/core';
import {ApiInterface} from './api-interface';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Coach} from '../models/coach';
import {QueryList} from "../models/query-list";
import {Dance} from "../models/dance";
import {User} from "../models/user";
import {ApiResponse} from "../models/api-response";
import {Participant} from "../models/participant";
import {Group} from "../models/group";
import {Token} from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements ApiInterface {

  constructor(private http: HttpClient) {
  }

  static readonly baseUrl = 'http://localhost:4000';

  getDances(): Observable<any> {
    return this.getRequest<Dance>('/api/dance');
  }

  getCoaches(): Observable<QueryList<Coach>> {
    return this.getRequest<Coach>('/api/coach');
  }

  getGroups(): Observable<QueryList<Group>> {
    return this.getRequest<Group>('/api/group');
  }

  getParticipants(): Observable<QueryList<Participant>> {
    return this.getRequest<Participant>('/api/participant');
  }

  register(user: User): Observable<ApiResponse> {
    return this.postRequest<ApiResponse>('/auth/register', user);
  }

  signIn(login: string, password: string): Observable<Token> {
    return this.postRequest<Token>('/auth/sign_in', {'login': login, 'password': password});
  }

  signOut(): Observable<ApiResponse> {
    return this.deleteRequest<ApiResponse>('/auth/sign_out');
  }

  private getRequest<T>(url: string) {
    return this.http.get<QueryList<T>>(ApiService.baseUrl + url);
  }

  private postRequest<T>(url: string, data: any) {
    return this.http.post<T>(ApiService.baseUrl + url, data);
  }

  private deleteRequest<T>(url: string) {
    return this.http.delete<T>(url);
  }
}
