export class Citta {
    constructor(nome, mezziDisponibili = []) {
        this.nome = nome;
        this.mezziDisponibili = mezziDisponibili;
    }
    aggiungiMezzo(mezzo) {
        this.mezziDisponibili.push(mezzo);
        console.log(`Il mezzo ${mezzo.tipo} con ID ${mezzo.id} è stato aggiunto a ${this.nome}`);
    }
    rimuoviMezzo(id) {
        this.mezziDisponibili = this.mezziDisponibili.filter(mezzo => mezzo.id !== id);
        console.log(`Il mezzo con ID ${id} è stato rimosso da ${this.nome}`);
    }
}
