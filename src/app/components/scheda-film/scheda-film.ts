import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FilmDetails } from '../../models/FilmDetails';
import { CinemaService } from '../../services/cinema-service';
import { Film } from '../../models/Film';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-scheda-film',
  imports: [CommonModule],
  templateUrl: './scheda-film.html',
  styleUrl: './scheda-film.css',
})
export class SchedaFilm {
  filmDetails : FilmDetails | undefined

  constructor(private cinemaService : CinemaService, private route: ActivatedRoute, private cd:ChangeDetectorRef){
    let id = Number(this.route.snapshot.paramMap.get("id"))

    this.cinemaService.getOne(id).subscribe((film) => {
      this.filmDetails = film
      cd.detectChanges()
    })
  }
} 
