import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  // der Service steht der gesamten Anwendung zur Verfügung
  // Service übernimmt Kommunikation mit Backend (Verbindung zw Angular und Node.js)
  // -> damit alle HTTP-Anfragen an zentraler Stelle liegen, 
  // Code muss nicht in jeder Komponente wiederholt werden & mehrere Komponenten können denselben Service nutzen
  providedIn: 'root',
})
export class Trip {
  constructor(private http: HttpClient) {}

  // informiert andere Komponenten, wenn eine neue Reise erstellt wurde
  tripCreated = new Subject<void>();

  // übergibt eine ausgewählte Reise an das Formular zum Bearbeiten
  tripToEdit = new Subject<any>();

  // alle Reise vom Backend abrufen
  getTrips() {
    return this.http.get('http://localhost:3000/trips');
  }

  // neue Reise im Backend speichern
  createTrip(tripData: any) {
    return this.http.post('http://localhost:3000/trips', tripData);
  }
  
  // vorhandene Reise anhand ihrer ID aktualisieren
  updateTrip(id: string, tripData: any) {
    return this.http.put(`http://localhost:3000/trips/${id}`, tripData);
  }

  // Reise anhand ihrer ID löschen
  deleteTrip(id: string) {
  return this.http.delete(`http://localhost:3000/trips/${id}`);
  }

  
  
}


