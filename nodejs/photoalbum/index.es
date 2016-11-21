/* To use this photoalbum:

   Siteprofile:

   <applysiteprofile fullpath="moduleroot::webwerf/data/general/photoalbum.xml" />

   In <webdesign>: async="true"

   In the site/module in which you want to use the photo album:

   npm install jquery --save

   (this is to make sure there will be no jQuery version conflicts, by 'forcing' developers to provide jQuery themselves)

   In your JS:

   import '@webhare-webwerf/photoalbum';

   This will enable a new default photo album folder.

   If you want complete control, these are the steps, instead of the last JS directive (import '@webhare-webwerf/photoalbum')

   JavaScript:

   import * as dompack from "dompack";
   import { setupPhotoAlbum } from '@webhare-webwerf/photoalbum';

   dompack.onDomReady(() => {
     setupPhotoAlbum('my-photoalbum');
   });

   Witty:

   <div class="my-photoalbum">
     [forevery photos]
       <a href="[image.link]">
         [! It is advised to set width & height !]
         <img src="[thumb.link]" width="[thumb.width]" height="[thumb.height]" />
       </a>
       </div>
     [/forevery]
   </div>

   For a library (whlib) example, refer to /webdesigns/general/photoalbum/photoalbum.whlib (make sure Witty gets its cells).
*/
require('./photoalbum.scss');

// jQuery & magnific popup
const $ = window.jQuery = require('jquery');
require('../../webdesigns/general/node_modules/magnific-popup/dist/jquery.magnific-popup.js');

// Swipe support for the popup
require('../../webdesigns/general/node_modules/jquery-touchswipe/jquery.touchswipe.js');

import * as dompack from "dompack"; // needed for dompack.onDomReady to support async

dompack.onDomReady(() => {
  if (!document.documentElement.classList.contains('page-general-webwerf-photoalbum'))
    return;

  setupPhotoAlbum('webwerf-general-photoalbum');
});

export function setupPhotoAlbum(photoAlbumClass) {
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
