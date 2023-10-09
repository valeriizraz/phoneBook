'use strict';

{
  const data = [
    {
      name: 'Иван',
      surname: 'Петров',
      phone: '+79514545454',
    },
    {
      name: 'Игорь',
      surname: 'Семёнов',
      phone: '+79999999999',
    },
    {
      name: 'Семён',
      surname: 'Иванов',
      phone: '+79800252525',
    },
    {
      name: 'Мария',
      surname: 'Попова',
      phone: '+79876543210',
    },
  ];

  const getContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    return container;
  };

  const getHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = getContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const getLogo = (title) => {
    const logo = document.createElement('h1');
    logo.classList.add('logo');
    logo.textContent = `Телефонная книга ${title}`;

    return logo;
  };

  const getMain = () => {
    const main = document.createElement('main');
    main.classList.add('main');

    const mainContainer = getContainer();
    main.append(mainContainer);

    main.mainContainer = mainContainer;

    return main;
  };

  const getButtonGroup = params => {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.className = className;
      button.type = type;
      button.textContent = text;

      return button;
    });

    buttonWrapper.append(...btns);

    return {
      buttonWrapper,
      btns,
    };
  };

  const getTable = () => {
    const table = document.createElement('table');
    table.classList.add('table');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete"></th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const getForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');

    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="label-form" for="name">Имя</label>
        <input class="form-input" id="name" type="text"
          name="name" required>
      </div>
      <div class="form-group">
        <label class="label-form" for="surname">Фамилия</label>
        <input class="form-input" id="surname" type="text"
          name="surname" required>
      </div>
      <div class="form-group">
        <label class="label-form" for="phone">Телефон</label>
        <input class="form-input" id="phone" type="number"
          name="phone" required>
      </div>
    `);

    const buttonGroup = getButtonGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const getP = () => {
    const p = document.createElement('p');

    return p;
  }

  const getFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = getContainer();
    footerContainer.classList.add('footer-container');

    const footerText = getP();
    footerText.classList.add('footer-text');
    footerText.textContent = `Все права зацищены ${title}`;
    
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    footerContainer.append(footerText);

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = getHeader();
    const logo = getLogo(title);
    
    const main = getMain();
    const buttonGroup = getButtonGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);

    const table = getTable();
    const form = getForm();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.buttonWrapper, table, form.overlay);

    const footer = getFooter(title);

    app.append(header, main, footer);

    return {
      list: table.tbody,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    // console.log(dataObj);

    const tr = document.createElement('tr');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdTel = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel: ${phone}`;
    phoneLink.textContent = phone;
    tdTel.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdTel);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);
  
    const {list} = phoneBook;

    renderContacts(list, data);
  };

  window.phoneBookInit = init;
}