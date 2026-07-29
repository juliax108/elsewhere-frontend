import { Component } from '@angular/core';
import { Statistics } from '../../statistics/statistics';
import { WorldMap } from '../../world-map/world-map';

@Component({
  selector: 'app-home-page',
  imports: [Statistics, WorldMap],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
