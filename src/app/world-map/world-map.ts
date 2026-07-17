import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../trip';
import { countryTranslations } from '../country-data';
import { defaultIcon } from '../map-config';

@Component({
  selector: 'app-world-map',
  imports: [],
  templateUrl: './world-map.html',
  styleUrl: './world-map.css',
})
export class WorldMap implements OnInit {
  constructor(private http: HttpClient, private tripService: Trip) {}

  ngOnInit() {
    const map = L.map('map').setView([51.1657, 10.4515], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    this.tripService.getTrips().subscribe((trips: any) => {

      const allStops = trips.flatMap((trips: any) => 
        (trips.stops || []).map((stop: any) => ({
          ...stop,
          tripTitle: trips.title
        }))
      );

      const visitedCountries = allStops
      .map((stop: any) => {
        const germanCountry = stop.country?.trim();
        return countryTranslations[germanCountry];
      })
      .filter((country: string) => country);

      allStops.forEach((stop: any, index: number) => {
        setTimeout(() => {

          const searchPlace = `${stop.city}, ${stop.country}`;

          this.http.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchPlace)}&format=json`
          ).subscribe((results:any) => {

            if (results.length > 0) {
              const lat = results[0].lat;
              const lon = results[0].lon;

              L.marker([lat, lon], { icon: defaultIcon })
              .addTo(map)
              .bindPopup(`${stop.tripTitle}: ${stop.city}`);
          }
        });
      
      }, index * 1000);
    });
    
      this.http.get(
        'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      ).subscribe((geoData: any) => { 

        L.geoJSON(geoData, {
          style: (feature: any) => {
            const isVisited = visitedCountries.includes(feature.properties.name);

            return {
              fillColor: isVisited ? '#1a3a5c' : '#cccccc',
              fillOpacity: isVisited ? 0.6 : 0.1,
              color: '#666',
              weight: 1
            };
          }
        }).addTo(map);
      });
    });  
  }
}


