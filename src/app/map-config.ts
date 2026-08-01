import * as L from 'leaflet';

// Standarc-Marker für alle Leaflet-Karten
// dadurch wird auf allen Karten dasselbe Marker-Design verwendet
export const defaultIcon = L.icon({

  // Bild des Markers
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  // Schatten unter dem Marker
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  // Größe des Markers (Breite, Höhe)
  iconSize: [25, 41],

  // Punkt des Markers, der genau auf der Koordinate liegt
  iconAnchor: [12, 41]
});