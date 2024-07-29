import { ICitta } from "./ICitta";
import { IMezzo } from "./IMezzo";

export class Citta implements ICitta{
    nome: string;
    mezziDisponibili: IMezzo[];

    constructor(nome: string, mezziDisponibili: IMezzo[] = []){
        this.nome = nome;
        this.mezziDisponibili = mezziDisponibili;
    }

    aggiungiMezzo(mezzo: IMezzo): void {
        this.mezziDisponibili.push(mezzo);
        console.log(`Il mezzo ${mezzo.tipo} con ID ${mezzo.id} è stato aggiunto a ${this.nome}`)
    }
    rimuoviMezzo(id: string): void {
        this.mezziDisponibili = this.mezziDisponibili.filter(mezzo => mezzo.id !== id);
        console.log(`Il mezzo con ID ${id} è stato rimosso da ${this.nome}`);
    }
}