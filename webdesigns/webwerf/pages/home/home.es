require('./home.scss');

import * as dompack from "dompack";

document.addEventListener('DOMContentLoaded', () => {
  if (!document.documentElement.classList.contains('page-home'))
    return;

  window.setTimeout(() => {
    dompack.qS('.hero__logo').classList.add('enabled');
    dompack.qS('.infoblock--first .before').classList.add('enabled');
    dompack.qS('.infoblock--first .infoblock__content').classList.add('enabled');
  }, 250);
});
