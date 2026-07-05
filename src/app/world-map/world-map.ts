import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-world-map',
  imports: [],
  templateUrl: './world-map.html',
  styleUrl: './world-map.css',
})
export class WorldMap implements OnInit {

  ngOnInit() {
    const map = L.map('map').setView([51.1657, 10.4515], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  }
}
