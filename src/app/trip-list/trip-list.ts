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

  // enthält alle Reisen, die vom Backend geladen wurden
  trips: any[] = [];

  constructor(
    private tripService: Trip,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Reisen werden beim Öffnen der Komponente einmal geladen.
    this.loadTrips();

    // nach dem Erstellen oder Bearbeiten einer Reise wird Liste erneut vom Backend geladen
    this.tripService.tripCreated.subscribe(() => {
      this.loadTrips();
    });
  }

  // lädt alle Reisen vom Backend und aktualisiert die Ansicht
  loadTrips() {
    this.tripService.getTrips().subscribe((data: any) => {
      this.trips = data;

      // sorgt dafür, dass Angular die neuen Daten direkt in der Benutzeroberfläche darstellt.
      this.changeDetector.detectChanges();
    });
  }

  // löscht eine Reise anhand ihrer MongoDB-ID
  onDelete(id: string) {
    this.tripService.deleteTrip(id).subscribe(() => {
      // nach dem Löschen wird die aktuelle Liste neu geladen
      this.tripService.getTrips().subscribe((data: any) => {
        this.trips = data;
      });
    });
  }

  // übergibt die ausgewählte Reise an das Reiseformular
  onEdit(trip: any) {
    this.tripService.tripToEdit.next(trip);
  }

}
