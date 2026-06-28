import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Trip } from '../trip';

@Component({
  selector: 'app-trip-list',
  imports: [],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css',
})
export class TripList implements OnInit {
  trips: any[] = [];

  constructor(private tripService: Trip) {}

  ngOnInit() {
    this.tripService.getTrips().subscribe((data: any) => {
      console.log('Daten vom Backend:', data);
      this.trips = data;
    });
  }
}
