import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Posti } from '../../models/Posti';
import { CinemaService } from '../../services/cinema-service';


@Component({
  selector: 'app-posti-component',
  imports: [CommonModule],
  templateUrl: './posti-component.html',
  styleUrl: './posti-component.css',
})

export class PostiComponent {
  posti: Posti[] = []

  numFile: number = 15;
  SEDIE_PER_FILA: number = 20;
  rows: number[][] = [];

  constructor(private cinemaService: CinemaService) { }

  isSeatOccupied(row: number, column: number): boolean {
    const fila : number = row + 1
    const posto = this.posti.find(p =>
      p.fila === fila && p.posto === column
    )

    return posto ? posto.occupato : false;
  }


  selezionaSedia(row: number, seat: number) {
    const selectSeat = document.getElementsByClassName('seat');
    const pos = row * this.SEDIE_PER_FILA + seat - 1;

    if (!selectSeat[pos].classList.contains('disabled')) {
      if (!selectSeat[pos].classList.contains('selected')) {
        selectSeat[pos].classList.add('selected');
      } else {
        selectSeat[pos].classList.remove('selected');
      }
    }
  }

  ngOnInit() {
    for (let i = 0; i < this.numFile; i++) {
      const row: number[] = [];

      for (let j = 1; j <= this.SEDIE_PER_FILA; j++) {
        row.push(j);
      }

      this.rows.push(row);
    }

    this.cinemaService.getSeat(1).subscribe(res =>{
      this.posti = res.posti
    })
  }
}
