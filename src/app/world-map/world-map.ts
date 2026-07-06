import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../trip';

const countryTranslations: any = {
  'Deutschland': 'Germany',
  'Italien': 'Italy',
  'Frankreich': 'France',
  'Spanien': 'Spain',
  'Portugal': 'Portugal',
  'Griechenland': 'Greece',
  'Norwegen': 'Norway',
  'Schweden': 'Sweden',
  'Dänemark': 'Denmark',
  'Finnland': 'Finland',
  'Niederlande': 'Netherlands',
  'Belgien': 'Belgium',
  'Österreich': 'Austria',
  'Schweiz': 'Switzerland',
  'Polen': 'Poland',
  'Tschechien': 'Czech Republic',
  'Kroatien': 'Croatia',
  'Ungarn': 'Hungary',
  'Irland': 'Ireland',
  'Vereinigtes Königreich': 'United Kingdom',
  'Island': 'Iceland',
  'Türkei': 'Turkey',
  'USA': 'United States of America',
  'Thailand': 'Thailand',
  'Japan': 'Japan',
};

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
      const visitedCountries = trips.map((trip: any) => countryTranslations[trip.country]);
    
      this.http.get('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json').subscribe((geoData: any) => { 
        L.geoJSON(geoData, {
          style: (feature: any) => {
            const isVisited = visitedCountries.includes(feature.properties.name);
            return {
              fillColor: isVisited ? '#f8bbd0' : '#cccccc',
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
