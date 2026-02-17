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
  readonly numFile = 15;
  readonly SEDIE_PER_FILA = 20;

  selected:boolean = false;


  selezionaSedia() {
    const selectSeat = document.getElementsByClassName('seat');

    if(!this.selected){
      selectSeat[0].classList.add('selected');
      this.selected = true;
    }else{
      selectSeat[0].classList.remove('selected');
      this.selected = false;
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
  }


}
