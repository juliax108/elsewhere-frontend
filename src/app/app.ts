import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TripList } from './trip-list/trip-list';
import { TripForm } from './trip-form/trip-form';

import { WishlistList} from './wishlist-list/wishlist-list';
import { WishlistForm } from './wishlist-form/wishlist-form';

import { WorldMap } from './world-map/world-map';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TripList, TripForm, WishlistList, WishlistForm, WorldMap], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('elsewhere-frontend');
}
