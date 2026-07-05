import { Component, OnInit } from '@angular/core';

import { Wishlist } from '../wishlist';

@Component({
  selector: 'app-wishlist-list',
  imports: [],
  templateUrl: './wishlist-list.html',
  styleUrl: './wishlist-list.css',
})
export class WishlistList implements OnInit{
  wishlist: any[] = [];

  constructor(private wishlistService: Wishlist) {}

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe((data: any) => {
      console.log('Daten vom Backend:', data);
      this.wishlist = data;
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
