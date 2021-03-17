import {Card, createNewCard, renderCard} from "../card";

export const addBtnComplete = document.querySelector(`[data-add='complete']`);
export const editAreaComplete = document.querySelector(`[data-addarea='complete']`);
export const textInputComplete = document.querySelector(`[data-newcardtext='complete']`);

const completeTicketElement = document.getElementById('ticketComplete');
const cardsQty = document.querySelector(`[data-qty='complete']`);

const completeCardsList = [
  new Card({text: 'Lorem Lorem Lorem'}),
  new Card({text: 'Lorem Ipsum Lorem Lorem Dolor Ipsum'}),
  new Card({text: 'Lorem Ipsum Lorem Ipsum'}),
];

export function renderCompleteTicket() {
  const cardsToRender = completeCardsList.map(card => renderCard(card));
  completeTicketElement.innerHTML = cardsToRender.join('');
  cardsQty.innerHTML = Card.cardsQty(completeCardsList);
}

export function saveNewCompleteCard() {
  const newCardItem = createNewCard(textInputComplete);
  if (textInputComplete.value !== '') {
    editAreaComplete.style = 'display: none';
    addBtnComplete.style = 'display: block';
    textInputComplete.value = '';
    completeCardsList.unshift(newCardItem);
    renderCompleteTicket();
  }
}

function completeCardClickHandler(event) {
  event.stopPropagation();
  event.preventDefault();
  const isDeleteButton = event.target.dataset.del;
  const isEditButton = event.target.dataset.edit;
  const isSaveButton = event.target.dataset.editsave;
  const cardElement = event.target.closest('.kanban__column-card');
  const completeId = cardElement && cardElement.dataset.id;

  if (isDeleteButton) {
    const idx = completeCardsList.findIndex(completeCard => completeCard.id === completeId);
    completeCardsList.splice(idx, 1);
    renderCompleteTicket();
  }

  if (isEditButton) {
    const input = cardElement.querySelector(`[data-editinput]`);
    cardElement.classList.toggle('cardMode--editEnabled');
    input.value = cardElement.querySelector('.kanban__column-cardText').textContent;
  }

  if (isSaveButton) {
    const input = cardElement.querySelector(`[data-editinput]`);
    const idx = completeCardsList.findIndex(completeCard => completeCard.id === completeId);
    const valueToSet = input.value;

    if (!valueToSet.length) {
      return;
    }

    cardElement.classList.toggle('cardMode--editEnabled');
    const textInputComplete = cardElement.querySelector('.kanban__column-cardText');
    textInputComplete.textContent = valueToSet;
    completeCardsList[idx].text = valueToSet;
  }
}

completeTicketElement.addEventListener('click', completeCardClickHandler);
