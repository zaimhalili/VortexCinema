import { Routes } from '@angular/router';
import { BodyComponent } from './components/body-component/body-component';
import { SchedaFilm } from './components/scheda-film/scheda-film';
import { FilmComponent } from './components/film-component/film-component';
import { NotFound } from './components/not-found/not-found';
import { ChiSiamo } from './components/chi-siamo/chi-siamo';
import { PostiComponent } from './components/posti-component/posti-component';



export const routes: Routes = [
    { path: "", component: BodyComponent },
    { path: "filmList", component: FilmComponent },
    { path: "film/:id", component: SchedaFilm },
    { path: "acquista/:id", component: PostiComponent },
    { path: "chisiamo", component: ChiSiamo},
    { path: "**", component: NotFound },
];
