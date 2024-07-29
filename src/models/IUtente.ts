import { IMezzo } from "./IMezzo";

export interface IUtente{
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: string;

    prenotaMezzo(mezzo: IMezzo): void;
}