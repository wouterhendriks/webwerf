const whBase = require('@webhare-system/compat/base');

// load SCSS
require('../css/webwerf.scss');
// require('../node_modules/font-awesome/css/font-awesome.css');

// require('@webhare-publisher/richcontent/all');

// force a single webpack bundle by (always) loading all page-specific JavaScript here
require('./pages.es');

const jQuery = require('jquery');
require('parsleyjs'); // Parsley needs jQuery, unfortunately

// helper lib to check if element is in viewport
var verge = require('../node_modules/verge/verge.min.js');

import { throttle } from './utilities.es';

import * as dompack from '../bower_components/dompack/src/index';
import { qS, qSA } from 'dompack/extra/qsa';

const logoPositionTop = 120;
const logoHeight = 48;

const angledBorder = 5.5; // keep in sync with mixins.scss

// setup RPC
const formRpc = require('./services.rpc.json');

// DOM-ready function
document.addEventListener('DOMContentLoaded', (/* event */) => {
  //document.addEventListener("scroll", throttle(updateSiteHeaderVisibility, 50, []));
  //updateSiteHeaderVisibility();

  setupContactForm();

  window.onresize = onResize;
  onResize();

  document.addEventListener('scroll', onScroll);

  /*jQuery('.js-popup-webhare').
      el.addEventListener('click', evt => {
        evt.preventDefault();
        $('.popup-container').style.top = (evt.clientY - 20) + 'px';
        $('.popup-container').style.left = (evt.clientX - 20) + 'px';
        window.setTimeout(() => {
          $('.popup-container').classList.add('popup-container--transition-enabled');
          $('.popup-container').classList.add('popup-container--active');
        },50);
      });
    }
  }*/
});

function updateSiteHeaderVisibility() {
  // show site header if top logo is no longer visible
  //const showSiteHeader = !verge.inY(jQuery('.hero__logo'));
  //jQuery('html').toggleClass('siteheader-visible', showSiteHeader);
}

function onResize() {
  const scrollPos = getScrollPosition();

  jQuery('.infoblock').each(function() {
    jQuery(this).attr('data-offset-top', jQuery(this).get(0).getBoundingClientRect().top + scrollPos);

    const $angledBorder = jQuery(this).find('.before');
    $angledBorder.attr('data-border-offset-top', $angledBorder.get(0).getBoundingClientRect().top + scrollPos);
  })
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

  qSA('.infoblock:not(.infoblock--first) .infoblock__content').forEach((block) => {
    if (verge.inY(block, -100)) {
      block.classList.add('enabled');
    }
  });

  // calculate site header opacity
  const scrollPosFullOpacity = 100;
  const relScrollPos = Math.min(scrollPos, scrollPosFullOpacity);
  qS('.siteheader').style.opacity = (relScrollPos / scrollPosFullOpacity);

  document.documentElement.classList.toggle('small-siteheader', scrollPos > 200);
}

function onFormSuccess(result = {}) {
  if (result && result.success) {
    jQuery('.contactform').empty();
    jQuery('.form__successmessage').addClass('visible');
  }
}

function onFormException(result = {}) {
  console.error(result);
}

function setupContactForm() {
  // debug fields
  if (whBase.debug['debug'] === true) {
    jQuery('#form-name').val('Pietje Puk');
    jQuery('#form-email').val('overig@nerds.company');
    jQuery('#form-message').val('Dit is\neen bericht');
  }

  // setup Parsley
  const parsleyOptions = { trigger: "change keypress focusout",
                           successClass: "parsley-success",
                           classHandler: function (el) {
                                           return el.$element.closest('.form__input-container');
                                         },
                         };

  jQuery('.contactform').parsley(parsleyOptions);

  // submit handler
  jQuery('.contactform').submit(function(evt) {
    evt.preventDefault();

    const formData = { name: jQuery('#form-name').val(),
                       email: jQuery('#form-email').val(),
                       message: jQuery('#form-message').val(),
                     };

    formRpc.submitContactForm(formData)
           .then(onFormSuccess)
           .catch(onFormException);
  });

  // setup animations
  jQuery('.form__input').each(function() {
    const $container = jQuery(this).closest('.form__row');
    const activeClass = 'form__row--active';

    jQuery(this).on('focus', function() {
      $container.addClass(activeClass);
    });

    jQuery(this).on('blur', function() {
      $container.toggleClass(activeClass, jQuery(this).value !== '');
    });

    if (jQuery(this).value !== '') {
      $container.addClass(activeClass);
    }
  });
}
