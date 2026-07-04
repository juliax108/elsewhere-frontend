import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Trip } from '../trip';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-list',
  imports: [DatePipe],
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

    this.tripService.tripCreated.subscribe(() => {
      this.tripService.getTrips().subscribe((data: any) => {
        this.trips = data;
      });
    });
  }

  onDelete(id: string) {
    this.tripService.deleteTrip(id).subscribe(() => {
      this.tripService.getTrips().subscribe((data: any) => {
        this.trips = data;
      });
    });
  }

  onEdit(trip: any) {
    this.tripService.tripToEdit.next(trip);
  }

}
