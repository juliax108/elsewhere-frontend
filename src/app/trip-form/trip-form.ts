import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
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

  ngOnInit(): void {
    this.tripService.tripToEdit.subscribe((trip: any) => {
      this.editingTrip = trip;
      this.tripForm.patchValue(trip);
    });
  }

  onSubmit() {
    if (this.editingTrip) {
      this.tripService.updateTrip(this.editingTrip._id, this.tripForm.value).subscribe(() => {
        console.log('trip aktualisiert!');
        this.tripService.tripCreated.next();
        this.editingTrip = null;
        this.tripForm.reset();
      });
    } else {
      this.tripService.createTrip(this.tripForm.value).subscribe(() => {
        console.log('Trip erstellt!');
        this.tripService.tripCreated.next();
      }); 
    }
  }
  
}
