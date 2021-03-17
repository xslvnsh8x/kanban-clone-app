import {Card, createNewCard, renderCard} from "../card";

export const addBtnReview = document.querySelector(`[data-add='review']`);
export const editAreaReview = document.querySelector(`[data-addarea='review']`);
export const textInputReview = document.querySelector(`[data-newcardtext='review']`);

const reviewTicketElement = document.getElementById('ticketReview');
const cardsQty = document.querySelector(`[data-qty='review']`);

const reviewCardsList = [
  new Card({text: 'Lorem Lorem Lorem'}),
  new Card({text: 'Lorem Ipsum Lorem Lorem Dolor Ipsum'}),
];

export function renderReviewTicket() {
  const cardsToRender = reviewCardsList.map(card => renderCard(card));
  reviewTicketElement.innerHTML = cardsToRender.join('');
  cardsQty.innerHTML = Card.cardsQty(reviewCardsList);
}

export function saveNewReviewCard() {
  const newCardItem = createNewCard(textInputReview);
  if (textInputReview.value !== '') {
    editAreaReview.style = 'display: none';
    addBtnReview.style = 'display: block';
    textInputReview.value = '';
    reviewCardsList.unshift(newCardItem);
    renderReviewTicket();
  }
}

function reviewCardClickHandler(event) {
  event.stopPropagation();
  event.preventDefault();
  const isDeleteButton = event.target.dataset.del;
  const isEditButton = event.target.dataset.edit;
  const isSaveButton = event.target.dataset.editsave;
  const cardElement = event.target.closest('.kanban__column-card');
  const reviewId = cardElement && cardElement.dataset.id;

  if (isDeleteButton) {
    const idx = reviewCardsList.findIndex(reviewCard => reviewCard.id === reviewId);
    reviewCardsList.splice(idx, 1);
    renderReviewTicket();
  }

  if (isEditButton) {
    const input = cardElement.querySelector(`[data-editinput]`);
    cardElement.classList.toggle('cardMode--editEnabled');
    input.value = cardElement.querySelector('.kanban__column-cardText').textContent;
  }

  if (isSaveButton) {
    const input = cardElement.querySelector(`[data-editinput]`);
    const idx = reviewCardsList.findIndex(reviewCard => reviewCard.id === reviewId);
    const valueToSet = input.value;

    if (!valueToSet.length) {
      return;
    }

    cardElement.classList.toggle('cardMode--editEnabled');
    const textInputReview = cardElement.querySelector('.kanban__column-cardText');
    textInputReview.textContent = valueToSet;
    reviewCardsList[idx].text = valueToSet;
  }
}

reviewTicketElement.addEventListener('click', reviewCardClickHandler);
