import { Film } from "./Film"

export class FilmDetails extends Film {
    trama: string = ""
    regista: string = ""
    attori: string = ""
    spettacoli: Spettacolo[] = []
}

export class Spettacolo {
    id: number = 0
    idFilm: number = 0
    idSala: number = 0
    data: string = ""
    orario: string = ""
}