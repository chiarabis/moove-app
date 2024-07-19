interface IMezzo {
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

interface IUtente{
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: string;

    prenotaMezzo(mezzo: IMezzo): void;
}

interface ICitta{
    nome: string;
    mezziDisponibili: IMezzo[];

    aggiungiMezzo(mezzo: IMezzo): void;
    rimuoviMezzo(id: string): void;
}

class Mezzo implements IMezzo{
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

class Utente implements IUtente{
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: string;

    constructor(nome: string, cognome: string, email: string, metodoPagamento: string){
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamento = metodoPagamento;
    }

    prenotaMezzo(mezzo: IMezzo): void {
        if(mezzo.statoDisponibile){
            mezzo.assegnaUtente(this)
        }else{
            console.log(`Il mezzo ${mezzo.tipo} con ID ${mezzo.id} è già stato prenotato.`)
        }
    }
}

class Citta implements ICitta{
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

const globalMezzoCounters: { [key: string]: number } = {
    bici: 0,
    scooter: 0,
    monopattino: 0
};

function aggiornaContatoriGlobali(mezzi: Mezzo[]) {
    mezzi.forEach(mezzo => {
        const tipo = mezzo.tipo;
        const idNumero = parseInt(mezzo.id.slice(1));
        if (idNumero > globalMezzoCounters[tipo]) {
            globalMezzoCounters[tipo] = idNumero;
        }
    });
};


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

function generaIdMezzo(tipo: string): string {
    globalMezzoCounters[tipo]++;
    return `${tipo.charAt(0)}${globalMezzoCounters[tipo]}`;
}

const utenti: {[key: string]: Utente} = {
    utente1: new Utente('mario', 'rossi', 'mario.rossi@example.com', 'carta di credito'),
    utente2: new Utente('luca', 'bianchi', 'luca.bianchi@example.com', 'paypal'),
    utente3: new Utente('sara', 'verdi', 'sara.verdi@example.com', 'satispay'),
}

const citta: {[key: string]: Citta} = {
    citta1: new Citta('Milano', [mezzi.bici1, mezzi.scooter1, mezzi.monopattino1]),
    citta2: new Citta('Verona', [mezzi.bici2, mezzi.scooter2, mezzi.monopattino2]),
    citta3: new Citta('Roma', [mezzi.bici3, mezzi.scooter3, mezzi.monopattino3]),
}

utenti.utente1.prenotaMezzo(mezzi.bici1);
utenti.utente2.prenotaMezzo(mezzi.scooter3);
utenti.utente3.prenotaMezzo(mezzi.monopattino2);

document.addEventListener("DOMContentLoaded", () => {
    const selectCitta = document.getElementById('citta') as HTMLSelectElement;
    const mezziDisponibiliDiv = document.getElementById('mezziDisponibili') as HTMLDivElement;
    const mezziInfo = document.getElementById('mezziInfo') as HTMLDivElement; 
    const aggiungiMezzoBtn = document.getElementById('aggiungiMezzoBtn') as HTMLButtonElement;
    const tipoMezzoSelect = document.getElementById('tipoMezzo') as HTMLSelectElement;
    const form = document.getElementById('form') as HTMLFormElement;
    const totalAmount = document.getElementById('totale') as HTMLParagraphElement;

    function capitalizeFirstLetter(string: string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    for (const key in citta) {
        if (citta.hasOwnProperty(key)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = citta[key].nome;
            selectCitta.appendChild(option);
        }
    };

    function aggiornaMezziDiv(citta: Citta) {
        const mezzi = citta.mezziDisponibili;
        /*const mezziHTML = mezzi.map(mezzo => `
            <div class="flexrow">
                <div class="flexrow idBox">
                    <p style="text-transform: capitalize;">${mezzo.tipo}</p>
                    <p class="bg-colored" style="margin-left: 3px;">ID: ${mezzo.id}</p>
                </div>
                <span style="margin: 0 10px; color: ${mezzo.statoDisponibile ? 'rgb(9,181,32)' : 'rgb(234,12,12)'};">●</span>
                
                ${mezzo.statoDisponibile ? `<button class="formBtn" data-id="${mezzo.id}">Prenota</button>`
                    : '<span class="status">Non disponibile</span>'}
                ${mezzo.aggiuntoDaUtente ? `<button class="rimuoviMezzoBtn" data-id="${mezzo.id}"><img src="./assets/icons8-bin-24.png"/></button>` : ''}
            </div>
            `).join('');
        mezziDisponibiliDiv.innerHTML = `
            <p>Mezzi disponibili a ${citta.nome}</p>
            <div class="table">${mezziHTML}
            </div>
        `;*/
        /*`<div class="slideshow">${mezzo.utenteAssegnato ?
        <span class="prenotato">In uso da ${mezzo.utenteAssegnato.nome} ${mezzo.utenteAssegnato.cognome}</span>
        : ''}</div>`*/
        const mezziHTML = mezzi.map(mezzo => {
            if (mezzo.statoDisponibile) {
                return `
                    <div class="flexrow">
                        <div class="flexrow idBox">
                            <p style="text-transform: capitalize;">${mezzo.tipo}</p>
                            <p class="bg-colored" style="margin-left: 3px;">ID: ${mezzo.id}</p>
                        </div>
                        <span style="margin: 0 10px; color: rgb(9,181,32);">●</span>
                        <button class="formBtn" data-id="${mezzo.id}">Prenota</button>
                        ${mezzo.aggiuntoDaUtente ? `<button class="rimuoviMezzoBtn" data-id="${mezzo.id}"><img src="./assets/icons8-bin-24.png"/></button>` : ''}
                    </div>`;
            } else {
                let userHTML = '';
                if (mezzo.utenteAssegnato) {
                    userHTML = `<p class="status">In uso da 
                        ${capitalizeFirstLetter(mezzo.utenteAssegnato.nome)} ${capitalizeFirstLetter(mezzo.utenteAssegnato.cognome)}
                    </p>`;
                } 
                return `
                <div class="flexrow">
                    <div class="flexrow idBox">
                        <p style="text-transform: capitalize;">${mezzo.tipo}</p>
                        <p class="bg-colored" style="margin-left: 3px;">ID: ${mezzo.id}</p>
                    </div>
                    <span style="margin: 0 10px; color: rgb(234,12,12);">●</span>
                    <div class="slider">
                        ${userHTML}
                        <p class="status">Non disponibile</p>
                    </div>
                </div>`;
            }
        }).join('');
        
        mezziDisponibiliDiv.innerHTML = `<p>Mezzi disponibili a ${citta.nome}</p><div class="table">${mezziHTML}</div>`;


        const rimuoviMezzoBtn = document.querySelectorAll('.rimuoviMezzoBtn');
        rimuoviMezzoBtn.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const target = event.currentTarget as HTMLButtonElement;
                const id = target.dataset.id;
                if (id) {
                    citta.rimuoviMezzo(id);
                    aggiornaMezziDiv(citta);
                }
            });
        });

        const formBtn = document.querySelectorAll('.formBtn');
        formBtn.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const target = event.currentTarget as HTMLButtonElement;
                const id = target.dataset.id;
                const formTitolo = form.querySelector('h4');
                if (formTitolo) {
                    formTitolo.innerHTML = `Prenotazione per <span class="bg-colored">ID: ${id}</span>`;
                }
                if(id){
                    const mezzo = citta.mezziDisponibili.find(m => m.id === id);
                    if(mezzo){
                        (document.getElementById('tariffaOraria') as HTMLSpanElement).textContent = `${mezzo.tariffaOraria} €/h`;
                        (document.getElementById('tariffaGiornaliera') as HTMLSpanElement).textContent = `${mezzo.getTariffaGiornaliera().toFixed(2)} €/giorno`;
                        (document.getElementById('tariffaMensile') as HTMLSpanElement).textContent = `${mezzo.getTariffaMensile().toFixed(2)} €/mese`;
                    }
                    form.style.display = 'flex';
                }
            })
        });
        

        const prenotaMezzoBtn = document.querySelectorAll('.prenotaMezzoBtn');
        prenotaMezzoBtn.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const target = event.currentTarget as HTMLButtonElement;
                const id = target.dataset.id;
                if (id) {
                    prenotaMezzo(citta, id);
                    aggiornaMezziDiv(citta);
                }
            });
        });
    };

    function prenotaMezzo(citta: Citta, id: string) {
        const mezzo = citta.mezziDisponibili.find(mezzo => mezzo.id === id);
        if (mezzo && mezzo.statoDisponibile) {
            mezzo.statoDisponibile = false;
            console.log(`Il mezzo ${mezzo.tipo} con ID ${mezzo.id} è prenotato.`);
        } else {
            console.error(`Non è possibile prenotare il mezzo ID ${id}.`);
        }
    };

    selectCitta.addEventListener('change', () => {
        const optionCitta = selectCitta.value;
        const selectedCitta = citta[optionCitta];

        if(selectedCitta){
            mezziInfo.style.display = 'flex';
            aggiornaMezziDiv(selectedCitta);
        }else{
            console.error(`Città non valida: ${optionCitta}`);
        }
    });

    aggiungiMezzoBtn.addEventListener('click', () => {
        const optionCitta = selectCitta.value;
        const selectedCitta = citta[optionCitta];

        if (selectedCitta) {
            const tipoMezzo = tipoMezzoSelect.value;

            if (tipoMezzo) {
                const nuovoIdMezzo = generaIdMezzo(tipoMezzo);
                const tariffaOraria = tipoMezzo === 'bici' ? 2 : tipoMezzo === 'scooter' ? 2.5 : 1.5;
                const nuovoMezzo = new Mezzo(nuovoIdMezzo, tipoMezzo, tariffaOraria, true);
                selectedCitta.aggiungiMezzo(nuovoMezzo);
                
                aggiornaMezziDiv(selectedCitta);
            } else {
                console.error('Inserire il tipo di mezzo.');
            }
        } else {
            console.error(`Città non valida: ${optionCitta}`);
        }
        
    });

    function calcolaTotale(mezzo: Mezzo) {
        const tariffa = (document.querySelector('input[name="tariffa"]:checked') as HTMLInputElement).value;
        let totale = 0;

        if (tariffa === 'hour') {
            const ore = parseInt((document.getElementById('totalHours') as HTMLInputElement).value) || 0;
            totale = ore * mezzo.tariffaOraria;
        } else if (tariffa === 'day') {
            const giorni = parseInt((document.getElementById('totalDays') as HTMLInputElement).value) || 0;
            totale = giorni * mezzo.getTariffaGiornaliera();
        } else if (tariffa === 'month') {
            const mesi = parseInt((document.getElementById('totalMonths') as HTMLInputElement).value) || 0;
            totale = mesi * mezzo.getTariffaMensile();
        }

        totalAmount.textContent = `${totale.toFixed(2)} €`;
    };

    form.addEventListener('input', () => {
        const mezzoId = form.querySelector('h4')?.textContent?.match(/ID: (\w+)/)?.[1];
        if (mezzoId) {
            const selectedCitta = citta[selectCitta.value];
            const mezzo = selectedCitta?.mezziDisponibili.find(m => m.id === mezzoId);
            if (mezzo) {
                calcolaTotale(mezzo);
            }
        }
    });

    const radioButtons = document.querySelectorAll('input[name="tariffa"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            const tariffa = target.value;

            (document.getElementById('totalHours') as HTMLInputElement).required = tariffa === 'hour';
            (document.getElementById('totalDays') as HTMLInputElement).required = tariffa === 'day';
            (document.getElementById('totalMonths') as HTMLInputElement).required = tariffa === 'month';
            
        });
    });
    (document.getElementById('totalHours') as HTMLInputElement).required = true;

    if (selectCitta.value) {
        const initialCitta = citta[selectCitta.value];
        if (initialCitta) {
            aggiornaMezziDiv(initialCitta);
            mezziInfo.style.display = 'flex';
        }
    }
    
    const popupOverlay = document.getElementById('popupOverlay') as HTMLDivElement;
    const popup = document.getElementById('popup') as HTMLDivElement;
    const closePopup = document.getElementById('closePopup') as HTMLSpanElement;
    const popupNome = document.getElementById('popupNome') as HTMLParagraphElement;
    const popupCognome = document.getElementById('popupCognome') as HTMLParagraphElement;
    const popupEmail = document.getElementById('popupEmail') as HTMLParagraphElement;
    const popupMetodoPagamento = document.getElementById('popupMetodoPagamento') as HTMLParagraphElement;
    const popupTotale = document.getElementById('popupTotale') as HTMLParagraphElement;

    function showPopup(nome: string, cognome: string, email: string, metodoPagamento: string, totale: number) {
        popupNome.textContent = `Nome: ${capitalizeFirstLetter(nome)}`;
        popupCognome.textContent = `Cognome: ${capitalizeFirstLetter(cognome)}`;
        popupEmail.textContent = `Email: ${email}`;
        popupMetodoPagamento.textContent = `Metodo di pagamento: ${capitalizeFirstLetter(metodoPagamento)}`;
        popupTotale.textContent = `Totale: ${totale}€`;

        popupOverlay.style.display = 'block';
        popup.style.display = 'block';
    }
    function hidePopup() {
        popupOverlay.style.display = 'none';
        popup.style.display = 'none';
    }

    closePopup.addEventListener('click', hidePopup);
    popupOverlay.addEventListener('click', hidePopup);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedCitta = citta[selectCitta.value];
        if (selectedCitta) {
            const mezzoId = form.querySelector('h4')?.textContent?.match(/ID: (\w+)/)?.[1];
            const mezzo = selectedCitta.mezziDisponibili.find(m => m.id === mezzoId);
            if (mezzo) {
                const nome = (document.getElementById('firstname') as HTMLInputElement).value;
                const cognome = (document.getElementById('lastname') as HTMLInputElement).value;
                const email = (document.getElementById('email') as HTMLInputElement).value;
                const metodoPagamento = (document.querySelector('input[name="payment"]:checked') as HTMLInputElement).value;
                const tariffa = (document.querySelector('input[name="tariffa"]:checked') as HTMLInputElement).value;
                let totale = 0;

                if (tariffa === 'hour') {
                    const ore = parseInt((document.getElementById('totalHours') as HTMLInputElement).value);
                    totale = ore * mezzo.tariffaOraria;
                } else if (tariffa === 'day') {
                    const giorni = parseInt((document.getElementById('totalDays') as HTMLInputElement).value);
                    totale = giorni * mezzo.getTariffaGiornaliera();
                } else if (tariffa === 'month') {
                    const mesi = parseInt((document.getElementById('totalMonths') as HTMLInputElement).value);
                    totale = mesi * mezzo.getTariffaMensile();
                }

                const utente = new Utente(nome, cognome, email, metodoPagamento);
                utente.prenotaMezzo(mezzo);

                const nuovoIdUtente = `utente${Object.keys(utenti).length + 1}`;
                utenti[nuovoIdUtente] = utente;

                showPopup(nome, cognome, email, metodoPagamento, totale);
                console.log(`Prenotazione confermata: ${nome} ${cognome}, ${email}, metodo di pagamento: ${metodoPagamento}, totale: ${totale}€`);
                
                form.style.display = 'none';
                aggiornaMezziDiv(selectedCitta);
            }
        }
    });

    const closeForm = document.getElementById('closeForm');
    closeForm?.addEventListener('click', ()=> {
        form.style.display = 'none';
    });
});