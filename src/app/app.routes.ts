import { Routes } from '@angular/router';

// Seiten der Anwendung
import { HomePage } from './pages/home-page/home-page';
import { TripsPage } from './pages/trips-page/trips-page';
import { WishlistPage } from './pages/wishlist-page/wishlist-page';

// Definition aller Routen der Anwendung
export const routes: Routes = [

    // Startseite
    { path: '', component: HomePage },

    // Seite zur Verwaltung der Reisen
    { path: 'reisen', component: TripsPage },

    // Seite zur Verwaltung der Wunschliste 
    { path: 'wunschliste', component: WishlistPage },

    // existiert die eingegebene Route nicht, wird man automatisch auf die Startseite umgeleitet
    { path: '**', redirectTo: '' }
];
