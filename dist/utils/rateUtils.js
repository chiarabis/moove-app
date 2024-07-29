export function getRates(mezzo, totalAmount) {
    const tariffa = document.querySelector('input[name="tariffa"]:checked').value;
    let totale = 0;
    if (tariffa === 'hour') {
        const ore = parseInt(document.getElementById('totalHours').value) || 0;
        totale = ore * mezzo.tariffaOraria;
    }
    else if (tariffa === 'day') {
        const giorni = parseInt(document.getElementById('totalDays').value) || 0;
        totale = giorni * mezzo.getTariffaGiornaliera();
    }
    else if (tariffa === 'month') {
        const mesi = parseInt(document.getElementById('totalMonths').value) || 0;
        totale = mesi * mezzo.getTariffaMensile();
    }
    totalAmount.textContent = `${totale.toFixed(2)} €`;
}
;
export function handleRequiredRate() {
    const radioButtons = document.querySelectorAll('input[name="tariffa"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const target = event.target;
            const tariffa = target.value;
            document.getElementById('totalHours').required = tariffa === 'hour';
            document.getElementById('totalDays').required = tariffa === 'day';
            document.getElementById('totalMonths').required = tariffa === 'month';
        });
    });
    document.getElementById('totalHours').required = true;
}
;
