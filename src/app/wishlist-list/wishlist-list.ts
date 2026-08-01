import { Component, OnInit } from '@angular/core';

import { Wishlist } from '../wishlist';

@Component({
  selector: 'app-wishlist-list',
  imports: [],
  templateUrl: './wishlist-list.html',
  styleUrl: './wishlist-list.css',
})
export class WishlistList implements OnInit{

  // enthält alle Wunschziele aus der Datenbank
  wishlist: any[] = [];

  // speichert die Wetterdaten nach dem Namen der Stadt
  // Bsp: weatherData[`Berlin`] enthält das Wetter für Berlin
  weatherData: any = {};

  constructor(private wishlistService: Wishlist) {}

  ngOnInit() {
    // Wunschziele werden beim Öffnen der Komponente geladen
    this.loadWishlist();

    // nach dem Erstellen oder Bearbeiten eines Wunschziels werden die Liste und die Wetterdaten erneut geladen.
    this.wishlistService.wishlistItemCreated.subscribe(() => {
      this.loadWishlist();
    });
  }

  // lädt alle Wunschziele und anschließend die Wetterdaten für die jeweils gespeicherte Stadt
  loadWishlist() {
    this.wishlistService.getWishlist().subscribe((data: any) => {
      console.log('Daten vom Backend:', data);

      this.wishlist = data;

      // alte Wetterdaten werden vor dem Neuladen entfernt
      this.weatherData = {};

      data.forEach((item: any) => {

        // Wetter wird nur abgefragt, wenn eine Stadt vorhanden ist
        if (item.city) {
          console.log('Rufe Wetter ab für:', item.city);

          this.wishlistService
            .getWeather(item.city)
            .subscribe((weather: any) => {
              this.weatherData[item.city] = weather;
            });
        }
      });
    });
  }

  // löscht ein Wunschziel anhand seiner MongoDB-ID
  onDelete(id: string) {
    this.wishlistService.deleteWishlistItem(id).subscribe(() => {

      // Liste und Wetterdaten werden gemeinsam neu geladen
      this.loadWishlist();
    });
  }

  // über den Service an das Bearbeitungsformular
  onEdit(wishlist: any) {
    this.wishlistService.wishlistItemToEdit.next(wishlist);
  }

}
