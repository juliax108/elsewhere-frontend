import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TripList } from './trip-list/trip-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TripList], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('elsewhere-frontend');
}
