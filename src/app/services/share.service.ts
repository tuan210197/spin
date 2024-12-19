import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Winner } from '../model/winner';
import { Four } from '../model/four';


@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private apiUrl = '/api'; // Replace with your API URL

  constructor(private http: HttpClient, private router: Router) { }


  getSpecial(): Observable<Winner> {
    return this.http.get<Winner>(this.apiUrl + '/special/get');
  }

  getFirst(): Observable<Winner> {
    return this.http.get<Winner>(this.apiUrl + '/first/get');
  }
  getSecond(): Observable<Winner> {
    return this.http.get<Winner>(this.apiUrl + '/second/get');
  }
  getThird(): Observable<Winner> {
    return this.http.get<Winner>(this.apiUrl + '/third/get');
  }
  getFourth(): Observable<Winner> {
    return this.http.get<Winner>(this.apiUrl + '/four/get');
  }
  getRandom(): Observable<Winner> {
    return this.http.get<Winner>(this.apiUrl + '/user/random');
  }
  chooseCon(num : number) :Observable<Winner>{
    return this.http.get<Winner>(this.apiUrl + '/congra/get/' + num);
  }

  getNumberChoosen(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/congra/get-all');
  }

  getListFourA(four: Four): Observable<Four[]> {
    return this.http.post<Four[]>(this.apiUrl + '/four/get-list' , four);
  }
  getFourA() {
    return this.http.get(this.apiUrl + '/four/get-4a');
  }
}
