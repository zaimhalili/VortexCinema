import { Routes } from '@angular/router';
import { BodyComponent } from './components/body-component/body-component';
import { SchedaFilm } from './components/scheda-film/scheda-film';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
    { path: "", component: BodyComponent },
    { path: "film/:id", component: SchedaFilm },
    { path: "**", component: NotFound },
];
