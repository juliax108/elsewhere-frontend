import { Component, OnInit } from '@angular/core';

import { Wishlist } from '../wishlist';

@Component({
  selector: 'app-wishlist-list',
  imports: [],
  templateUrl: './wishlist-list.html',
  styleUrl: './wishlist-list.css',
})
export class WishlistList implements OnInit{
  wishlist: any[] = [];
  weatherData: any = {};

  constructor(private wishlistService: Wishlist) {}

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe((data: any) => {
      console.log('Daten vom Backend:', data);
      this.wishlist = data;

      data.forEach((item: any) => {
        console.log('Rufe Wetter ab für:', item.city);
        this.wishlistService.getWeather(item.city).subscribe((weather: any) => {
          this.weatherData[item.city] = weather;
        });
      });
    });

    this.wishlistService.wishlistItemCreated.subscribe(() => {
      this.wishlistService.getWishlist().subscribe((data: any) => {
        this.wishlist = data;
      });
    })
  }

  onDelete(id: string) {
    this.wishlistService.deleteWishlistItem(id).subscribe(() => {
      this.wishlistService.getWishlist().subscribe((data: any) => {
        this.wishlist = data;
      });
    });
  }

  onEdit(wishlist: any) {
    this.wishlistService.wishlistItemToEdit.next(wishlist);
  }

}
