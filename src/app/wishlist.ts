import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Wishlist {
  constructor(private http: HttpClient) {}
  wishlistItemCreated = new Subject<void>();
  wishlistItemToEdit = new Subject<any>();

  getWishlist() {
    return this.http.get('http://localhost:3000/wishlist');
  }

  createWishlistItem(wishlistItemData: any) {
    return this.http.post('http://localhost:3000/wishlist', wishlistItemData);
  }
  
  updateWishlistItem(id: string, wishlistItemData: any) {
    return this.http.put(`http://localhost:3000/wishlist/${id}`, wishlistItemData);
  }

  deleteWishlistItem(id: string) {
  return this.http.delete(`http://localhost:3000/wishlist/${id}`);
  }

  getWeather(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80db9d2f6e51bcacb9b7c5987c38996b&units=metric`);
  }
  
}
