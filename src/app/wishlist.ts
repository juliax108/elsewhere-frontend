import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  // der Service steht der gesamten Anwendung zur Verfügung
  providedIn: 'root',
})
export class Wishlist {
  constructor(private http: HttpClient) {}

  // informiert andere Komponenten, wenn ein Wunschziel erstellt oder geändert wurde
  wishlistItemCreated = new Subject<void>();

  // übergibt ein Wunschziel an das Formular zum Bearbeiten
  wishlistItemToEdit = new Subject<any>();

  // alle Wunschziele vom Backend abrufen
  getWishlist() {
    return this.http.get('http://localhost:3000/wishlist');
  }

  // neues Wunschziel im Backend speichern
  createWishlistItem(wishlistItemData: any) {
    return this.http.post('http://localhost:3000/wishlist', wishlistItemData);
  }
  
  // vorhandenes Wunschziel aktualisieren
  updateWishlistItem(id: string, wishlistItemData: any) {
    return this.http.put(`http://localhost:3000/wishlist/${id}`, wishlistItemData);
  }

  // Wunschziel anhand seiner ID löschen
  deleteWishlistItem(id: string) {
  return this.http.delete(`http://localhost:3000/wishlist/${id}`);
  }

  // aktuelles Wetter über die OpenWeather-API abrufen
  getWeather(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80db9d2f6e51bcacb9b7c5987c38996b&units=metric`);
  }
  
}
