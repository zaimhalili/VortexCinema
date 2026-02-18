import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Posti } from '../../models/Posti';
import { CinemaService } from '../../services/cinema-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-posti-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './posti-component.html',
  styleUrl: './posti-component.css',
})

export class PostiComponent {
  posti: Posti[] = []

  numFile: number = 15;
  SEDIE_PER_FILA: number = 20;
  rows: number[][] = [];
  prezzo: number = 10;
  selectedSeats: {
    fila: number,
    posto: number,
    tipo: 'INTERO' | 'RIDOTTO'
  }[] = [];

  constructor(private cinemaService: CinemaService) { }

  isSeatOccupied(row: number, column: number): boolean {
    const fila: number = row + 1
    const posto = this.posti.find(p =>
      p.fila === fila && p.posto === column
    )

    return posto ? posto.occupato : false;
  }


  selezionaSedia(rowIndex: number, seat: number) {

    const fila = rowIndex + 1;

    if (this.isSeatOccupied(rowIndex, seat)) return;

    for (let i = 0; i < this.selectedSeats.length; i++) {
      if (
        this.selectedSeats[i].fila === fila &&
        this.selectedSeats[i].posto === seat
      ) {
        this.selectedSeats.splice(i, 1);
        this.calculateCost();
        return;
      }
    }

    this.selectedSeats.push({
      fila,
      posto: seat,
      tipo: 'INTERO'
    });

    this.calculateCost();
  }

  changeTipo(seat: any, tipo: 'INTERO' | 'RIDOTTO') {
    seat.tipo = tipo;
    this.calculateCost();
  }  
  
  isSeatSelected(rowIndex: number, seat: number): boolean {
    const fila = rowIndex + 1;

    for (let i = 0; i < this.selectedSeats.length; i++) {
      if (
        this.selectedSeats[i].fila === fila &&
        this.selectedSeats[i].posto === seat
      ) {
        return true;
      }
    }

    return false;
  }

  calculateCost() {
    let total = 0;

    for (let s of this.selectedSeats) {
      if (s.tipo === 'INTERO') {
        total += 10;
      } else {
        total += 7;
      }
    }

    this.prezzo = total;
  }
  confermaPrenotazione() {

    if (this.selectedSeats.length === 0) {
      alert("Seleziona almeno un posto.");
      return;
    }

    console.log("Prenotazione confermata:", this.selectedSeats);
  }
  



  ngOnInit() {
    for (let i = 0; i < this.numFile; i++) {
      const row: number[] = [];

      for (let j = 1; j <= this.SEDIE_PER_FILA; j++) {
        row.push(j);
      }

      this.rows.push(row);
    }

    this.cinemaService.getSeat(1).subscribe(res => {
      this.posti = res.posti
    })
  }
}
