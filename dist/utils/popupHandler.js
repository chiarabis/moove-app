import { capitalizeFirstLetter, getElementById } from './domUtils.js';
const popupOverlay = getElementById('popupOverlay');
const popup = getElementById('popup');
const closePopup = getElementById('closePopup');
const popupNome = getElementById('popupNome');
const popupCognome = getElementById('popupCognome');
const popupEmail = getElementById('popupEmail');
const popupMetodoPagamento = getElementById('popupMetodoPagamento');
const popupTotale = getElementById('popupTotale');
export function showPopup(nome, cognome, email, metodoPagamento, totale) {
    popupNome.textContent = `Nome: ${capitalizeFirstLetter(nome)}`;
    popupCognome.textContent = `Cognome: ${capitalizeFirstLetter(cognome)}`;
    popupEmail.textContent = `Email: ${email}`;
    popupMetodoPagamento.textContent = `Metodo di pagamento: ${capitalizeFirstLetter(metodoPagamento)}`;
    popupTotale.textContent = `Totale: ${totale}€`;
    popupOverlay.style.display = 'block';
    popup.style.display = 'block';
}
;
export function hidePopup() {
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
}
;
closePopup.addEventListener('click', hidePopup);
popupOverlay.addEventListener('click', hidePopup);
