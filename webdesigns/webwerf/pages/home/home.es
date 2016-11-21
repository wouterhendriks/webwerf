require('./home.scss');

import * as dompack from "dompack";
import { qS, qSA } from 'dompack/extra/qsa';

document.addEventListener('DOMContentLoaded', () => {
  if (!document.documentElement.classList.contains('page-home'))
    return;

  window.setTimeout(() => {
    qS('.hero__logo').classList.add('enabled');
    qS('.infoblock--first .before').classList.add('enabled');
    qS('.infoblock--first .infoblock__content').classList.add('enabled');
  }, 250);
});
