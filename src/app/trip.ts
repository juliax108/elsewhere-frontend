import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Trip {
  constructor(private http: HttpClient) {}

  getTrips() {
    return this.http.get('http://localhost:3000/trips');
  }
}

