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
  formatDuration(duration: number) {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours}h ${minutes}min`
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

