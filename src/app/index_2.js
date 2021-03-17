import {Card} from "./card";
import {$} from "./plugins/modal";

const tickets = [
  {
    id: 1,
    title: 'To do',
    cards: [
      new Card({text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, soluta!'}),
      new Card({text: 'Lorem lorem lorem'}),
    ]
  },
  {id: 2, title: 'In progress'},
  {id: 3, title: 'Review'},
  {id: 4, title: 'Complete'},
];


const toHTML = ticket => `
  <div class="kanban__column">
    <header class="kanban__column-header">
      <div class="kanban__column-headerTop">
        <h4 class="kanban__column-headerTitle">${ticket.title}</h4>
        <a href="#" class="kanban__column-headerLink">
          <i class="kanban__column-headerIcon fas fa-ellipsis-h"></i>
        </a>
      </div>
      <p class="kanban__column-headerText">2 cards</p>
    </header>
    <div class="kanban__column-wrapper">
      <div class="kanban__column-card">
        <p class="kanban__column-cardText">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, soluta!
        </p>
        <div class="kanban__column-cardControls">
          <a href="#" class="kanban__column-cardControlsBtn">
            <i class="fas fa-pencil-alt"></i>
          </a>
          <a href="#" class="kanban__column-cardControlsBtn">
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    </div>
    <footer class="kanban__column-footer">
      <a href="#" class="kanban__column-footerLink" data-btn="add">
        <i class="kanban__column-footerIcon fas fa-plus"></i>
        Add a card
      </a>
    </footer>
  </div>
`;

function render() {
  const html = tickets.map(toHTML).join('');
  document.querySelector('.kanban').innerHTML = html;
}

render();

const addCardModal = $.modal({
  title: 'Добавить новую карточку',
  closable: true,
  content: `
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
  `,
  width: '400px',
  footerButtons: [
    {
      text: 'Ok',
      type: 'primary',
      handler() {
        addCardModal.close();
      }
    },
    {
      text: 'Cancel',
      type: 'danger',
      handler() {
        addCardModal.close();
      }
    }
  ]
});

document.addEventListener('click', event => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  if (btnType === 'add') {
    console.log('Add button clicked');
    addCardModal.open();
  }
});
