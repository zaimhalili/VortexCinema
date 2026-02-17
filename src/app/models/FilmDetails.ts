import { Film } from "./Film"
import { Spettacolo } from "./Spettacolo"


export class FilmDetails extends Film {
    trama: string = ""
    regista: string = ""
    attori: string = ""
    spettacoli: Spettacolo[] = []
}
