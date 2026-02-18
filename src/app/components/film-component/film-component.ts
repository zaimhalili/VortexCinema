
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemaService } from '../../services/cinema-service';
import { FilmDetails } from '../../models/FilmDetails';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-film-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './film-component.html',
  styleUrl: './film-component.css',
})

export class FilmComponent implements OnInit {
  films: FilmDetails[] = [];

  constructor(private cinemaService: CinemaService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cinemaService.getAll().subscribe((data: any[]) => {
      const filmIds = data.slice(0, 5).map(f => f.id);
      filmIds.forEach(id => {
        this.cinemaService.getOne(id).subscribe(filmDetails => {
          this.films.push(filmDetails);
          this.cd.detectChanges();
        });
      });
    });
  }

  formatDuration(minutes: number): string {
    if (minutes == null || !minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${mins}m`;
  }
}
