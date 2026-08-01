import { Component, signal } from '@angular/core';

// benötigte Router-Direktiven für Navigation und Seitenwechsel
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Titel der Anwendung als Angular Signal.
  // wird aktuell nicht verwendet, wurde aber beim Erstellen des Projekts automatisch angelegt.
  protected readonly title = signal('elsewhere-frontend');
}
