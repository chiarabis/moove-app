import { IUtente } from "./IUtente.ts";

export interface IMezzo {
    id: string;
    tipo: string;
    statoDisponibile: boolean;
    utenteAssegnato?: IUtente;
    aggiuntoDaUtente: boolean;
    tariffaOraria: number;

    getTariffaGiornaliera(): number;
    getTariffaMensile(): number;
    assegnaUtente(utente: IUtente): void;
}