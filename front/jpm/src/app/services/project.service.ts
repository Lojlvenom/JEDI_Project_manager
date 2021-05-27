import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(`${baseURL}/show`);
  }

  getProject(id: any): Observable<any> {
    return this.http.get(`${baseURL}/getProject/${id}`);
  }

  createProject(data: any): Observable<any> {
    return this.http.post(`${baseURL}/create`, data);
  }

  modifyProject(modify_id: any, data: any): Observable<any> {
    return this.http.post(`${baseURL}/modify/${modify_id}`, data);
  }


  deleteProject(delete_id: string): Observable<any> {
    return this.http.get(`${baseURL}/delete/${delete_id}`);
  }
}
