import { qSA } from 'dompack/extra/qsa';

require('../../webdesigns/general/bower_components/list.js/dist/list.js'); // NPM package
const ListPagination = require('./list.pagination.js'); // derived from NPM package

let orgList = null;

export function setup(options) {
  // disable 'previous page' link
  qSA('.' + options.classPagePrev).forEach(link => {
    link.classList.add('disabled');
  });

  let listOptions = {
    page: options.numPerPage,
    plugins: [ ListPagination(options.paginationOptions),
             ]
  }

  if (options.valueNames && options.valueNames.length > 0) {
    listOptions.valueNames = options.valueNames;
  }

  orgList = new List(options.containerId, listOptions);

  qSA('.' + options.classPagePrev).forEach(link => { setPrevNextClick(options, link, false); });
  qSA('.' + options.classPageNext).forEach(link => { setPrevNextClick(options, link, true); });

  orgList.on('updated', function() {
    window.setTimeout(() => {
      if (options.delayedLoadImages)
        loadImages(options);

      updatePagination(options);
    }, 50); // prevents race condition problems
  });

  if (options.delayedLoadImages)
    loadImages(options);

  updatePagination(options);

  return orgList;
}

function setPrevNextClick(options, link, isNext) {
  link.addEventListener('click', evt => {
    evt.preventDefault();

    if (isNext)
      orgList.pagination.goToNextPage();
    else
      orgList.pagination.goToPreviousPage();

    updatePagination(options);
  });
}

// updates state of prev/next links
function updatePagination(options) {
  if (!orgList.pagination)
    return;

  const status = orgList.pagination.getPaginationStatus();

  qSA('.' + options.classPagePrev).forEach(link => {
    link.classList.toggle('disabled', status.currentPageIdx < 1);
  });

  qSA('.' + options.classPageNext).forEach(link => {
    link.classList.toggle('disabled', status.currentPage === status.nrPages);
  });
}

// for all visible items, set image source from data-src if not already fetched
function loadImages(options) {
  for (const item of orgList.visibleItems) {
    const logo = item.elm.querySelector('.' + options.classImage);
    if (!logo)
      continue;

    const src = logo.getAttribute('src');

    if (!src || src === '') {
      const dataSrc = logo.getAttribute('data-src');
      logo.setAttribute('src', dataSrc);
    }
  }
}
