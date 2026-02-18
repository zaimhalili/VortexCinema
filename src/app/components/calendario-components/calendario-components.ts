import { ChangeDetectorRef, Component } from '@angular/core';
import { CinemaService } from '../../services/cinema-service';
import { FilmDetails } from '../../models/FilmDetails';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calendario-components',
  imports: [CommonModule, RouterModule],
  templateUrl: './calendario-components.html',
  styleUrl: './calendario-components.css',
})
export class CalendarioComponents {
  days = Array(5).fill(0).map((_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; });
  films: FilmDetails[] = [];
  selectedDate = new Date();

  constructor(service: CinemaService, private cd: ChangeDetectorRef) {
    service.getAll().subscribe(f => f.forEach(film => service.getOne(film.id).subscribe(d => {
      this.films.push(d);
      this.cd.detectChanges();
    })));
  }

  getShows(film: FilmDetails) {
    return film.spettacoli.filter(s => s.data === this.selectedDate.toISOString().split('T')[0]);
  }

  formatTime(time: string): string {
    return time.substring(0, 5);
  }
}
