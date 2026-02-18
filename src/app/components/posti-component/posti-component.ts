import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Posti } from '../../models/Posti';
import { CinemaService } from '../../services/cinema-service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


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
  prezzo: number = 0;
  idSpettacolo: number = 0
  selectedSeats: {
    fila: number,
    posto: number,
    tipo: 'INTERO' | 'RIDOTTO'
  }[] = [];
  isProcessing: boolean = false;
  showSuccessModal: boolean = false;

  constructor(private cinemaService: CinemaService, private route: ActivatedRoute) { }

  ngOnInit() {
    for (let i = 0; i < this.numFile; i++) {
      const row: number[] = [];

      for (let j = 1; j <= this.SEDIE_PER_FILA; j++) {
        row.push(j);
      }

      this.rows.push(row);
    }

    this.idSpettacolo = Number(this.route.snapshot.paramMap.get('id'))

    this.cinemaService.getSeat(this.idSpettacolo).subscribe(res => {
      this.posti = res.posti
    })
  }

  getImporto(tipo: "INTERO" | "RIDOTTO") {
    return tipo === "RIDOTTO" ? 7 : 10
  }

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

  removeSelectedSeat(fila: number, posto: number) {
    for (let i = 0; i < this.selectedSeats.length; i++) {

      if (
        this.selectedSeats[i].fila === fila &&
        this.selectedSeats[i].posto === posto
      ) {

        this.selectedSeats.splice(i, 1);
        break; // stop loop after removing
      }
    }

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
    if (this.selectedSeats.length === 0 || this.isProcessing) {
      alert("Seleziona almeno un posto.");
      return;
    }

    const data: any[] = []

    for (let s of this.selectedSeats) {
      data.push({
        idSpettacolo: this.idSpettacolo,
        fila: s.fila,
        posto: s.posto,
        ridotto: s.tipo === 'RIDOTTO',
        importo: this.getImporto(s.tipo)
      })
    }

    this.cinemaService.acquista(this.idSpettacolo, data)
      .subscribe(() => {

        this.showSuccessModal = true;
        this.selectedSeats = [];
        this.calculateCost();

        this.cinemaService.getSeat(this.idSpettacolo)
          .subscribe(res => {
            this.posti = res.posti;
          });

        this.isProcessing = false;
      });
  }



}
