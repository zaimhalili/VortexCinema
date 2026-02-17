import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-posti-component',
  imports: [CommonModule],
  templateUrl: './posti-component.html',
  styleUrl: './posti-component.css',
})
export class PostiComponent {

  rows: number[][] = [];
  readonly ROWS = 15;
  readonly SEATS_PER_ROW = 20;

  ngOnInit() {
    for (let i = 0; i < this.ROWS; i++) {
      const row: number[] = [];

      for (let j = 1; j <= this.SEATS_PER_ROW; j++) {
        row.push(j);
      }

      this.rows.push(row);
    }
  }
}
