import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-world-map',
  imports: [],
  templateUrl: './world-map.html',
  styleUrl: './world-map.css',
})
export class WorldMap implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const map = L.map('map').setView([51.1657, 10.4515], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    this.http.get('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json').subscribe((geoData: any) => { 
      L.geoJSON(geoData).addTo(map);
    });
  }
}
