import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Wishlist } from '../wishlist';
import { countryTranslations } from '../country-data';
import { defaultIcon } from '../map-config';

@Component({
  selector: 'app-wishlist-map',
  imports: [],
  templateUrl: './wishlist-map.html',
  styleUrl: './wishlist-map.css',
})
export class WishlistMap implements OnInit {
  constructor(private http: HttpClient, private wishlistService: Wishlist) {}

  ngOnInit() {
      const map = L.map('wishlist-map').setView([51.1657, 10.4515], 4);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
  
      this.wishlistService.getWishlist().subscribe((wishlistItems: any) => {
        const desiredCountries = wishlistItems.map((item: any) => countryTranslations[item.country]);

        wishlistItems.forEach((item: any) => {
          this.http.get(`https://nominatim.openstreetmap.org/search?q=${item.city}&format=json`).subscribe((results:any) => {
            if (results.length > 0) {
              const lat = results[0].lat;
              const lon = results[0].lon;
              L.marker([lat, lon], { icon: defaultIcon }).addTo(map).bindPopup(item.city);
            }
          });
        });
      
        this.http.get('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json').subscribe((geoData: any) => { 
          L.geoJSON(geoData, {
            style: (feature: any) => {
              console.log('Ländername in GeoJSON:', feature.properties.name);
              const isDesired = desiredCountries.includes(feature.properties.name);
              return {
                fillColor: isDesired ? '#8db7f9' : '#cccccc',
                fillOpacity: isDesired ? 0.6 : 0.1,
                color: '#666',
                weight: 1
              };
            }
          }).addTo(map);
        });
      });  
    }
}
