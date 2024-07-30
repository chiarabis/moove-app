export class Utente {
    constructor(nome, cognome, email, metodoPagamento) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamento = metodoPagamento;
    }
    prenotaMezzo(mezzo) {
        if (mezzo.statoDisponibile) {
            mezzo.assegnaUtente(this);
        }
        else {
            console.log(`Il mezzo ${mezzo.tipo} con ID ${mezzo.id} è già stato prenotato.`);
        }
    }
}
