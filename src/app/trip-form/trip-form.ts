import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-form',
  imports: [ReactiveFormsModule],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.css',
})

export class TripForm {
  tripForm: FormGroup;

  constructor(private fb: FormBuilder, private tripService: Trip) {
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      country: ['', Validators.required],
      city: [''],
      startDate: [''],
      endDate: [''],
      description: [''],
      travelWith: [''],
      transportMode: [''],
      rating: [''],
    })
  }

  onSubmit() {
    this.tripService.createTrip(this.tripForm.value).subscribe(() => {
      console.log('Trip erstellt!');
      this.tripService.tripCreated.next();
    })
  }
  
}
