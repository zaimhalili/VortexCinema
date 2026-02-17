import { Posti } from "./Posti";
import { Spettacolo } from "./Spettacolo";

export class SpettacoloPostiResponse{
    spettacolo: Spettacolo = new Spettacolo()
    posti: Posti[] = []
}