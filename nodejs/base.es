/** @require: var WHBase = require('@webhare-system/compat/base');
*/

import * as whintegration from '@webhare-system/wh/integration';
import * as domdebug from 'dompack/src/debug'
import * as domevents from 'dompack/src/events'

module.exports = { config: whintegration.config
                 , debug: domdebug.debugflags
                 , navigateTo: whintegration.navigateTo
                 };
