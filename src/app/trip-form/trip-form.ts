import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-form',
  imports: [ReactiveFormsModule],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.css',
})

export class TripForm implements OnInit{

  // enthält alle Felder des Reiseformulars
  tripForm: FormGroup;

  // speichert die aktuell ausgewählte Reise
  // ist Wert null, wird neue Reise erstellt
  editingTrip: any = null;

  constructor(private fb: FormBuilder, private tripService: Trip) {
    // Aufbau des Reactive Forms (wird vollstädnig in TypeScript aufgebaut, Formularfelder und Validierungsregeln stehen in FormGroup)
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      status: ['geplant', Validators.required],

      // FormArray ermöglicht beliebig viele Stationen
      // zu Beginn enthälz es genau 1 leere Station
      stops: this.fb.array([
        this.createStop()
      ]),
      startDate: [''],
      endDate: [''],
      description: [''],
      travelWith: [''],
      transportMode: [''],
      rating: [''],
    })
  }

  // erstellt eine neue Formulargruppe für eine Station
  createStop(): FormGroup {
    return this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  // vereinfachter Zugriff auf das stops-FormArray
  get stops(): FormArray {
    return this.tripForm.get('stops') as FormArray;
  }

  // fügt dem Formular eine weitere Station hinzu
  addStop() {
    this.stops.push(this.createStop());
  }

  // entfernt eine Station
  // mindestens eine Station bleibt immer erhalten
  removeStop(index: number) {
    if (this.stops.length > 1) {
      this.stops.removeAt(index);
    }
  }

  ngOnInit(): void {
    // reagiert darauf, wenn in der Reiseliste eine Reise zum Bearbeiten ausgewählt wurde
    this.tripService.tripToEdit.subscribe((trip: any) => {
      this.editingTrip = trip;

      // übernimmt die Felder in das Formular
      this.tripForm.patchValue({
       title: trip.title,
       status: trip.status,
       startDate: trip.startDate,
       endDate: trip.endDate,
       description: trip.description,
       travelWith: trip.travelWith,
       transportMode: trip.transportMode,
       rating: trip.rating
      });

      // die zunächst vorhandene leere Station wird entfernt
      this.stops.clear();

      // alle gespeicherten Stationen werden als eigene Formulargruppe eingefügt
      trip.stops.forEach((stop: any) => {
        this.stops.push(
          this.fb.group({
            country: [stop.country, Validators.required],
            city: [stop.city, Validators.required]
          })
        )
      })
    });
  }

  // wird beim Absenden des Formulars aufgerufen
  onSubmit() {
    // ungültige Formulare werden nicht gespeichert
    if (this.tripForm.invalid) {
      return;
    }

    if (this.editingTrip) {
      // Update: vorhandene Reise bearbeiten
      this.tripService
      .updateTrip(this.editingTrip._id, this.tripForm.value)
      .subscribe(() => {
        console.log('Trip aktualisiert!');

        // andere Komponenten werden über Änderung informiert
        this.tripService.tripCreated.next();
        this.editingTrip = null;
        this.resetForm();
      });
    } else {
      // Create: neue Reise speichern
      this.tripService
      .createTrip(this.tripForm.value)
      .subscribe(() => {
        console.log('Trip erstellt!');

        // Reiseliste und Statistik können ihre Daten neu laden
        this.tripService.tripCreated.next();
        this.resetForm();
      }); 
    }
  }

  // setzt das Formular in den ursprünglichen Zustand zurück
  resetForm() {
    this.tripForm.reset({
      status: 'geplant'
    });

    this.stops.clear();
    this.stops.push(this.createStop());
  }
  
}
