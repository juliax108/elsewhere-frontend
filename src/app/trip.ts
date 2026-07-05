import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Trip {
  constructor(private http: HttpClient) {}
  tripCreated = new Subject<void>();
  tripToEdit = new Subject<any>();

  getTrips() {
    return this.http.get('http://localhost:3000/trips');
  }

  createTrip(tripData: any) {
    return this.http.post('http://localhost:3000/trips', tripData);
  }
  
  updateTrip(id: string, tripData: any) {
    return this.http.put(`http://localhost:3000/trips/${id}`, tripData);
  }

  deleteTrip(id: string) {
  return this.http.delete(`http://localhost:3000/trips/${id}`);
  }

  
  
}


