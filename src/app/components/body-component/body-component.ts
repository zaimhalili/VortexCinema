import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CinemaService } from '../../services/cinema-service';
import { Film } from '../../models/Film';

@Component({
  standalone: true,
  selector: 'app-body-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './body-component.html',
  styleUrl: './body-component.css',
})
export class BodyComponent {
  formatDuration(minutes: number): string {
    if (minutes == null || !minutes) return '';

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mins === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${mins}m`;
  }


  films: Film[] = [];

  constructor(private cinemaService: CinemaService) { }

  ngOnInit() {
    this.cinemaService.getAll().subscribe((films) => {
      console.log(films);
      this.films = films;
    });
  }
}

