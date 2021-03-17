import {Card, createNewCard, renderCard} from "../card";

export const addBtnTodo = document.querySelector(`[data-add='todo']`);
export const editAreaTodo = document.querySelector(`[data-addarea='todo']`);
export const textInputTodo = document.querySelector(`[data-newcardtext='todo']`);

const todoTicketElement = document.getElementById('ticketTodo');
const cardsQty = document.querySelector(`[data-qty='todo']`);

const todoCardsList = [
  new Card({text: 'Lorem Lorem Lorem'}),
  new Card({text: 'Lorem Ipsum Lorem Lorem Dolor Ipsum'}),
  new Card({text: 'Lorem Ipsum Lorem Ipsum'}),
];

export function renderTodoTicket() {
  const cardsToRender = todoCardsList.map(card => renderCard(card));
  todoTicketElement.innerHTML = cardsToRender.join('');
  cardsQty.innerHTML = Card.cardsQty(todoCardsList);
}

export function saveNewTodoCard() {
  const newCardItem = createNewCard(textInputTodo);
  if (textInputTodo.value !== '') {
    editAreaTodo.style = 'display: none';
    addBtnTodo.style = 'display: block';
    textInputTodo.value = '';
    todoCardsList.unshift(newCardItem);
    renderTodoTicket();
  }
}

export function todoCardClickHandler(event) {
  event.stopPropagation();
  event.preventDefault();
  const isDeleteButton = event.target.dataset.del;
  const isEditButton = event.target.dataset.edit;
  const isSaveButton = event.target.dataset.editsave;
  const cardElement = event.target.closest('.kanban__column-card');
  const todoId = cardElement && cardElement.dataset.id;

  if (isDeleteButton) {
    const idx = todoCardsList.findIndex(todoCard => todoCard.id === todoId);
    todoCardsList.splice(idx, 1);
    renderTodoTicket();
  }

  if (isEditButton) {
    const input = cardElement.querySelector(`[data-editinput]`);
    cardElement.classList.toggle('cardMode--editEnabled');
    input.value = cardElement.querySelector('.kanban__column-cardText').textContent;
  }

  if (isSaveButton) {
    const input = cardElement.querySelector(`[data-editinput]`);
    const idx = todoCardsList.findIndex(todoCard => todoCard.id === todoId);
    const valueToSet = input.value;

    if (!valueToSet.length) {
      return;
    }

    cardElement.classList.toggle('cardMode--editEnabled');
    const textInputTodo = cardElement.querySelector('.kanban__column-cardText');
    textInputTodo.textContent = valueToSet;
    todoCardsList[idx].text = valueToSet;
  }
}

todoTicketElement.addEventListener('click', todoCardClickHandler);
