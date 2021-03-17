import {renderTodoTicket, saveNewTodoCard, textInputTodo, editAreaTodo, addBtnTodo} from './todo';
import {renderInProgressTicket, saveNewInProgressCard, textInputInProgress, editAreaInProgress, addBtnInProgress} from './inProgress';
import {renderReviewTicket, saveNewReviewCard, textInputReview, editAreaReview, addBtnReview} from './review';
import {renderCompleteTicket, saveNewCompleteCard, textInputComplete, editAreaComplete, addBtnComplete} from './complete';
import {Ticket} from '../card';

const App = document.querySelector('.kanban');

App.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.dataset.add) {
    if (event.target.dataset.add === 'todo') {
      Ticket.addNewCard(editAreaTodo, addBtnTodo);
    } else if (event.target.dataset.add === 'inProgress') {
      Ticket.addNewCard(editAreaInProgress, addBtnInProgress);
    } else if (event.target.dataset.add === 'review') {
      Ticket.addNewCard(editAreaReview, addBtnReview);
    } else if (event.target.dataset.add === 'complete') {
      Ticket.addNewCard(editAreaComplete, addBtnComplete);
    }
  }

  if (event.target.dataset.saveadd) {
    if (event.target.dataset.saveadd === 'todo') {
      saveNewTodoCard();
    } else if (event.target.dataset.saveadd === 'inProgress') {
      saveNewInProgressCard();
    } else if (event.target.dataset.saveadd === 'review') {
      saveNewReviewCard();
    } else if (event.target.dataset.saveadd === 'complete') {
      saveNewCompleteCard();
    }
  }

  if (event.target.dataset.cancel === 'todo') {
    Ticket.cancelNewCard(textInputTodo, editAreaTodo, addBtnTodo);
  } else if (event.target.dataset.cancel === 'inProgress') {
    Ticket.cancelNewCard(textInputInProgress, editAreaInProgress, addBtnInProgress);
  } else if (event.target.dataset.cancel === 'review') {
    Ticket.cancelNewCard(textInputReview, editAreaReview, addBtnReview);
  } else if (event.target.dataset.cancel === 'complete') {
    Ticket.cancelNewCard(textInputComplete, editAreaComplete, addBtnComplete);
  }
})

export function renderAllTickets() {
  renderTodoTicket();
  renderInProgressTicket();
  renderReviewTicket();
  renderCompleteTicket();
}
