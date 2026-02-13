import { Routes } from '@angular/router';
import { BodyComponent } from './components/body-component/body-component';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
    { path: "", component: BodyComponent },
    { path: "**", component: NotFound },
];
