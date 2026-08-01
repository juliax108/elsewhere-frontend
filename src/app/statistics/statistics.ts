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

  // enthält alle Reisen, die vom Backend geladen wurden
  trips: any[] = [];

  constructor(
    private tripService: Trip,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Reisen werden beim Öffnen der Komponente geladen 
    this.loadTrips();

    // nach dem Erstellen oder Bearbeiten einer Reise werden die Statistiken erneut berechnet
    this.tripService.tripCreated.subscribe(() => {
      this.loadTrips();
    })
  }

  // lädt alle Reisen vom Backend
  loadTrips() {
    this.tripService.getTrips().subscribe((data: any) => { 
      console.log('Daten vom Backend:', data);

      this.trips = data;

      // aktualisiert die dargestellten Statistikwerte
      this.changeDetector.detectChanges();
    });
  }

  // fasst die Stationen aller Reisen in einem Array zusammen
  getAllStops() {
    return this.trips.flatMap((trip: any) => trip.stops || []);
  }

  // zählt unterschiedliche Länder
  getUniqueCountries() {
    const countries = this.getAllStops()
      .map((stop: any) => stop.country)
      .filter((country: string) => country);

    // ein Set enthält jeden Wert nur einmal
    return new Set(countries).size;
  }

  // zählt unterschiedliche Städte
  getUniqueCities() {
    const cities = this.getAllStops()
      .map((stop: any) => stop.city)
      .filter((city: string) => city);

    return new Set(cities).size;
  }

  // berechnet den Anteil der besuchten Länder an 195 Ländern
  getWorldPercentage() {
    return (this.getUniqueCountries() / 195 * 100).toFixed(2); 
  }

  // ermittelt, welches Land in den Stationen am häufigsten vorkommt
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

    // durchläuft alle gezählten Länder und merkt sich das Land mit dem höchsten Wert
    for (const country in counter) {
      if (counter[country] > maxCount) {
        maxCount = counter[country];
        mostFrequentCountry = country;
      }
    }

    return mostFrequentCountry || 'Noch keine Daten';
  }

  // ermittelt, welche Stadt am häufigsten vorkommt
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

  // ermittelt die Anzahl unterschiedlicher Kontinente
  getUniqueContinents() {
    const continents = this.getAllStops()
      .map((stop) => {
        const englishName = countryTranslations[stop.country];
        return countryContinents[englishName];
      })

      // nicht gefundene Länder werden herausgefiltert
      .filter((continent: string) => continent);

    return new Set(continents).size;
  }

  // sucht die nächste zukünftige, geplante Reise
  getNextTrip() {
    const today = new Date();

    // Uhrzeit wird entfernt, damit heute beginnende Reisen zählen
    today.setHours(0, 0, 0, 0);

    const plannedTrips = this.trips
      .filter((trip: any) => {
        // nur geplante Reisen mit einem Startdatum berücksichtigen
        if (trip.status !== 'geplant' || !trip.startDate) {
          return false;
        }

        return new Date(trip.startDate) >= today;
      })

      // frühestes Startdatum steht nach dem Sortieren an erster Stelle
      .sort((firstTrip: any, secondTrip: any) => {
        return (
          new Date(firstTrip.startDate).getTime() -
          new Date(secondTrip.startDate).getTime()
        );
      });

      // 1. Element ist die nächste Reise
      // falls keine existiert, wird null zurückgegeben
      return plannedTrips[0] || null;
  }
}
