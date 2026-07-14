import { Component } from '@angular/core';

import { WishlistForm } from '../../wishlist-form/wishlist-form';
import { WishlistList } from '../../wishlist-list/wishlist-list';
import { WishlistMap } from '../../wishlist-map/wishlist-map';

@Component({
  selector: 'app-wishlist-page',
  imports: [WishlistForm, WishlistList, WishlistMap],
  templateUrl: './wishlist-page.html',
  styleUrl: './wishlist-page.css',
})
export class WishlistPage {}
