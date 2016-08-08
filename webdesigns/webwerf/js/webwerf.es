// whBase includes the 'config' cell, which contains useful backend/server information
// const whBase = require('@webhare-system/compat/base');
/*
window.$ = window.jQuery = require('jquery'); // window. needed for Velocity
require('../node_modules/velocity-animate/velocity.min.js');
require('../node_modules/velocity-animate/velocity.ui.min.js');
*/

// load the main SCSS
require('../css/webwerf.scss');

// support rich content (video, images)
require('@webhare-publisher/richcontent/all');

// force a single webpack bundle by (always) loading all page-specific JavaScript here
require('./pages.es');

import * as dompack from 'dompack';
import { qS, qSA } from 'dompack/extra/qsa';

const $ = qS;
const $$ = qSA;

const logoPositionTop = 200;
const logoHeight = 48;

/*
document.write('<style>');
for (var i = 0; i < fonts.length; i++) {
  document.write("@import 'https://fonts.googleapis.com/css?family=" + fonts[i] + "';");
}
document.write('</style>');
*/

const angledBorder = 5.5; // keep in sync with mixins.scss

function onResize() {
  const scrollPos = getScrollPosition();

  for (const $block of $$('.infoblock')) {
    $block.setAttribute('data-offset-top', $block.getBoundingClientRect().top + scrollPos);

    const $angledBorder = $block.querySelector('.before');
    $angledBorder.setAttribute('data-border-offset-top', $angledBorder.getBoundingClientRect().top + scrollPos);
  }
}

function getScrollPosition() {
  var h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';

  return h[st] || b[st];
}


function onScroll() {

  const scrollPos = getScrollPosition();

  for (const $block of $$('.infoblock')) {
    const $before = $block.querySelector('.before');
    const elOffsetTop = parseInt($block.getAttribute('data-offset-top'), 10);
    const borderOffsetTop = parseInt($before.getAttribute('data-border-offset-top'), 10);

    if (scrollPos >= borderOffsetTop && scrollPos <= elOffsetTop) {
      const howFarAlong = scrollPos - borderOffsetTop;
      const percDone = howFarAlong / (elOffsetTop - borderOffsetTop);
      let setAngle = (1 - percDone) * angledBorder;

      if ($block.classList.contains("edge--top--reverse"))
        setAngle = -1 * setAngle;

      $before.style.transform = 'skewY(' + setAngle + 'deg)';
    } else if (scrollPos < borderOffsetTop) {

      let setAngle = angledBorder;

      if ($block.classList.contains("edge--top--reverse"))
        setAngle = -1 * angledBorder;

      $before.style.transform = 'skewY(' + setAngle + 'deg)';
    }
  }

  // if we scroll past the logo, we

}

function setupContactForm() {
  for (const $input of $$('.form__input')) {
    const $container = $input.closest('.form__row');
    const activeClass = 'form__row--active';

    $input.onfocus = function() {
      $container.classList.add(activeClass);
    };

    $input.onblur = function() {
      $container.classList.toggle(activeClass, $input.value !== '');
    };

    if ($input.value !== '') {
      $container.classList.add(activeClass);
    }
  };
}


// DOM-ready function
document.addEventListener('DOMContentLoaded', (/* event */) => {

  setupContactForm();

  window.onresize = onResize;
  onResize();

  document.addEventListener('scroll', onScroll);

  // position hero logo
  $('.hero__logo').style.top = logoPositionTop + 'px';
  $('.hero__logo').style.height = logoHeight + 'px';
});
