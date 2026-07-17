import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

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

  constructor(
    private tripService: Trip,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tripService.getTrips().subscribe((data: any) => {
      this.trips = data;
      this.changeDetector.detectChanges();
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
