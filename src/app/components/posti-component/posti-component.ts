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
  selectedSeats: { fila: number, posto: number }[] = [];
  numBiglietti : number = this.bigliettiInteri + this.bigliettiRidotti

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

    this.numBiglietti = this.bigliettiInteri + this.bigliettiRidotti;

    for (let i = 0; i < this.selectedSeats.length; i++) {
      if (
        this.selectedSeats[i].fila === fila &&
        this.selectedSeats[i].posto === seat
      ) {
        this.selectedSeats.splice(i, 1);
        return;
      }
    }

    if (this.selectedSeats.length >= this.numBiglietti) return;

    this.selectedSeats.push({ fila, posto: seat });
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

  calculateCost() : number{
    this.prezzo = this.bigliettiInteri * 10 + this.bigliettiRidotti * 7
    return this.prezzo
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

  prenotazioneCheck(): boolean {

    const maxSeats = this.numFile * this.SEDIE_PER_FILA;
    this.numBiglietti = this.bigliettiInteri + this.bigliettiRidotti;

    if (this.numBiglietti > maxSeats) {
      alert("Hai superato il numero massimo di posti disponibili.");
      return false;
    }

    if (this.selectedSeats.length !== this.numBiglietti) {
      alert("Devi selezionare un numero di posti uguale ai biglietti scelti.");
      return false;
    }

    return true;
  }


  confermaPrenotazione() {
    if (!this.prenotazioneCheck()) return;

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
