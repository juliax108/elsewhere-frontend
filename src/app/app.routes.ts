import { Routes } from '@angular/router';

import { HomePage } from './pages/home-page/home-page';
import { TripsPage } from './pages/trips-page/trips-page';
import { WishlistPage } from './pages/wishlist-page/wishlist-page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'reisen', component: TripsPage },
    { path: 'wunschliste', component: WishlistPage },
    { path: '**', redirectTo: '' }
];
