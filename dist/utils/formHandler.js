import { Utente } from '../models/Utente.js';
import { showPopup } from './popupHandler.js';
import { handleRequiredRate, getRates } from './rateUtils.js';
import { getElementById } from './domUtils.js';
export function handleFormSubmit(form, selectCitta, citta, utenti, aggiornaMezziDiv) {
    form.addEventListener('submit', (event) => {
        var _a, _b, _c;
        const selectedCitta = citta[selectCitta.value];
        if (selectedCitta) {
            const mezzoId = (_c = (_b = (_a = form.querySelector('h4')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.match(/ID: (\w+)/)) === null || _c === void 0 ? void 0 : _c[1];
            const mezzo = selectedCitta.mezziDisponibili.find(m => m.id === mezzoId);
            if (mezzo) {
                const nome = document.getElementById('firstname').value;
                const cognome = document.getElementById('lastname').value;
                const email = document.getElementById('email').value;
                const metodoPagamento = document.querySelector('input[name="payment"]:checked').value;
                const tariffa = document.querySelector('input[name="tariffa"]:checked').value;
                let totale = 0;
                if (tariffa === 'hour') {
                    const ore = parseInt(document.getElementById('totalHours').value);
                    totale = ore * mezzo.tariffaOraria;
                }
                else if (tariffa === 'day') {
                    const giorni = parseInt(document.getElementById('totalDays').value);
                    totale = giorni * mezzo.getTariffaGiornaliera();
                }
                else if (tariffa === 'month') {
                    const mesi = parseInt(document.getElementById('totalMonths').value);
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
}
;
export function handleFormInput(form, selectCitta, citta, totalAmount) {
    form.addEventListener('input', () => {
        var _a, _b, _c;
        const mezzoId = (_c = (_b = (_a = form.querySelector('h4')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.match(/ID: (\w+)/)) === null || _c === void 0 ? void 0 : _c[1];
        if (mezzoId) {
            const selectedCitta = citta[selectCitta.value];
            const mezzo = selectedCitta === null || selectedCitta === void 0 ? void 0 : selectedCitta.mezziDisponibili.find(m => m.id === mezzoId);
            if (mezzo) {
                getRates(mezzo, totalAmount);
                handleRequiredRate();
            }
        }
    });
}
;
export function handleCloseForm(form) {
    const closeForm = getElementById('closeForm');
    closeForm === null || closeForm === void 0 ? void 0 : closeForm.addEventListener('click', () => {
        form.style.display = 'none';
        form.reset();
    });
}
;
