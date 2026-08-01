import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Wishlist } from '../wishlist';

@Component({
  selector: 'app-wishlist-form',
  imports: [ReactiveFormsModule],
  templateUrl: './wishlist-form.html',
  styleUrl: './wishlist-form.css',
})

export class WishlistForm implements OnInit{

  // enthält alle Felder des Wunschlistenformulars
  wishlistForm: FormGroup;

  // speichert das Wunschziel, das gerad bearbeitet wird
  // ist Wert null, wird neues Wunschziel erstellt
  editingWishlist: any = null;

  constructor(private fb: FormBuilder, private wishlistService: Wishlist) {
    // Aufbau des Reactive Forms
    this.wishlistForm = this.fb.group({
      country: ['', Validators.required],
      city: [''],
      bestTravelTime: [''],
      notes: [''],
      priority: [''],
    });
  }

  ngOnInit(): void {
    // reagiert darauf, wenn ein Wunschziel aus der Liste zum Bearbeiten ausgewählt wurde
    this.wishlistService.wishlistItemToEdit.subscribe((wishlist: any) => {
      this.editingWishlist = wishlist;

      // übernimmt die vorhandenen Werte in das Formular
      this.wishlistForm.patchValue(wishlist);
    });
  }

  // wird beim Absenden des Formulars abgerufen 
  onSubmit() {

    // ungültige Formulare werden nicht gespeichert
    if (this.wishlistForm.invalid) {
      return;
    }

    if (this.editingWishlist) {

      // Update: vorhandenes Wunschziel bearbeiten
      this.wishlistService.updateWishlistItem(this.editingWishlist._id, this.wishlistForm.value).subscribe(() => {
        console.log('Wishlist aktualisiert!');

        // andere Komponenten werden über die Änderung informiert
        this.wishlistService.wishlistItemCreated.next();

        this.editingWishlist = null;
        this.wishlistForm.reset();
      });
    } else {

      // Create: neues Wunschziel speichern
      this.wishlistService.createWishlistItem(this.wishlistForm.value).subscribe(() => {
        console.log('WishlistItem erstellt!');

        // Wunschliste wird anschließend neu geladen
        this.wishlistService.wishlistItemCreated.next();

        // Formular nach dem Erstellen leeren
        this.wishlistForm.reset();
      });
    }
  }

}
