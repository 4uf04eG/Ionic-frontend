import {Injectable} from '@angular/core';
import {ApiInterface} from './api-interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coach} from '../models/coach';
import {QueryList} from "../models/query-list";
import {Dance} from "../models/dance";
import {User} from "../models/user";
import {ApiResponse} from "../models/api-response";
import {Participant} from "../models/participant";
import {Group} from "../models/group";
import {Token} from "../models/token";
import {PreferencesService} from "./preferences.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements ApiInterface {
  static readonly baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient, private preferences: PreferencesService) {
  }

  getDances(): Observable<QueryList<Dance>> {
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

  updateCoach(coach: Coach): Observable<ApiResponse> {
    return this.patchRequest<ApiResponse>(`/api/coach/${coach.id}`,
      {id: coach.id, coach: coach});
  }

  updateDance(dance: Dance): Observable<ApiResponse> {
    return this.patchRequest<ApiResponse>(`/api/dance/${dance.id}`,
      {id: dance.id, dance: dance});
  }

  updateGroup(group: Group): Observable<ApiResponse> {
    return this.patchRequest<ApiResponse>(`/api/group/${group.id}`,
      {id: group.id, group: group});
  }

  updateParticipant(participant: Participant): Observable<ApiResponse> {
    return this.patchRequest<ApiResponse>(`/api/participant/${participant.id}`,
      {id: participant.id, participant: participant});
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.patchRequest<ApiResponse>(`/api/user/${user.login}`,
      {login: user.login, user: user});
  }

  register(user: User): Observable<Token> {
    return this.postRequest<Token>('/auth/register',
      {'user': user});
  }

  signIn(login: string, password: string): Observable<Token> {
    return this.postRequest<Token>('/auth/sign_in',
      {'login': login, 'password': password});
  }

  signOut(): Observable<ApiResponse> {
    return this.deleteRequest<ApiResponse>('/auth/sign_out');
  }

  updateToken(): Observable<Token> {
    return this.postRequest<Token>('/auth/update_token', {});
  }

  getCurrentUser(): Observable<User> {
    return this.getSingleRequest<User>('/auth/current_user');
  }

  private getRequest<T>(url: string) {
    return this.http.get<QueryList<T>>(ApiService.baseUrl + url, this.createBasicHeader());
  }

  private getSingleRequest<T>(url: string) {
    return this.http.get<T>(ApiService.baseUrl + url, this.createBasicHeader());
  }

  private postRequest<T>(url: string, data: any) {
    return this.http.post<T>(ApiService.baseUrl + url, data, this.createBasicHeader());
  }

  private patchRequest<T>(url: string, data: any) {
    return this.http.patch<T>(ApiService.baseUrl + url, data, this.createBasicHeader());
  }

  private deleteRequest<T>(url: string) {
    return this.http.delete<T>(url, this.createBasicHeader());
  }

  private createBasicHeader() {
    return {
      headers: {
        'Authorization': 'Bearer ' + this.preferences.token
      }
    };
  }
}
