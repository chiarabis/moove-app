import { Mezzo } from "../models/Mezzo.js";

//creazione di un contatore per gli id dei mezzi (generazione id incrementali automatici)
export const globalMezzoCounters: { [key: string]: number } = {
    bici: 0,
    scooter: 0,
    monopattino: 0
};

export function aggiornaContatoriGlobali(mezzi: Mezzo[]): void { //: void
    mezzi.forEach(mezzo => {
        const tipo = mezzo.tipo;
        const idNumero = parseInt(mezzo.id.slice(1));
        if (idNumero > globalMezzoCounters[tipo]) {
            globalMezzoCounters[tipo] = idNumero;
        }
    });
};

export function generaIdMezzo(tipo: string): string {
    globalMezzoCounters[tipo]++;
    return `${tipo.charAt(0)}${globalMezzoCounters[tipo]}`;
};