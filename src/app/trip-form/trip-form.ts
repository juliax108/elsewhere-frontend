import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Trip } from '../trip';
import { transformation } from 'leaflet';

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
      country: ['', Validators.required],
      city: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      description: [''],
      travelWith: [''],
      transportMode: [''],
      rating: [''],
    })
  }

  ngOnInit(): void {
    this.tripService.tripToEdit.subscribe((trip: any) => {
      this.editingTrip = trip;
      this.tripForm.patchValue({
        ...trip,
        country: trip.stops?.[0]?.country || '',
        city: trip.stops?.[0]?.city || ''
      });
    });
  }

  onSubmit() {
    const formValue = this.tripForm.value;

    const tripData = {
      title: formValue.title,
      status: formValue.status,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      description: formValue.description,
      travelWith: formValue.travelWith,
      transportMode: formValue.transportMode,
      rating: formValue.rating,
      stops: [
        {
          country: formValue.country,
          city: formValue.city
        }
      ]
    }
    
    if (this.editingTrip) {
      this.tripService.updateTrip(this.editingTrip._id, this.tripForm.value).subscribe(() => {
        console.log('trip aktualisiert!');
        this.tripService.tripCreated.next();
        this.editingTrip = null;
        this.tripForm.reset();
      });
    } else {
      this.tripService.createTrip(tripData).subscribe(() => {
        console.log('Trip erstellt!');
        this.tripService.tripCreated.next();
        this.tripForm.reset();
      }); 
    }
  }
  
}
