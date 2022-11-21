import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}
  getalluser(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiURL + '/users');
  }

 add(data: any): Observable<any> {
    return this.http.post<any>(environment.apiURL + '/users', data);
  }
  getuserbyid(id: any): Observable<any> {
    return this.http.get<any>(environment.apiURL + '/users' + '/' + id);
  }
  updateUser(data: any,id:any):Observable<any>{
    return this.http.put<any>(environment.apiURL + '/users' + '/' + id, data);
  }
}
