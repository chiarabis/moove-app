import { utenti, citta } from "./main.js";
import { getElementById, getElementByClass, capitalizeFirstLetter } from "./utils/domUtils.js";
import { handleHamburgerMenu } from './utils/menu.js';
import { Mezzo } from './models/Mezzo.js';
import { generaIdMezzo } from './utils/counters.js';
import { handleCloseForm, handleFormInput, handleFormSubmit } from './utils/formHandler.js';
document.addEventListener("DOMContentLoaded", () => {
    const selectCitta = getElementById('citta');
    const mezziInfo = getElementById('mezziInfo');
    const aggiungiMezzoBtn = getElementById('aggiungiMezzoBtn');
    const form = getElementById('form');
    const totalAmount = getElementById('totale');
    const mezziDisponibiliDiv = getElementById('mezziDisponibili');
    const tipoMezzoSelect = getElementById('tipoMezzo');
    const hamburger = getElementByClass('hamburger');
    const navMenu = getElementByClass('nav-menu');
    const hamburgerIcon = getElementById('hamburger-icon');
    handleHamburgerMenu(hamburger, navMenu, hamburgerIcon);
    handleFormSubmit(form, selectCitta, citta, utenti, aggiornaMezziDiv);
    handleFormInput(form, selectCitta, citta, totalAmount);
    handleCloseForm(form);
    for (const key in citta) {
        if (citta.hasOwnProperty(key)) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = citta[key].nome;
            selectCitta.appendChild(option);
        }
    }
    ;
    if (selectCitta.value) {
        const initialCitta = citta[selectCitta.value];
        if (initialCitta) {
            aggiornaMezziDiv(initialCitta);
            mezziInfo.style.display = 'flex';
        }
    }
    ;
    selectCitta.addEventListener('change', () => {
        const optionCitta = selectCitta.value;
        const selectedCitta = citta[optionCitta];
        if (selectedCitta) {
            mezziInfo.style.display = 'flex';
            aggiornaMezziDiv(selectedCitta);
        }
        else {
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
            }
            else {
                console.error('Inserire il tipo di mezzo.');
            }
        }
        else {
            console.error(`Città non valida: ${optionCitta}`);
        }
    });
    function aggiornaMezziDiv(citta) {
        const mezzi = citta.mezziDisponibili;
        const mezziHTML = mezzi.map(mezzo => {
            if (mezzo.statoDisponibile) {
                return `
                    <div class="flexrow">
                        <div class="flexrow idBox">
                            <p style="text-transform: capitalize;">${mezzo.tipo}</p>
                            <p class="bg-colored" style="margin-left: 3px;">ID: ${mezzo.id}</p>
                        </div>
                        <span style="margin: 0 10px; color: rgb(9,181,32);">●</span>
                        <button class="prenotaBtn" data-id="${mezzo.id}">Prenota</button>
                        ${mezzo.aggiuntoDaUtente ? `<button class="rimuoviMezzoBtn" data-id="${mezzo.id}"><img src="./assets/bin.png"/></button>` : ''}
                    </div>`;
            }
            else {
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
        const rimuoviMezzoBtn = mezziDisponibiliDiv.querySelectorAll('.rimuoviMezzoBtn');
        rimuoviMezzoBtn.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const target = event.currentTarget;
                const id = target.dataset.id;
                if (id) {
                    citta.rimuoviMezzo(id);
                    form.style.display = 'none';
                    form.reset();
                    aggiornaMezziDiv(citta);
                }
            });
        });
        const prenotaBtn = mezziDisponibiliDiv.querySelectorAll('.prenotaBtn');
        prenotaBtn.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const target = event.currentTarget;
                const id = target.dataset.id;
                const formTitolo = form.querySelector('h4');
                if (formTitolo) {
                    formTitolo.innerHTML = `Prenotazione per <span class="bg-colored">ID: ${id}</span>`;
                }
                if (id) {
                    const mezzo = citta.mezziDisponibili.find(m => m.id === id);
                    if (mezzo) {
                        document.getElementById('tariffaOraria').textContent = `${mezzo.tariffaOraria} €/h`;
                        document.getElementById('tariffaGiornaliera').textContent = `${mezzo.getTariffaGiornaliera().toFixed(2)} €/giorno`;
                        document.getElementById('tariffaMensile').textContent = `${mezzo.getTariffaMensile().toFixed(2)} €/mese`;
                    }
                    form.style.display = 'flex';
                }
            });
        });
        const submitBtn = mezziDisponibiliDiv.querySelectorAll('.submitBtn');
        submitBtn.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const target = event.currentTarget;
                const id = target.dataset.id;
                if (id) {
                    prenotaMezzo(citta, id);
                    aggiornaMezziDiv(citta);
                }
            });
        });
    }
    ;
    function prenotaMezzo(citta, id) {
        const mezzo = citta.mezziDisponibili.find(mezzo => mezzo.id === id);
        if (mezzo && mezzo.statoDisponibile) {
            mezzo.statoDisponibile = false;
            console.log(`Il mezzo ${mezzo.tipo} con ID ${mezzo.id} è prenotato.`);
        }
        else {
            console.error(`Non è possibile prenotare il mezzo ID ${id}.`);
        }
    }
    ;
});
