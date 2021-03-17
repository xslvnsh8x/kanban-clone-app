import {Card, createNewCard, renderCard} from "../card";

export const addBtnInProgress = document.querySelector(`[data-add='inProgress']`);
export const editAreaInProgress = document.querySelector(`[data-addarea='inProgress']`);
export const textInputInProgress = document.querySelector(`[data-newcardtext='inProgress']`);

const inProgressTicketElement = document.getElementById('ticketInProgress');
const cardsQty = document.querySelector(`[data-qty='inProgress']`);

const inProgressCardsList = [
  new Card({text: 'Lorem Ipsum Lorem Lorem Dolor Ipsum'}),
];

export function renderInProgressTicket() {
  const cardsToRender = inProgressCardsList.map(card => renderCard(card));
  inProgressTicketElement.innerHTML = cardsToRender.join('');
  cardsQty.innerHTML = Card.cardsQty(inProgressCardsList);
}

export function saveNewInProgressCard() {
  const newCardItem = createNewCard(textInputInProgress);
  if (textInputInProgress.value !== '') {
    editAreaInProgress.style = 'display: none';
    addBtnInProgress.style = 'display: block';
    textInputInProgress.value = '';
    inProgressCardsList.unshift(newCardItem);
    renderInProgressTicket();
  }
}

function inProgressCardClickHandler(event) {
  event.stopPropagation();
  event.preventDefault();
  const isDeleteButton = event.target.dataset.del;
  const isEditButton = event.target.dataset.edit;
  const isSaveButton = event.target.dataset.editsave;
  const cardElement = event.target.closest('.kanban__column-card');
  const inProgressId = cardElement && cardElement.dataset.id;

  if (isDeleteButton) {
    const idx = inProgressCardsList.findIndex(inProgressCard => inProgressCard.id === inProgressId);
    inProgressCardsList.splice(idx, 1);
    renderInProgressTicket();
  }

  if (isEditButton) {
    const input = cardElement.querySelector(`[data-editinput]`);
    cardElement.classList.toggle('cardMode--editEnabled');
    input.value = cardElement.querySelector('.kanban__column-cardText').textContent;
  }

  if (isSaveButton) {
    const input = cardElement.querySelector(`[data-editinput]`);
    const idx = inProgressCardsList.findIndex(inProgressCard => inProgressCard.id === inProgressId);
    const valueToSet = input.value;

    if (!valueToSet.length) {
      return;
    }

    cardElement.classList.toggle('cardMode--editEnabled');
    const textInputInProgress = cardElement.querySelector('.kanban__column-cardText');
    textInputInProgress.textContent = valueToSet;
    inProgressCardsList[idx].text = valueToSet;
  }
}

inProgressTicketElement.addEventListener('click', inProgressCardClickHandler);
