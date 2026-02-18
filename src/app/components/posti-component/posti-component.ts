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
  bigliettiInteri: number = 1;
  bigliettiRidotti: number = 0;
  prezzo: number = 10;
  sedieSelezionate: number = 0;
  selectedSeats: object[] = [];

  constructor(private cinemaService: CinemaService) { }

  isSeatOccupied(row: number, column: number): boolean {
    const fila: number = row + 1
    const posto = this.posti.find(p =>
      p.fila === fila && p.posto === column
    )

    return posto ? posto.occupato : false;
  }


  selezionaSedia(row: number, seat: number) {
    const selectSeat = document.getElementsByClassName('seat');
    const pos = row * this.SEDIE_PER_FILA + seat - 1;
    if (!selectSeat[pos].classList.contains('selected')) {
      selectSeat[pos].classList.add('selected');
    } else {
      selectSeat[pos].classList.remove('selected');
    }

    this.sedieSelezionate++;
    this.selectedSeats.push([row, seat]);
    console.log(this.selectedSeats);
  }

  changeBigliettoIntero(add: boolean) {
    if (add) {
      this.bigliettiInteri++;
    } else {
      if (this.bigliettiInteri <= 1) return;
      this.bigliettiInteri--;
    }

    this.onTicketChange();
  }

  changeBigliettoRidotto(add: boolean) {
    if (add) {
      this.bigliettiRidotti++;
    } else {
      if (this.bigliettiRidotti <= 0) return;
      this.bigliettiRidotti--;
    }

    this.onTicketChange();
  }

  calculateCost() {
    this.prezzo = this.bigliettiInteri * 10 + this.bigliettiRidotti * 7
  }
  onTicketChange() {

    const maxSeats = this.numFile * this.SEDIE_PER_FILA;

    // empty input
    if (!this.bigliettiInteri || this.bigliettiInteri < 1) {
      this.bigliettiInteri = 1;
    }

    // empty input 2
    if (!this.bigliettiRidotti || this.bigliettiRidotti < 0) {
      this.bigliettiRidotti = 0;
    }

    if (this.bigliettiInteri > maxSeats) {
      this.bigliettiInteri = maxSeats;
    }

    if (this.bigliettiRidotti > maxSeats) {
      this.bigliettiRidotti = maxSeats;
    }

    this.calculateCost();
  }

  prenotazioneCheck(){
    const maxSeats = this.numFile * this.SEDIE_PER_FILA;
    const total = this.bigliettiInteri + this.bigliettiRidotti;

    if (total > maxSeats) {
      alert("Hai superato il numero massimo di posti disponibili.");
      return;
    }

    if (this.selectedSeats.length !== total) {
      alert("Devi selezionare un numero di posti uguale ai biglietti scelti.");
      return;
    }
  }

  confermaPrenotazione() {
    this.prenotazioneCheck()

    

    console.log("Prenotazione confermata");
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
