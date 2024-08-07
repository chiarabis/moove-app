import { Citta } from '../models/Citta';
import { Utente } from '../models/Utente';
import { showPopup } from './popupHandler';
import { handleRequiredRate, getRates } from './rateUtils';
import { getElementById } from './domUtils';

export function handleFormSubmit(
    form: HTMLFormElement, 
    selectCitta: HTMLSelectElement, 
    citta: Record<string, Citta>, 
    utenti: Record<string, Utente>,
    aggiornaMezziDiv: (citta: Citta) => void
): void {
    form.addEventListener('submit', (event) => {
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

                form.reset();
            }
        }
    });
};

export function handleFormInput(form: HTMLFormElement, selectCitta: HTMLSelectElement, citta: Record<string, Citta>, totalAmount: HTMLParagraphElement) {
    form.addEventListener('input', () => {
        const mezzoId = form.querySelector('h4')?.textContent?.match(/ID: (\w+)/)?.[1];
        if (mezzoId) {
            const selectedCitta = citta[selectCitta.value];
            const mezzo = selectedCitta?.mezziDisponibili.find(m => m.id === mezzoId);
            if (mezzo) {
                getRates(mezzo, totalAmount);
                handleRequiredRate();
            }
        }
    });
};

export function handleCloseForm(form: HTMLFormElement): void {
    const closeForm = getElementById<HTMLImageElement>('closeForm');
    closeForm?.addEventListener('click', ()=> {
        form.style.display = 'none';
        form.reset();
    });
};
