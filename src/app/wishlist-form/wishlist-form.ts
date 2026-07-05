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
  wishlistForm: FormGroup;
  editingWishlist: any = null;

  constructor(private fb: FormBuilder, private wishlistService: Wishlist) {
    this.wishlistForm = this.fb.group({
      country: ['', Validators.required],
      city: [''],
      bestTravelTime: [''],
      notes: [''],
      priority: [''],
    });
  }

  ngOnInit(): void {
    this.wishlistService.wishlistItemToEdit.subscribe((wishlist: any) => {
      this.editingWishlist = wishlist;
      this.wishlistForm.patchValue(wishlist);
    });
  }

  onSubmit() {
    if (this.editingWishlist) {
      this.wishlistService.updateWishlistItem(this.editingWishlist._id, this.wishlistForm.value).subscribe(() => {
        console.log('Wishlist aktualisiert!');
        this.wishlistService.wishlistItemCreated.next();
        this.editingWishlist = null;
        this.wishlistForm.reset();
      });
    } else {
      this.wishlistService.createWishlistItem(this.wishlistForm.value).subscribe(() => {
        console.log('WishlistItem erstellt!');
        this.wishlistService.wishlistItemCreated.next();
      });
    }
  }

}
