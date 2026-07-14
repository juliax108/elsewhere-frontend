import { Component } from '@angular/core';

import { TripForm } from '../../trip-form/trip-form';
import { TripList } from '../../trip-list/trip-list';
import { WorldMap } from '../../world-map/world-map';

@Component({
  selector: 'app-trips-page',
  imports: [TripForm, TripList, WorldMap],
  templateUrl: './trips-page.html',
  styleUrl: './trips-page.css',
})
export class TripsPage {}
