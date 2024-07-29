//creazione di un contatore per gli id dei mezzi (generazione id incrementali automatici)
export const globalMezzoCounters = {
    bici: 0,
    scooter: 0,
    monopattino: 0
};
export function aggiornaContatoriGlobali(mezzi) {
    mezzi.forEach(mezzo => {
        const tipo = mezzo.tipo;
        const idNumero = parseInt(mezzo.id.slice(1));
        if (idNumero > globalMezzoCounters[tipo]) {
            globalMezzoCounters[tipo] = idNumero;
        }
    });
}
;
export function generaIdMezzo(tipo) {
    globalMezzoCounters[tipo]++;
    return `${tipo.charAt(0)}${globalMezzoCounters[tipo]}`;
}
;
