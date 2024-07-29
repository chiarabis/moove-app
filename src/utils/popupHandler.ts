import { capitalizeFirstLetter, getElementById } from './domUtils.js';

const popupOverlay = getElementById<HTMLDivElement>('popupOverlay');
const popup = getElementById<HTMLDivElement>('popup');
const closePopup = getElementById<HTMLSpanElement>('closePopup');
const popupNome = getElementById<HTMLParagraphElement>('popupNome');
const popupCognome = getElementById<HTMLParagraphElement>('popupCognome');
const popupEmail = getElementById<HTMLParagraphElement>('popupEmail');
const popupMetodoPagamento = getElementById<HTMLParagraphElement>('popupMetodoPagamento');
const popupTotale = getElementById<HTMLParagraphElement>('popupTotale');

export function showPopup(nome: string, cognome: string, email: string, metodoPagamento: string, totale: number): void{
    popupNome.textContent = `Nome: ${capitalizeFirstLetter(nome)}`;
    popupCognome.textContent = `Cognome: ${capitalizeFirstLetter(cognome)}`;
    popupEmail.textContent = `Email: ${email}`;
    popupMetodoPagamento.textContent = `Metodo di pagamento: ${capitalizeFirstLetter(metodoPagamento)}`;
    popupTotale.textContent = `Totale: ${totale}€`;

    popupOverlay.style.display = 'block';
    popup.style.display = 'block';
};

export function hidePopup(): void {
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
};

closePopup.addEventListener('click', hidePopup);
popupOverlay.addEventListener('click', hidePopup);