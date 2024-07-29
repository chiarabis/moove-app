import { IMezzo } from "./IMezzo";
import { IUtente } from "./IUtente";

export class Mezzo implements IMezzo{
    id: string;
    tipo: string;
    statoDisponibile: boolean;
    utenteAssegnato?: IUtente;
    aggiuntoDaUtente: boolean;
    tariffaOraria: number;

    constructor(id: string, tipo: string, tariffaOraria: number, aggiuntoDaUtente: boolean = false){
        this.id = id;
        this.tipo = tipo;
        this.statoDisponibile = true;
        this.aggiuntoDaUtente = aggiuntoDaUtente;
        this.tariffaOraria = tariffaOraria;
    }

    getTariffaGiornaliera(): number {
        return this.tariffaOraria * 24 * 0.4;
    }

    getTariffaMensile(): number {
        return this.getTariffaGiornaliera() * 30 * 0.4;
    }

    assegnaUtente(utente: IUtente): void {
        if(this.statoDisponibile){
            this.utenteAssegnato = utente;
            this.statoDisponibile = false;
            console.log(`Il mezzo ${this.tipo} con ID ${this.id} è stato assegnato a ${utente.nome} ${utente.cognome}.`);
        }else{
            console.log(`Il mezzo ${this.tipo} con ID ${this.id} è disponibile.`)
        }
    }
}