import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FilmDetails } from '../../models/FilmDetails';
import { CinemaService } from '../../services/cinema-service';
import { Film } from '../../models/Film';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-scheda-film',
  imports: [CommonModule, RouterLink],
  templateUrl: './scheda-film.html',
  styleUrl: './scheda-film.css',
})
export class SchedaFilm {
  rows: Array<number[]> = [];
  readonly ROWS = 15;
  readonly SEATS_PER_ROW = 20;

  formatDuration(minutes: number): string {
    if (minutes == null || !minutes) return '';

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mins === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${mins}m`;
  }

  getEndTime(orario: string, durata: number): string {

    if (!orario || !durata) return '';

    const parts = orario.split(':');

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    let totalMinutes = hours * 60 + minutes;

    totalMinutes += durata;

    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;

    const formattedHours = endHours < 10 ? '0' + endHours : endHours;
    const formattedMinutes = endMinutes < 10 ? '0' + endMinutes : endMinutes;

    return `${formattedHours}:${formattedMinutes}`;
  }

  formatTime(orario: string): string {
    if (!orario) return '';

    const parts = orario.split(':');
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  }

  formatDate(data: string): string {
    if (!data) return '';
    const parts = data.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  filmDetails: FilmDetails | undefined

  constructor(private cinemaService: CinemaService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    let id = Number(this.route.snapshot.paramMap.get("id"))

    // Genera la griglia di posti (15 file × 20 posti)
    for (let i = 1; i <= this.ROWS; i++) {
      const row: number[] = [];
      for (let j = 1; j <= this.SEATS_PER_ROW; j++) {
        row.push(j);
      }
      this.rows.push(row);
    }

    this.cinemaService.getOne(id).subscribe((film) => {
      // console.log(film)  
      this.filmDetails = film
      cd.detectChanges()
    })
  }
} 
