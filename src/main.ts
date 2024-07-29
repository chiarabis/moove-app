import { Mezzo } from "./models/Mezzo.js";
import { Utente } from "./models/Utente.js";
import { Citta } from "./models/Citta.js";

import { aggiornaContatoriGlobali } from "./utils/counters.js";

//istanza di alcuni mezzi
const mezzi: {[key: string]: Mezzo} = {
    bici1: new Mezzo('b1', 'bici', 2),
    bici2: new Mezzo('b2', 'bici', 2),
    bici3: new Mezzo('b3', 'bici', 2),
    scooter1: new Mezzo('s1', 'scooter', 2.5),
    scooter2: new Mezzo('s2', 'scooter', 2.5),
    scooter3: new Mezzo('s3', 'scooter', 2.5),
    monopattino1: new Mezzo('m1', 'monopattino', 1.5),
    monopattino2: new Mezzo('m2', 'monopattino', 1.5),
    monopattino3: new Mezzo('m3', 'monopattino', 1.5),
}
aggiornaContatoriGlobali(Object.keys(mezzi).map(key => mezzi[key]));

//istanza di alcuni utenti
const utenti: {[key: string]: Utente} = {
    utente1: new Utente('galileo', 'galilei', 'galile.o.i@example.com', 'carta di credito'),
    utente2: new Utente('frida', 'khalo', 'frida.khalo@example.com', 'paypal'),
    utente3: new Utente('alessandro', 'magno', 'ale.magno@example.com', 'satispay'),
}

//istanza di alcune città
const citta: {[key: string]: Citta} = { //Record<string, Citta>
    citta1: new Citta('Milano', [mezzi.bici1, mezzi.scooter1, mezzi.monopattino1]),
    citta2: new Citta('Verona', [mezzi.bici2, mezzi.scooter2, mezzi.monopattino2]),
    citta3: new Citta('Roma', [mezzi.bici3, mezzi.scooter3, mezzi.monopattino3]),
}

utenti.utente1.prenotaMezzo(mezzi.bici1);
utenti.utente2.prenotaMezzo(mezzi.scooter3);
utenti.utente3.prenotaMezzo(mezzi.monopattino2);

export {mezzi, utenti, citta};