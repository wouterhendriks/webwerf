// whBase includes the 'config' cell, which contains useful backend/server information
// const whBase = require('@webhare-system/compat/base');

// load the main SCSS
require('../css/webwerf.scss');

// support rich content (video, images)
require('@webhare-publisher/richcontent/all');

// force a single webpack bundle by (always) loading all page-specific JavaScript here
require('./pages.es');

// DOM-ready function
document.addEventListener('DOMContentLoaded', (/* event */) => {

});
