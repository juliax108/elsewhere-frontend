import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Trip } from '../trip';
import { countryTranslations, countryContinents } from '../country-data';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-statistics',
  imports: [DatePipe],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics implements OnInit {
  trips: any[] = [];

  constructor(
    private tripService: Trip,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadTrips();

    this.tripService.tripCreated.subscribe(() => {
      this.loadTrips();
    })
  }

  loadTrips() {
    this.tripService.getTrips().subscribe((data: any) => { 
      console.log('Daten vom Backend:', data);
      this.trips = data;
      this.changeDetector.detectChanges();
    });
  }

  getAllStops() {
    return this.trips.flatMap((trip: any) => trip.stops || []);
  }

  getUniqueCountries() {
    const countries = this.getAllStops()
      .map((stop: any) => stop.country)
      .filter((country: string) => country);

    return new Set(countries).size;
  }

  getUniqueCities() {
    const cities = this.getAllStops()
      .map((stop: any) => stop.city)
      .filter((city: string) => city);

    return new Set(cities).size;
  }

  getWorldPercentage() {
    return (this.getUniqueCountries() / 195 * 100).toFixed(2); 
  }

  getMostFrequentCountry() {
    const counter: any = {};

    this.getAllStops().forEach((stop: any) => {
      const country = stop.country;

      if (country) {
      counter[country] = (counter[country] || 0) + 1;
      }
    });

    let mostFrequentCountry = '';
    let maxCount = 0;

    for (const country in counter) {
      if (counter[country] > maxCount) {
        maxCount = counter[country];
        mostFrequentCountry = country;
      }
    }

    return mostFrequentCountry || 'Noch keine Daten';
  }

  getMostFrequentCity() {
    const counter: any = {};

    this.getAllStops().forEach((stop: any) => {
      const city = stop.city;

      if (city) {
      counter[city] = (counter[city] || 0) + 1;
      }
    });

    let mostFrequentCity = '';
    let maxCount = 0;

    for (const city in counter) {
      if (counter[city] > maxCount) {
        maxCount = counter[city];
        mostFrequentCity = city;
      }
    }

    return mostFrequentCity || 'Noch keine Daten';
  }

  getUniqueContinents() {
    const continents = this.getAllStops()
      .map((trip: any) => {
        const englishName = countryTranslations[trip.country];
        return countryContinents[englishName];
      })
      .filter((continent: string) => continent);

    return new Set(continents).size;
  }

  getNextTrip() {
    const today = new Date();

    const plannedTrips = this.trips
      .filter((trip: any) => {
        if (trip.status !== 'geplant' || !trip.startDate) {
          return false;
        }

        return new Date(trip.startDate) >= today;
      })
      .sort((firstTrip: any, secondTrip: any) => {
        return (
          new Date(firstTrip.startDate).getTime() -
          new Date(secondTrip.startDate).getTime()
        );
      });

      return plannedTrips[0] || null;
  }
}
