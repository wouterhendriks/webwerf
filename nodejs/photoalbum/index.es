import '../../webdesigns/general/node_modules/magnific-popup/dist/magnific-popup.css';
import '../../webdesigns/general/bower_components/pure/pure-min.css';
import '../../webdesigns/general/bower_components/pure/grids-responsive-min.css';
require('./photoalbum.scss');

// jQuery & magnific popup
const $ = window.jQuery = require('jquery');
require('../../webdesigns/general/node_modules/magnific-popup/dist/jquery.magnific-popup.js');

// Swipe support for the popup
require('../../webdesigns/general/node_modules/jquery-touchswipe/jquery.touchSwipe.js');

import * as dompack from "dompack"; // needed for dompack.onDomReady to support async

dompack.onDomReady(() => {
  if (!document.documentElement.classList.contains('page-general-webwerf-photoalbum'))
    return;

  setup('webwerf-general-photoalbum');
});

export function setup(photoAlbumClass) {
  jQuery('.' + photoAlbumClass).magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Afbeelding #%curr% laden...',
      //mainClass: 'mfp-img-mobile',
      //closeMarkup: '<button title="sluiten" type="button" class="mfp-close" style="font-size:14px;top:-3px;">sluiten</button>',
      mainClass: photoAlbumClass,
      gallery: {
          enabled: true,
          navigateByImgClick: false,
          preload: [0,1], // Will preload 0 - before current, and 1 after the current image
          tCounter: '%curr% van %total%',
      },
      image: {
          tError: '<a href="%url%">Afbeelding #%curr%</a> kon niet geladen worden.',
      },
      callbacks: {
          open: function() {
            $('.' + photoAlbumClass + ' .mfp-content').swipe({
              swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                if (direction === 'right')
                  $.magnificPopup.instance.prev();
                else if (direction === 'left')
                  $.magnificPopup.instance.next();
              }
            });
          },
      },
    });
}
