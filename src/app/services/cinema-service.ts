import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Film } from "../models/Film";
import { FilmDetails } from "../models/FilmDetails";
import { SpettacoloPostiResponse } from "../models/SpettacoloPostiResponse";

@Injectable({
    providedIn: 'root'
})

export class CinemaService {

    constructor(private http: HttpClient) { }
    getAll(): Observable<Film[]> {
        return this.http.get<Film[]>("https://cinemaapi-97482589905.europe-west8.run.app/api/v1/film?select=id,titolo,durata,copertina,anno")
    }

    getOne(id: number): Observable<FilmDetails> {
        return this.http.get<FilmDetails>(`https://cinemaapi-97482589905.europe-west8.run.app/api/v1/film/${id}`)
    }

    getSeat(id: number): Observable<SpettacoloPostiResponse> {
        return this.http.get<SpettacoloPostiResponse>(`https://cinemaapi-97482589905.europe-west8.run.app/api/v1/acquista/${id}`)
    }

    acquista(idSpettacolo: number, posti: any[]) {
        return this.http.post(`https://cinemaapi-97482589905.europe-west8.run.app/api/v1/acquista/${idSpettacolo}`,
            posti
        );
    }
}   