# Example/minimal HTML #
```HTML
<div id="list">
  <div>
    <a href="#" class="page-nav-prev">Previous</a>
    <ul class="nav-pages"></ul>
    <a href="#" class="page-nav-next">Next</a>
  </div>
  <ul class="list">
    <li>
      <h1>Title</h1>
      <img class="image" data-src="..." alt="..." />
    </li>
    ... <li> <li> <li> etc ...
  </ul>
</div>
```

# Options (parameter of the 'setup' function) #
```JS
{ containerId: 'list', // id of the container
  classPagePrev: 'page-nav-prev', // class name of the 'previous page' link
  classPageNext: 'page-nav-next', // class name of the 'next page' link
  delayedLoadImages: true, // if true, load images when item is visible; add 'data-src="..."' to your <img /> nodes
  classImage: 'image', // if delayedLoadImages = true, this is the class name of the <img />
  numPerPage: 3, // number of items per page

  // for more info about these options, refer to http://listjs.com/docs/plugins/pagination/
  paginationOptions:
    { paginationClass: 'nav-pages', // the class that defines the <ul> that should contain the pagination
      innerWindow: 2, // how many pages should be visible on each side of the current page
      outerWindow: 0, // how many pages should be visible on from the beginning and from the end of the pagination
      left: 0, // same as outerWindow but only from left
      right: 0, // same as left but from right
    }
}
```

# Example JavaScript (ES6) #
```JS
import * as PageNavigation from '@webhare-webwerf/page-navigation';

const pageNavigationOptions =
    { containerId: 'newslist',
      classPagePrev: 'page-nav-prev',
      classPageNext: 'page-nav-next',
      delayedLoadImages: true,
      classImage: 'news__image',
      numPerPage: 3,
      paginationOptions:
          { paginationClass: 'nav-pages',
            left: 1,
            right: 1,
           innerWindow: 2,
          },
    };

PageNavigation.setup(pageNavigationOptions);
```

# Prevent 'bouncing' while loading #
It is advised to hide the list during initalization. For example:

HTML:
```HTML
<div id="list" style="display:none"> <!-- hide while initalizing -->
```
JS:
```JS
PageNavigation.setup(pageNavigationOptions); // setup the page navigation
document.querySelector('#list').style.display = 'block'; // show the list
```

# Todo #
Support filtering, just like http://www.bekijkjepensioenregeling.nl/. Or expose the list object and let people do orgList.filter themselves?
