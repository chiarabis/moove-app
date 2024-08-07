import { Mezzo } from "../models/Mezzo";

export function getRates(mezzo: Mezzo, totalAmount: HTMLParagraphElement) {
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

export function handleRequiredRate() {
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
};
