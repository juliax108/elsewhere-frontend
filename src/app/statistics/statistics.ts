import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { max } from 'rxjs';
import { countryContinents } from '../country-data';


@Component({
  selector: 'app-statistics',
  imports: [],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics implements OnInit {
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

  getUniqueCountries() {
    const uniqueCountries = new Set(this.trips.map((trip: any) => trip.country));
    return uniqueCountries.size;
  }

  getUniqueCities() {
    const uniqueCities = new Set(this.trips.map((trip: any) => trip.city));
    return uniqueCities.size;
  }

  getWorldPercentage() {
    return this.getUniqueCountries() / 195 * 100; 
  }

  getMostFrequentCountry() {
    const counter: any = {};

    this.trips.forEach((trip: any) => {
      counter[trip.country] = (counter[trip.country] || 0) + 1;
    });

    let mostFrequentCountry = '';
    let maxCount = 0;

    for (const country in counter) {
      if (counter[country] > maxCount) {
        maxCount = counter[country];
        mostFrequentCountry = country;
      }
    }

    return mostFrequentCountry;
  }

  getMostFrequentCity() {
    const counter: any = {};

    this.trips.forEach((trip: any) => {
      counter[trip.city] = (counter[trip.city] || 0) + 1;
    });

    let mostFrequentCity = '';
    let maxCount = 0;

    for (const city in counter) {
      if (counter[city] > maxCount) {
        maxCount = counter[city];
        mostFrequentCity = city;
      }
    }

    return mostFrequentCity;
  }
  
}
