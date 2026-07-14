import { Component } from '@angular/core';
import { Statistics } from '../../statistics/statistics';

@Component({
  selector: 'app-home-page',
  imports: [Statistics],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
