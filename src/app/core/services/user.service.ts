import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounce, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  //userlist: any[] = [];
 // validateuser: boolean = false;

  login():Observable<any[]> {
   return    this.http
      .get<any[]>(environment.apiURL + '/users')
  }

  register(data:any):Observable<any>{
   return this.http.post<any>(environment.apiURL+'/users',data);
  }
  getalluser():Observable<any>{
  return  this.http
    .get<any>(environment.apiURL + '/users')   }
}
