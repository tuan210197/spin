import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private apiUrl = '/api/project'; // Replace with your API URL

  constructor(private http: HttpClient, private router: Router) { }

}
