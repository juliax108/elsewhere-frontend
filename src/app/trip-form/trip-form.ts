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
  tripForm: FormGroup;
  editingTrip: any = null;

  constructor(private fb: FormBuilder, private tripService: Trip) {
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      status: ['geplant', Validators.required],
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

  createStop(): FormGroup {
    return this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  get stops(): FormArray {
    return this.tripForm.get('stops') as FormArray;
  }

  addStop() {
    this.stops.push(this.createStop());
  }

  removeStop(index: number) {
    if (this.stops.length > 1) {
      this.stops.removeAt(index);
    }
  }

  ngOnInit(): void {
    this.tripService.tripToEdit.subscribe((trip: any) => {
      this.editingTrip = trip;

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

      this.stops.clear();

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

  onSubmit() {
    if (this.tripForm.invalid) {
      return;
    }

    if (this.editingTrip) {
      this.tripService
      .updateTrip(this.editingTrip._id, this.tripForm.value)
      .subscribe(() => {
        console.log('Trip aktualisiert!');
        this.tripService.tripCreated.next();
        this.editingTrip = null;
        this.tripForm.reset();
      });
    } else {
      this.tripService
      .createTrip(this.tripForm.value)
      .subscribe(() => {
        console.log('Trip erstellt!');
        this.tripService.tripCreated.next();
        this.tripForm.reset();
      }); 
    }
  }

  resetForm() {
    this.tripForm.reset({
      status: 'geplant'
    });

    this.stops.clear();
    this.stops.push(this.createStop());
  }
  
}
