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
    // erstellt die Leaflet-Karte und setzt Deutschland als anfägnlichen Mittelpunkt
    const map = L.map('map').setView([51.1657, 10.4515], 4);

    // OpenStreetMap stellt die sichtbaren Kartenkacheln bereit
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // lädt alle Reisen aus dem Backend
    this.tripService.getTrips().subscribe((trips: any) => {

      // fasst alle Stationen aller Reisen in einem Array zusammen
      // der Reisetitel wird ergänzt, damit er später im Marker-Popup angezeigt werden kann
      const allStops = trips.flatMap((trips: any) => 
        (trips.stops || []).map((stop: any) => ({
          ...stop,
          tripTitle: trips.title
        }))
      );

      // übersetzt die deutschen Ländernamen in die englische Namen, die in der GeoJSON-Datei verwendet werden
      const visitedCountries = allStops
      .map((stop: any) => {
        // entfernt mögliche Leerzeichen vor oder nach dem Ländernamen
        const germanCountry = stop.country?.trim();

        return countryTranslations[germanCountry];
      })
      .filter((country: string) => country);

      // für jede Station werden Koordinaten gesucht und anschließend ein Marker erstellt
      allStops.forEach((stop: any, index: number) => {

        // die Anfragen werden zeitlich versetzt, damit nicht alle Geocoding-Anfragen gleichzeitig gesendet werden
        setTimeout(() => {
          const searchPlace = `${stop.city}, ${stop.country}`;

          // Nominatim wandelt Stadt und Land in Koordinaten um
          this.http.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchPlace)}&format=json`
          ).subscribe((results:any) => {

            // Marker wird nur erstellt, wenn ein passendes Ergebnis gefunden wurde
            if (results.length > 0) {
              const lat = Number(results[0].lat);
              const lon = Number(results[0].lon);

              L.marker([lat, lon], { icon: defaultIcon })
              .addTo(map)
              .bindPopup(`${stop.tripTitle}: ${stop.city}`);
          }
        });
      
      }, index * 1000);
    });
    
    // lädt die Ländergrenzen als GeoJSON-Datei
    this.http.get(
      'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
    ).subscribe((geoData: any) => { 

        // fügt die Länderoberflächen zur Karte hinzu
        L.geoJSON(geoData, {
          style: (feature: any) => {
            
            // prüft, ob das jeweilige Land besucht wurde
            const isVisited = visitedCountries.includes(feature.properties.name);

            // besuchte Länder werden dunkelblau hervorgehoben
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


