export class Mezzo {
    constructor(id, tipo, tariffaOraria, aggiuntoDaUtente = false) {
        this.id = id;
        this.tipo = tipo;
        this.statoDisponibile = true;
        this.aggiuntoDaUtente = aggiuntoDaUtente;
        this.tariffaOraria = tariffaOraria;
    }
    getTariffaGiornaliera() {
        return this.tariffaOraria * 24 * 0.4;
    }
    getTariffaMensile() {
        return this.getTariffaGiornaliera() * 30 * 0.4;
    }
    assegnaUtente(utente) {
        if (this.statoDisponibile) {
            this.utenteAssegnato = utente;
            this.statoDisponibile = false;
            console.log(`Il mezzo ${this.tipo} con ID ${this.id} è stato assegnato a ${utente.nome} ${utente.cognome}.`);
        }
        else {
            console.log(`Il mezzo ${this.tipo} con ID ${this.id} è disponibile.`);
        }
    }
}
