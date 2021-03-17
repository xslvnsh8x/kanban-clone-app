import {renderTodoTicket} from "../tickets/todo";

export class Card {
  constructor(options) {
    const {text} = options;
    this.text = text;
    this.id = Math.random().toString(36).substring(2, 15);
  };

  static cardsQty(cardsList) {
    const qty = cardsList.length.toString();
    return `${qty} cards`;
  }
}

export class Ticket {
  constructor() {
  };

  static cancelNewCard(text, editArea, addBtn) {
    text.value = '';
    editArea.style = 'display: none';
    addBtn.style = 'display: block';
  }

  static addNewCard(editArea, addBtn) {
    editArea.style = 'display: block';
    addBtn.style = 'display: none';
  }
}

export function createNewCard(textInputElement) {
  const text = textInputElement.value;
  return new Card({
    text
  });
}

export function renderCard(card) {
  const {text, id} = card;
  return `
    <div class="kanban__column-card" data-id="${id}">
      <div class="kanban__column-cardWrapper">
        <div class="kanban__column-cardMode kanban__column-cardModeView">
          <p class="kanban__column-cardText">${text}</p>
          <div class="kanban__column-cardControls">
            <a href="#" class="kanban__column-cardControlsBtn" data-edit="true">
              <i class="fas fa-pencil-alt"></i>
            </a>
            <a href="#" class="kanban__column-cardControlsBtn" data-del="true">
              <i class="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
        <div class="kanban__column-cardMode kanban__column-cardModeEdit">
          <textarea class="kanban__column-editModeInput kanban__column-textArea" data-editinput="true"></textarea>
          <div class="kanban__column-cardControls">
            <a href="#" class="kanban__column-cardControlsBtn" data-editsave="true">
              <i class="fas fa-check"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
